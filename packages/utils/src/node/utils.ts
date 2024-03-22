/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpawnOptions, exec, execSync, spawn } from 'child_process';
import { existsSync, promises as fsPromise } from 'fs';
import { CompilerOptions } from 'typescript';
import fs from 'fs-extra';
import { dirname, join } from 'path';
import { stringify } from 'yaml';
import {
  CloudFormationClient,
  ListExportsCommand,
  ListExportsCommandOutput,
} from '@aws-sdk/client-cloudformation';

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
 * Creates a tsconfig.json file with the specified compiler options and include paths.
 * @param tsConfigDir - The directory where the tsconfig.json file will be created.
 * @param includePaths - An array of paths to include in the tsconfig.json file.
 * @param compileOptions - Optional compiler options to override the default options.
 * @returns A Promise that resolves when the tsconfig.json file is created successfully.
 * @throws If there is an error creating the tsconfig.json file.
 */
export async function createTsConfigJson(
  tsConfigDir: string,
  includePaths: string[],
  compileOptions?: CompilerOptions,
): Promise<void> {
  const tsConfigPath = join(tsConfigDir, 'tsconfig.json');
  const tsConfigContent = {
    compilerOptions: {
      allowJs: true,
      alwaysStrict: false,
      isolatedModules: true,
      module: 'CommonJS',
      moduleResolution: 'Node',
      noEmit: true,
      noEmitOnError: false,
      noImplicitAny: false,
      noImplicitThis: false,
      strict: false,
      skipLibCheck: true,
      target: 'ES6',
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
 * Removes a directory with a progressive backoff retry mechanism.
 *
 * @param path - The path of the directory to remove.
 * @param maxRetries - The maximum number of retry attempts.
 * @param backoff - The initial backoff delay in milliseconds.
 */
export async function cleanupDir(
  path: string,
  maxRetries: number = 5,
  backoff: number = 100,
): Promise<void> {
  if (!path) return;
  if (!fs.existsSync(path)) return;
  let attempts = 0;

  const remove = async () => {
    try {
      await fs.remove(path);
      console.log(`Directory removed successfully: ${path}`);
    } catch (err) {
      if (attempts < maxRetries) {
        attempts++;
        console.warn(
          `Attempt ${attempts} failed, retrying in ${backoff}ms...`,
          err,
        );
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2;
        await remove();
      } else {
        throw new Error(
          `Failed to remove directory after ${maxRetries} attempts: ${path}`,
        );
      }
    }
  };

  await remove();
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

// Function to retrieve an export value by its name
export async function getExportValue(
  exportName: string,
  region: string,
): Promise<string | undefined> {
  const client = new CloudFormationClient({ region: region });
  let nextToken: string | undefined = undefined;
  do {
    const response: ListExportsCommandOutput = await client.send(
      new ListExportsCommand({ NextToken: nextToken }),
    );
    nextToken = response.NextToken;
    const exportValue = response.Exports?.find(
      exportObj => exportObj.Name === exportName,
    )?.Value;
    if (exportValue) {
      return exportValue;
    }
  } while (nextToken);

  return undefined;
}

// Usage example
const exportName = "GetAttDocumentDataSourceName";
const region = "us-west-2"; // Specify your AWS region
process.env.AWS_PROFILE= "awsist-dev"
getExportValue(exportName, region)
  .then(value => {
    if (value) {
      console.log(`Value for ${exportName}:`, value);
    } else {
      console.log(`Export named ${exportName} not found.`);
    }
  })
  .catch(error => {
    console.error("Error fetching export value:", error);
  });