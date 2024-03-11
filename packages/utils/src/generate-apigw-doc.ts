import path from 'path';
import { spawnCommand } from './utils';

export interface GenerateApiDocParams {
  openapiSpecPath: string;
  outdir: string;
}
/**
 * Generates API documentation using Redocly.
 *
 * @param openapiSpecPath - The path to the OpenAPI specification file.
 * @param outdir - The output directory for the generated documentation.
 * @returns A Promise that resolves when the documentation generation is complete.
 */
export async function generateApigwDoc({
  openapiSpecPath,
  outdir,
}: GenerateApiDocParams): Promise<void> {
  // Generate API documentation using Redocly
  await spawnCommand('redocly', [
    'build-docs',
    '--output',
    path.join(outdir, 'index.html'),
    openapiSpecPath,
  ]);
}
