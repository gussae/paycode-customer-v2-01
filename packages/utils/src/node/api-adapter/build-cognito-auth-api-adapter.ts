import fs from 'fs-extra';
import { join } from 'path';
import { ModuleKind, ScriptTarget } from 'typescript';
import { createTsConfigJson, spawnCommand } from '../utils';
import { generateApigwClient } from '../apigw-utils/generate-apigw-client';

export interface BuildCognitoAuthApiAdapterProps {
  apiUrl: string;
  awsUserPoolsId: string;
  awsUserPoolsWebClientId: string;
  bundledOpenapiPath: string;
  outdir: string;
  workspaceRoot: string;
}

/**
 * Builds a Cognito authenticated API adapter.
 * @param options - The options for building the adapter.
 * @returns A promise that resolves when the adapter is built.
 */
export async function buildCognitoAuthApiAdapter(
  options: BuildCognitoAuthApiAdapterProps,
): Promise<void> {
  const {
    apiUrl,
    awsUserPoolsId,
    awsUserPoolsWebClientId,
    bundledOpenapiPath,
    outdir,
    workspaceRoot,
  } = options;
  const tempDirName = `.temp-${Math.random().toString().split('.').pop()}`;
  const tempDirPath = join(outdir, tempDirName);
  const tempBuildDir = join(tempDirPath, 'build');
  console.log('Generating API client...');

  try {
    await fs.ensureDir(tempDirPath);
    await fs.ensureDir(tempBuildDir);
    await generateApigwClient({
      bundledOpenapiPath,
      outdir: tempDirPath,
      workspaceRoot,
    });

    console.log({
      outdir: tempDirPath,
      bundledOpenapiPath,
      workspaceRoot,
    })

    //*copy api-adapter and cognito-get-current-user-token to the temp directory (they are browser compatible and only depends on external modules: but not this module, which is node based - the very need for the building)
    await fs.copy(
      join(__dirname, 'api-adapter.ts'),
      join(tempDirPath, 'api-adapter.ts'),
    );
    await fs.copy(
      join(__dirname, 'get-current-user-token.ts'),
      join(tempDirPath, 'get-current-user-token.ts'),
    );

    //?polyfills are needed for node based testing as there is browser specific module used in the get-current-user-token
    await fs.copy(
      join(__dirname, 'polyfills.js'),
      join(tempDirPath, 'polyfills.js'),
    );

    // Modify the API client and create a staging module
    const adapterCode = `
    import * as API from './API';
    import { apiAdapter } from './api-adapter';
    import { getCurrentUserToken } from './get-current-user-token';

    export const getApiAdapter = async () => {
      const token = await getCurrentUserToken("${awsUserPoolsId}", "${awsUserPoolsWebClientId}");
      return apiAdapter("${apiUrl}", token, API);
    };
  `;

    const getAdapterFilepath = join(tempDirPath, 'get-api-adapter.ts');
    await fs.writeFile(getAdapterFilepath, adapterCode);

    // Check and append the export statements to export the apiAdapter, getApiAdapter and getCurrentUserToken
    const modulesToExport = [
      './api-adapter',
      './get-api-adapter',
      './get-current-user-token',
    ];

    const indexPath = join(tempDirPath, 'index.ts');
    const indexFileExists = await fs.pathExists(indexPath);

    if (indexFileExists) {
      let indexContent = await fs.readFile(indexPath, 'utf8');

      modulesToExport.forEach(async modulePath => {
        const exportStatement = `\nexport * from '${modulePath}';`;

        // Append if it doesn't exist already;
        if (!indexContent.includes(exportStatement.trim())) {
          indexContent += exportStatement;
        }
      });

      await fs.writeFile(indexPath, indexContent);
    } else {
      throw new Error('index.ts not found in the specified outdir');
    }

    // Generate tsconfig.json in the temporary directory and build the API client
    await createTsConfigJson(tempDirPath, ['./**/*.ts'], {
      declaration: true,
      declarationMap: true,
      noEmit: false,
      outDir: tempBuildDir,
      module: 'ESNext' as unknown as ModuleKind,
      target: 'ESNext' as unknown as ScriptTarget,
    });

    //this automatically inherits the shell and will be able to see the PATH variables and use the local typescript ensuring consistent build in CI as well as locally
    await spawnCommand('tsc', ['-p', join(tempDirPath, 'tsconfig.json')], {
      cwd: tempDirPath,
    });

    // output
    await fs.move(tempBuildDir, join(outdir, 'client'), { overwrite: true });
    console.log(
      'API adapter builder has successfully created the API client and adapter in the output directory.',
    );
  } catch (error) {
    console.error('Error in apiAdapterBuilder:', error);
    throw error;
  } finally {
    // Clean up the temp directory if it still exists
    if (await fs.pathExists(tempDirPath)) {
      await fs.remove(tempDirPath);
    }
  }
}
