import fs from 'fs-extra';
import path from 'path';
import { spawnCommand, createTsConfigJson, cleanupDir } from '../utils';

export interface GenerateTypescriptDocProps {
  entryPath: string;
  outdir: string;
  workspaceRoot: string;
}

/**
 * Generates TypeScript documentation for a given entry point.
 *
 * @param entryPath - The path to the entry file or directory for documentation generation.
 * @param outdir - The output directory where the generated documentation will be placed.
 * @param workspaceRoot - The root directory of the workspace, used for resolving paths.
 * @returns A promise that resolves when the documentation generation process is complete.
 * @throws If there is an error during the documentation generation process.
 */
export async function generateTypescriptDoc({
  entryPath,
  outdir,
  workspaceRoot,
}: GenerateTypescriptDocProps): Promise<void> {
  const tempDir = path.join(workspaceRoot, `.temp-${Math.random().toString().split('.').pop()}`);
  await fs.ensureDir(tempDir); // Ensure temporary directory exists for tsconfig.json

  try {
    // Generate a temporary tsconfig.json for Typedoc
    const tsConfigPath = path.join(tempDir, 'tsconfig.json');
    await createTsConfigJson(tempDir, [entryPath]);

    // Use Typedoc to generate documentation directly from the entry path
    await spawnCommand(
      'typedoc',
      [
        entryPath,
        '--out',
        outdir,
        '--tsconfig',
        tsConfigPath,
        '--entryPointStrategy',
        'expand',
      ],
      { cwd: workspaceRoot },
    );

    console.log(`Documentation generated at ${outdir}`);
  } catch (e) {
    console.error('Error generating documentation', e);
    throw e;
  } finally {
    await cleanupDir(tempDir); // Cleanup temporary directory
  }
}
