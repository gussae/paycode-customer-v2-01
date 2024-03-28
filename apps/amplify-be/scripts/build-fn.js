import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function hashDirectory(directoryPath) {
  let hash = crypto.createHash('sha256');
  const files = await fs.readdir(directoryPath, { withFileTypes: true });

  for (const file of files.sort((a, b) => a.name.localeCompare(b.name))) {
    const filePath = path.join(directoryPath, file.name);
    if (file.isDirectory()) {
      hash.update(await hashDirectory(filePath)); // Recursively hash subdirectory contents
    } else {
      const fileBuffer = await fs.readFile(filePath);
      hash.update(fileBuffer);
    }
  }
  return hash.digest('hex');
}

async function runBuild(directory) {
  return new Promise((resolve, reject) => {
    const buildProcess = spawn('npm', ['run', 'build'], {
      cwd: directory,
      stdio: 'inherit',
      shell: true,
      env: process.env,
    });

    buildProcess.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`Build process exited with code ${code}`));
    });
  });
}

async function checkAndBuild(functionDirectories) {
  for (const funcDir of functionDirectories) {
    const srcDir = path.join(funcDir, 'src');
    const hashFilePath = path.join(funcDir, 'hash.tracker');

    try {
      const currentHash = await hashDirectory(srcDir);
      let previousHash = '';

      try {
        previousHash = await fs.readFile(hashFilePath, 'utf-8');
      } catch (err) {
        console.log(
          `No previous hash found for ${funcDir}, proceeding with build.`,
        );
      }

      if (currentHash !== previousHash) {
        console.log(`Changes detected in ${funcDir}, running build...`);
        await runBuild(srcDir);
        await fs.writeFile(hashFilePath, currentHash, 'utf-8');
      } else {
        console.log(`No changes detected in ${funcDir}, skipping build.`);
      }
    } catch (err) {
      console.error(`Error processing function in ${funcDir}:`, err);
      throw err;
    }
  }
}

async function buildFn() {
  const functionsBaseDir = path.normalize(
    path.join(__dirname, '../fn'),
  );
  const functionDirectories = await fs.readdir(functionsBaseDir, {
    withFileTypes: true,
  });
  const functionPaths = functionDirectories
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(functionsBaseDir, dirent.name));

  console.log(functionPaths);
  await checkAndBuild(functionPaths);
}

buildFn().catch(err => {
  console.error('An error occurred during the pre-push hook:', err);
  process.exit(1);
});
