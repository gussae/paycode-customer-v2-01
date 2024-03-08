/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { execSync, exec, spawn } from 'child_process';

/**
 * Executes a synchronous command and returns the output as a string.
 * @param command The command to execute.
 * @param cwd The current working directory for the command.
 * @returns The output of the command as a string.
 */
export function execSyncCommand(command: string, cwd: string): string {
    return execSync(command, { env: process.env, cwd }).toString().trim();
}

/**
 * Spawns a command as a child process and returns a promise that resolves when the command completes successfully.
 * @param command - The command to be executed.
 * @param args - The arguments to be passed to the command.
 * @param cwd - The current working directory for the command.
 * @returns A promise that resolves when the command completes successfully, or rejects with an error if the command fails.
 */
export function spawnCommand(command: string, args: string[], cwd: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { cwd, shell: true, stdio: 'inherit', env: process.env });
        child.on('close', (code: number) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`spawnCommand exited with code ${code}`));
            }
        });
        child.on('error', (error: Error) => reject(error));
    });
}

/**
 * Executes a command in the specified directory.
 * @param command - The command to execute.
 * @param cwd - The current working directory.
 * @returns A promise that resolves with the command output as a string.
 */
export function execCommand(command: string, cwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, { cwd, env: process.env }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(new Error(stderr));
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

/**
 * Commits changes to the Git repository.
 * @param filesToCommit - An array of file paths to be committed.
 * @param commitMessage - The commit message.
 * @param cwd - The current working directory.
 * @returns A Promise that resolves when the changes are committed.
 * @throws If there is an error committing the changes.
 */
export async function commitChanges(filesToCommit: string[], commitMessage: string, cwd: string): Promise<void> {
    try {
        await execCommand(`git add ${filesToCommit.join(' ')}`, cwd);
        await execCommand(`git commit -m "${commitMessage}"`, cwd);
        console.log(`Committed changes: ${commitMessage}`);
    } catch (error) {
        console.error(`Error committing changes: ${error.message}`);
        throw error;
    }
}

/**
 * Pushes changes to a Git branch.
 *
 * @param branchName - The name of the branch to push changes to.
 * @param cwd - The current working directory.
 * @returns A promise that resolves when the changes are successfully pushed.
 * @throws If there is an error while pushing changes.
 */
export async function pushChanges(branchName: string, cwd: string): Promise<void> {
    try {
        await execCommand(`git push origin ${branchName}`, cwd);
        console.log(`Pushed changes to branch: ${branchName}`);
    } catch (error) {
        console.error(`Error pushing changes: ${error.message}`);
        throw error;
    }
}


/**
 * Asynchronously finds the root directory of a Node.js project (where the package.json is located).
 *
 * @param startDir The starting directory to begin the search from, usually `__dirname` or `process.cwd()`.
 * @returns A promise that resolves to the path to the project root directory, or null if not found.
 */
export async function findProjectRoot(startDir: string): Promise<string | null> {
  let currentDir = startDir;

  // Prevent infinite loop
  const root = dirname(startDir);
  if (root === startDir) {
    return null;
  }

  while (currentDir !== root) {
    if (existsSync(join(currentDir, 'package.json'))) {
      return currentDir;
    }

    currentDir = dirname(currentDir);
  }

  // If we reach the root without finding a package.json, return null
  return null;
}

/**
 * Runs the build script defined in package.json at the project root directory.
 *
 * @param projectRoot The root directory of the project where the build command will be executed.
 * @returns A promise that resolves when the build is successful, or rejects if the build fails.
 */
export async function runBuildInProjectRoot(projectRoot: string): Promise<void> {
  await spawnCommand('npm', ['run', 'build'], projectRoot);
}



/**
 * Custom log function to output messages with padding for emphasis.
 * @param  {...any} args Arguments to log.
 */
export function log(...args: any[]): void {
  console.log('\n', ...args, '\n');
}

/**
 * Custom logError function to output error messages with padding for emphasis.
 * @param  {...any} args Arguments to log as error.
 */
export function logError(...args: any[]): void {
  console.error('\n', ...args, '\n');
}
