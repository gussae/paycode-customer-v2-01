/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import fs from 'fs';
import { log, logError, runBuildInProjectRoot } from './utils';

export interface ExecuteCheckProps {
  deploymentEnv: string;
  envars: Record<string, string>;
  event: any;
  profile: string;
  projectRoot: string;
  region: string;
  options?: {
    debug: boolean;
    srcDir?: string;
    distDir?: string;
    srcEntryTsFilename?: string;
    distEntryJsFilename?: string;
  };
}

/**
 * Executes a series of checks for a Lambda function.
 * @param envars - The environment variables to set.
 * @param event - The event object to pass to the Lambda function.
 * @param options - Optional configuration options.
 *
 * !NOTE: execute-check must be run as the main process at the root of the project. Edit paths if you are not using conventions in the defaults.
 * @defaults srcDir - './src', distDir - './dist', srcEntryTsFilename - 'index.ts', distEntryJsFilename - 'index.js'
 */
export async function executeCheckLambda({
  deploymentEnv,
  envars,
  event,
  options,
  profile,
  projectRoot,
  region,
}: ExecuteCheckProps): Promise<void> {
  // Set environment variables
  Object.entries(envars).forEach(([key, value]) => {
    process.env[key] = value;
  });


  console.log('Env:', { region, profile, deploymentEnv });
  process.env.AWS_REGION = region;
  process.env.AWS_PROFILE = profile;
  process.env.DEPLOYMENT_ENV = deploymentEnv;

  // Path configurations
  const {
    srcDir = './src',
    distDir = './dist',
    srcEntryTsFilename = 'index.ts',
    distEntryJsFilename = 'index.js',
    debug = false,
  } = options || {};
  const srcPath = path.resolve(projectRoot, srcDir, srcEntryTsFilename);
  const distPath = path.resolve(projectRoot, distDir, distEntryJsFilename);

  //turn off Logging Level to avoid duplicate:instead use DEBUG = true
  process.env.LOGGING_LEVEL = '';
  process.env.DEBUG = debug ? 'true' : '';

  try {
    log('Starting source check...');
    if (fs.existsSync(srcPath)) {
      const tsNode = await import('ts-node');
      tsNode.register({ transpileOnly: true });

      const module = await dynamicImport(srcPath);
      const response = await module.handler(event);
      log('Source check result:', response);

      if (projectRoot) {
        await runBuildInProjectRoot(projectRoot);
      }

      log('Starting bundle check...');
      const bundleModule = await import(distPath);
      if (bundleModule.handler) {
        const bundleResponse = await bundleModule.handler(event);
        log('Bundle check result:', bundleResponse);
      } else {
        throw new Error('Handler function not found in bundle.');
      }
    } else {
      throw new Error('Source file does not exist.');
    }
  } catch (error) {
    logError(
      `Error during execution: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exit(1);
  }
}

/**
 * Dynamically imports a module from the specified module path.
 *
 * @param modulePath The path of the module to import.
 * @returns A promise that resolves to the imported module.
 * @throws If there is an error importing the module.
 */
async function dynamicImport(modulePath: string): Promise<any> {
  try {
    const importedModule = await import(modulePath);
    // Handle cjs/esm module formats
    return importedModule.default ?? importedModule;
  } catch (error) {
    console.error(`Error importing module ${modulePath}:`, error);
    throw error;
  }
}
