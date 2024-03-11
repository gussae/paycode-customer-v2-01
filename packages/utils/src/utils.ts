/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, promises as fsPromise } from 'fs';
import { dirname, join } from 'path';
import { execSync, exec, spawn, SpawnOptions } from 'child_process';
import { stringify } from 'yaml';
import fs from 'fs-extra';
import './polyfills';
import {
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

export const getCurrentUserToken = (
  awsUserPoolId: string,
  awsUserPoolsWebClientId: string,
): Promise<string | undefined> => {

  const userPool = new CognitoUserPool({
    UserPoolId: awsUserPoolId,
    ClientId: awsUserPoolsWebClientId,
  });

  return new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser !== null) {
      currentUser.getSession(
        (err: Error, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
            return;
          }
          const idToken = session?.getIdToken().getJwtToken();
          console.log(77828, idToken)
          resolve(idToken);
        },
      );
    } else {
      reject('No current user');
    }
  });
};

// New function to inject token into headers
export const getCognitoAuthHeader = async (
  awsUserPoolId: string,
  awsUserPoolsWebClientId: string,
): Promise<Record<string, string>> => {
  try {
    const token = await getCurrentUserToken(
      awsUserPoolId,
      awsUserPoolsWebClientId,
    );
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    throw new Error(`Error getting user token: ${error}`);
  }
};


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
export function spawnCommand(
  command: string,
  args: string[],
  options?: SpawnOptions,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: true,
      stdio: 'inherit',
      env: process.env,
      ...options,
    });
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
export async function commitChanges(
  filesToCommit: string[],
  commitMessage: string,
  cwd: string,
): Promise<void> {
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
export async function pushChanges(
  branchName: string,
  cwd: string,
): Promise<void> {
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
export async function findProjectRoot(
  startDir: string,
): Promise<string | null> {
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
export async function runBuildInProjectRoot(
  projectRoot: string,
): Promise<void> {
  await spawnCommand('npm', ['run', 'build'], { cwd: projectRoot });
}

/**
 * Creates a tsconfig.json file with a loose configuration in the specified directory.
 *
 * @param {string} tsConfigDir The directory where tsconfig.json will be created.
 * @param {string[]} includePaths Array of paths to include in the compilation context.
 */
export async function createTsConfigJson(
  tsConfigDir: string,
  includePaths: string[],
  compileOptions?: Record<string, any>,
): Promise<void> {
  const tsConfigPath = join(tsConfigDir, 'tsconfig.json');
  const tsConfigContent = {
    compilerOptions: {
      allowJs: true,
      noEmit: true,
      strict: false,
      skipLibCheck: true,
      noImplicitAny: false,
      noImplicitThis: false,
      alwaysStrict: false,
      isolatedModules: true,
      noEmitOnError: false,
      target: 'ESNext',
      ...compileOptions,
    },
    include: includePaths,
  };

  try {
    await fsPromise.writeFile(
      tsConfigPath,
      JSON.stringify(tsConfigContent, null, 4),
    );
    console.log(`tsconfig.json created successfully at ${tsConfigPath}`);
  } catch (error) {
    console.error(`Error creating tsconfig.json at ${tsConfigPath}:`, error);
    throw error; // Re-throw to allow calling code to handle it
  }
}

/**
 * Converts a JSON file to a YAML file.
 * @param filePath - The path to the JSON file.
 * @returns A promise that resolves when the conversion is complete.
 */
export async function convertJsonToYaml(filePath: string): Promise<void> {
  return fs.readFile(filePath, 'utf8').then(data => {
    const obj = JSON.parse(data);
    const yamlStr = stringify(obj);
    const yamlFilePath = filePath.replace(/\.json$/, '.yaml');
    return fs.writeFile(yamlFilePath, yamlStr, 'utf8');
  });
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
