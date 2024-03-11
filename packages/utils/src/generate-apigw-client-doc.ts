import fs from 'fs-extra';
import path from 'path';
import { createTsConfigJson, spawnCommand } from './utils';

export interface GenerateApigwClientDocProps {
  clientPath: string;
  outdir: string;
  workspaceRoot: string;
}
/**
 * Generates API client documentation.
 *
 * @param clientPath - The path to the client file.
 * @param outdir - The output directory for the generated documentation.
 * @param workspaceRoot - The root directory of the workspace.
 * @returns A promise that resolves when the documentation generation is complete.
 * @throws If there is an error generating the documentation.
 */
export async function generateApigwClientDoc({
  clientPath,
  outdir,
  workspaceRoot,
}: GenerateApigwClientDocProps): Promise<void> {
  //! Must run inside the project root or you would need to install dependencies used by the client.
  const tempDir = path.join(workspaceRoot, '.temp-generateClientDoc');

  try {
    const tempClientPath = path.join(tempDir, 'API.ts');
    const tempClientDir = path.dirname(tempClientPath);
    const tempOutDir = path.join(tempDir, 'docs');
    await fs.copy(clientPath, tempClientDir, { overwrite: true });
    // loose configuration
    const tsConfigPath = path.join(tempDir, 'tsconfig.json');
    await createTsConfigJson(tempDir, [tempClientPath]);

    await spawnCommand(
      'typedoc',
      [
        tempClientDir,
        '--out',
        tempOutDir,
        '--tsconfig',
        tsConfigPath,
        '--entryPointStrategy',
        'expand',
      ],
      { cwd: workspaceRoot },
    );

    await fs.copy(tempOutDir, outdir);
    console.log('API client doc generated at', outdir);
    await fs.remove(tempDir);
  } catch (e) {
    console.error('Error generating API client doc', e);
    throw e;
  } finally {
    await fs.remove(tempDir);
  }
}

