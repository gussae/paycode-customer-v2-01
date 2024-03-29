const { readdir, unlink, readFile, writeFile } = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { glob } = require('glob');
const { spawn } = require('child_process');
const { packagesConfig: PACKAGES_CONFIG } = require('../.monorepo.config.json');

const rootDir = path.join(__dirname, '../');
const packagesDir = path.join(rootDir, 'packages');
const hashFilePath = path.join(rootDir, '.package-hashes.json');

async function computeHashForDirectory(directory) {
  const files = await glob('**/*', {
    cwd: directory,
    nodir: true,
    absolute: true,
    ignore: [
      '**/node_modules/**',
      '**/.temp*/**',
      '**/tmp/**',
      '**/temp/**',
      '**/dist/**',
      '**/build/**',
    ],
  });

  const hash = crypto.createHash('sha256');
  for (const file of files) {
    const content = await readFile(file);
    hash.update(content);
  }
  return hash.digest('hex');
}

async function getStoredHashes() {
  try {
    const content = await readFile(hashFilePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return {};
  }
}

async function saveStoredHashes(hashes) {
  await writeFile(hashFilePath, JSON.stringify(hashes, null, 2), 'utf8');
}

async function buildPackage(packageDir, packageName, uncached = false) {
  if (uncached) {
    await cleanTsBuildInfo(packageDir);
  } else {
    const storedHashes = await getStoredHashes();
    const currentHash = await computeHashForDirectory(packageDir);
    if (storedHashes[packageName] === currentHash) {
      console.log(`Skipping ${packageName}, no changes detected.`);
      return;
    }
    storedHashes[packageName] = currentHash;
    await saveStoredHashes(storedHashes);
  }

  return new Promise((resolve, reject) => {
    const buildProcess = spawn('npm', ['run', 'build'], {
      cwd: packageDir,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, FORCE_COLOR: '1' },
    });

    buildProcess.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build process exited with code ${code}`));
      }
    });
  });
}

async function getDirectories(source) {
  const dirs = await readdir(source, { withFileTypes: true });
  return dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
}

async function cleanTsBuildInfo(packageDir) {
  const tsBuildInfoFiles = await glob('**/*.tsbuildinfo', {
    cwd: packageDir,
    absolute: true,
  });
  for (const file of tsBuildInfoFiles) {
    await unlink(file);
  }
}

async function sortPackagesForBuild(directories) {
  let batches = [];
  let processed = new Set();
  let toProcess = new Set(directories);

  while (toProcess.size > 0) {
    let batch = [];
    for (const dirName of toProcess) {
      const pkgConfig = PACKAGES_CONFIG.find(pkg => pkg.name === dirName);
      const { dependsOn = [] } = pkgConfig || {};
      if (dependsOn.every(dep => processed.has(dep))) {
        batch.push(dirName);
      }
    }

    if (batch.length > 0) {
      batches.push(batch);
      batch.forEach(pkg => {
        processed.add(pkg);
        toProcess.delete(pkg);
      });
    } else {
      throw new Error(
        'Unable to resolve all package dependencies. Check for circular dependencies or configuration errors.',
      );
    }
  }

  return batches;
}

async function buildPackagesInBatch(batch, uncached) {
  const skipArgIndex = process.argv.findIndex(arg => arg === '--skip');
  const skippedPackages =
    skipArgIndex !== -1 ? process.argv[skipArgIndex + 1].split(',') : [];

  await Promise.all(
    batch.map(async dirName => {
      if (skippedPackages.includes(dirName)) {
        console.log(`Skipping ${dirName} as specified by the skip argument.`);
        return;
      }
      const packageConfig = PACKAGES_CONFIG.find(pkg => pkg.name === dirName);
      if (!packageConfig) {
        console.log(`No config found for ${dirName}, skipping.`);
        return;
      }

      // Checking for build requirement
      if (!packageConfig.build) {
        console.log(`Skipping ${dirName}, build not required.`);
        return;
      }

      // Checking environment flags
      const isBrowser = process.argv.includes('--browser');
      const isNode = process.argv.includes('--node');
      const isNodeAndBrowser = (!isBrowser && !isNode) || (isBrowser && isNode);
      if (
        !(isBrowser && packageConfig.browser) &&
        !(isNode && packageConfig.node) &&
        !isNodeAndBrowser
      ) {
        console.log(`Skipping ${dirName} due to environment flags.`);
        return;
      }

      const dirPath = path.join(packagesDir, dirName);

      // Hashing logic
      if (!uncached && packageConfig.hash) {
        const currentHash = await computeHashForDirectory(dirPath);
        const storedHashes = await getStoredHashes();
        if (storedHashes[dirName] === currentHash) {
          console.log(`Skipping ${dirName}, no changes detected.`);
          return;
        } else {
          storedHashes[dirName] = currentHash;
          await saveStoredHashes(storedHashes);
        }
      }

      // Proceed with the build
      await buildPackage(dirPath, dirName, uncached);
    }),
  );
}

async function buildPackages() {
  const isUncached = process.argv.includes('--uncached');
  const directories = await getDirectories(packagesDir);
  const batches = await sortPackagesForBuild(directories);

  for (const batch of batches) {
    await buildPackagesInBatch(batch, isUncached);
  }

  console.log('All relevant packages built successfully.');
}

buildPackages().catch(console.error);
