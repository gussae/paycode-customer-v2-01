const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const exec = promisify(require('child_process').exec);
const { glob } = require('glob');
const { packagesConfig: PACKAGES_CONFIG } = require('../.monorepo.config.json');
const statAsync = promisify(fs.stat);
const readFileAsync = promisify(fs.readFile);

const readdirAsync = promisify(fs.readdir);

const rootDir = path.join(__dirname, '../');
const packagesDir = path.join(rootDir, 'packages');

async function buildPackage(packageDir, uncached = false) {
  //you want error to be thrown if build fails
  uncached && await cleanTsBuildInfo(packageDir);
  const { stdout } = await exec('npm run build', { cwd: packageDir });
  console.log(stdout);
}

async function getDirectories(source) {
  const dirs = await readdirAsync(source, { withFileTypes: true });
  return dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
}

async function cleanTsBuildInfo(packageDir) {
  try {
    const tsBuildInfoFiles = await glob('**/*.tsbuildinfo', {
      cwd: packageDir,
      absolute: true,
    });
    tsBuildInfoFiles.forEach(async file => {
      await fs.promises.unlink(file);
    });
  } catch (error) {
    console.error(`Error cleaning .tsbuildinfo in ${packageDir}:`, error);
  }
}

async function buildPackages() {
  const isBrowser = process.argv.includes('--browser');
  const isNode = process.argv.includes('--node');
  const isUncached = process.argv.includes('--uncached');
  const isNodeAndBrowser = (isBrowser && isNode) || (!isBrowser && !isNode);

  try {
    const directories = await getDirectories(packagesDir);
    const buildPromises = directories.map(async dirName => {
      const packageConfig = PACKAGES_CONFIG.find(pkg => pkg.name === dirName);
      if (!packageConfig) {
        console.log(`No config found for ${dirName}, skipping.`);
        return;
      }
      const dirPath = path.join(packagesDir, dirName);
      const packageJsonPath = path.join(dirPath, 'package.json');
      let packageJsonExists = false;
      let packageJson;

      try {
        const stats = await statAsync(packageJsonPath);
        if (stats.isFile()) {
          packageJson = JSON.parse(
            await readFileAsync(packageJsonPath, 'utf8'),
          );
          packageJsonExists = true;
        }
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`No package.json found for ${dirName}, skipping.`);
          return;
        } else {
          console.error(`Error reading ${dirName}:`, error);
          return;
        }
      }

      // Proceed if package.json exists and has a build script
      if (
        packageJsonExists &&
        packageJson.scripts &&
        packageJson.scripts.build
      ) {
        // Filter based on the environment flags and platform
        if (
          packageConfig.platform === 'ts' &&
          ((isBrowser && packageConfig.env.browser) ||
            (isNode && packageConfig.env.node) ||
            isNodeAndBrowser)
        ) {
          try {
            await buildPackage(dirPath);
          } catch (error) {
            // Log but do not halt the build process for other packages
            console.error(`Error building ${dirName}:`, error);
          }
        } else {
          console.log(
            `Skipping ${dirName} due to environment flags or platform.`,
          );
        }
      } else if (!packageJson.scripts || !packageJson.scripts.build) {
        console.log(
          `No build script found in package.json for ${dirName}, skipping.`,
        );
      }
    });

    await Promise.all(buildPromises);
    console.log('Relevant packages built successfully.');
  } catch (error) {
    console.error('Error in building process:', error);
  }
}

buildPackages().catch(console.error);
