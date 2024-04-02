/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTsConfigJson, spawnCommand } from '../utils';
import fs from 'fs-extra';
import { join } from 'path';

interface TempPaths {
  TEMP_DIR_PATH: string;
  TEMP_OPENAPI_SPEC_PATH: string;
  TEMP_API_TS_CLIENT_DIR: string;
  TEMP_API_TS_CLIENT_ENTRY: string;
  TEMP_API_TS_CLIENT_PATH: string;
}

//due to some path issues, the code is first generated in a temp folder within the api workspace and copied to outdir

export interface GenerateApigwClientProps {
  workspaceRoot: string;
  bundledOpenapiPath: string;
  outdir: string;
  addGuards?: boolean;
}
const TEMP_DIR_NAME = `.temp-generate-${Math.random().toString().split('.').pop()}`;

function generateTempPaths(workspaceRoot: string): TempPaths {
  const TEMP_DIR_PATH = join(workspaceRoot, TEMP_DIR_NAME);
  return {
    TEMP_DIR_PATH: TEMP_DIR_PATH,
    TEMP_OPENAPI_SPEC_PATH: join(TEMP_DIR_PATH, 'openapi.yaml'),
    TEMP_API_TS_CLIENT_DIR: join(TEMP_DIR_PATH, 'client'),
    TEMP_API_TS_CLIENT_ENTRY: join(TEMP_DIR_PATH, 'client', 'index.ts'),
    TEMP_API_TS_CLIENT_PATH: join(TEMP_DIR_PATH, 'client', 'API.ts'),
  };
}

async function modifyAndExposeAxios(apiFilePath: string): Promise<void> {
  let content = await fs.readFile(apiFilePath, { encoding: 'utf8' });
  content += `\nexport const getAxiosInstance = () => axios;\n`;
  await fs.writeFile(apiFilePath, content, { encoding: 'utf8' });
}

async function exportAsLibrary(
  workspaceRoot: string,
  addGuards = false,
): Promise<void> {
  const tempPaths = generateTempPaths(workspaceRoot);
  let indexContent = `export * from './API';`;
  if (addGuards) {
    indexContent += `\nexport * from './API.guard';\n`;
  }
  await fs.writeFile(tempPaths.TEMP_API_TS_CLIENT_ENTRY, indexContent);
}

/**
 * Generates an API Gateway client based on the provided parameters.
 * @param {GenerateApigwClientProps} options - The options for generating the client.
 * @returns {Promise<void>} - A promise that resolves when the client generation is complete.
 * @throws {Error} - If there is an error generating the API client.
 */
export async function generateApigwClient({
  workspaceRoot,
  bundledOpenapiPath,
  outdir,
  addGuards = false,
}: GenerateApigwClientProps): Promise<void> {
  const tempPaths = generateTempPaths(workspaceRoot);
  // console.log(111111111, { tempPaths });
  try {
    await fs.ensureDir(tempPaths.TEMP_DIR_PATH);
    await fs.ensureDir(tempPaths.TEMP_API_TS_CLIENT_DIR);

    const opts = { cwd: workspaceRoot };

    await fs.copy(bundledOpenapiPath, tempPaths.TEMP_OPENAPI_SPEC_PATH);

    //orval needs special handling
    await spawnCommand(
      'npx',
      [
        '-y',
        'orval',
        '--input',
        tempPaths.TEMP_OPENAPI_SPEC_PATH,
        '--output',
        join(tempPaths.TEMP_API_TS_CLIENT_PATH),
      ],
      opts,
    );

    await modifyAndExposeAxios(tempPaths.TEMP_API_TS_CLIENT_PATH);
    //create type guards
    if (addGuards) {
      const tsAutoGuardArgs = [
        '--export-all',
        tempPaths.TEMP_API_TS_CLIENT_PATH,
      ];
      if (process.env.DEPLOYMENT_ENV !== 'prod')
        tsAutoGuardArgs.push('--debug');
      await spawnCommand('ts-auto-guard', tsAutoGuardArgs, opts);
      await exportAsLibrary(workspaceRoot, true);
    } else {
      await exportAsLibrary(workspaceRoot);
    }

    //transpile to js
    const compileOpts = { cwd: tempPaths.TEMP_API_TS_CLIENT_DIR };
    await createTsConfigJson(tempPaths.TEMP_API_TS_CLIENT_DIR, ['*.ts'], {
      noEmit: false,
    });
    try {
      await spawnCommand('tsc', [], compileOpts);
    } catch (e) {
      //?suppressing error as generally type guards will have typescript errors even though they are valid JS outputs
      console.warn('TSC failed', e);
    }

    //output
    await fs.move(tempPaths.TEMP_API_TS_CLIENT_DIR, outdir, {
      overwrite: true,
    });
    //sleep just in case the file is busy
    await new Promise(resolve => setTimeout(resolve, 10000));

    await fs.remove(tempPaths.TEMP_DIR_PATH);
  } catch (error) {
    console.error('Error generating API client', error);
    throw error;
  }
}
