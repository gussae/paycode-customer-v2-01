// scripts/extract-api-types.ts
import fs from 'fs/promises';
import * as ts from 'typescript';

/**
 * Extracts TypeScript definitions for API from a source file and writes them to an output file.
 * @param sourceFilePath - The path of the source file containing API types.
 * @param outputFilePath - The path of the output file where the extracted API types will be written.
 */
export async function extractApiTypes(
  sourceFilePath: string,
  outputFilePath: string,
) {
  const program = ts.createProgram([sourceFilePath], {});
  const sourceFile = program.getSourceFile(sourceFilePath);

  if (!sourceFile) {
    console.error(`Source file ${sourceFilePath} not found.`);
    return;
  }

  let outputContent = `
// TypeScript definitions for API\n
import type {
AxiosRequestConfig,
AxiosResponse
} from 'axios';
`;

  ts.forEachChild(sourceFile, node => {
    if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      const nodeText = node.getFullText(sourceFile);
      outputContent += `${nodeText}\n`;
    }
  });

  await fs.writeFile(outputFilePath, outputContent);
  console.log(`API types extracted to ${outputFilePath}`);
}
