import { getMonorepoConfig } from '@paycode-customer-v2/config';
import path, { join } from 'path';
import { generateApigwDoc } from './generate-apigw-doc';
import { generateTypescriptDoc } from './generate-typescript-doc';

interface DocEntry {
  outputName: string;
  path: string;
}

interface GenerateApiDocParams {
  entryFiles: DocEntry[];
  openapiSpecs: DocEntry[];
  outdir: string;
}

async function generateDocs({
  entryFiles,
  openapiSpecs,
  outdir,
}: GenerateApiDocParams) {
  const {
    paths: { __monorepoRoot },
  } = await getMonorepoConfig();
  const OUTDIR = path.join(__monorepoRoot, outdir);

  // Generate TypeScript Documentation tasks
  const tsDocTasks = entryFiles.map(
    ({ outputName, path: entryPath }) =>
      async () => {
        const docsOutDir = path.join(OUTDIR, 'typescript', outputName);
        await generateTypescriptDoc({
          entryPath: join(__monorepoRoot, entryPath),
          outdir: docsOutDir,
          workspaceRoot: __monorepoRoot,
        });
      },
  );

  // Generate API Documentation tasks
  const apiDocTasks = openapiSpecs.map(
    ({ outputName, path: specPath }) =>
      async () => {
        const docsOutDir = path.join(OUTDIR, 'api', outputName);
        await generateApigwDoc({
          openapiSpecPath: join(__monorepoRoot, specPath),
          outdir: docsOutDir,
        });
      },
  );

  // Combine all tasks and execute them in parallel
  const allTasks = [...tsDocTasks, ...apiDocTasks];
  await Promise.all(allTasks.map(task => task()));
}

// Execute

generateDocs({
  outdir: 'docs/generated',
  entryFiles: [
    {
      outputName: 'graphql',
      path: 'packages/graphql/src/index.ts',
    },
    {
      outputName: 'clients',
      path: 'packages/utils/src/browser/index.ts',
    },
  ],
  openapiSpecs: [
    {
      outputName: 'paycode-proxy',
      path: 'apps/paycode-proxy/api/openapi.bundled.yaml',
    },
  ],
})
  .then(() => console.log('Documentation generation completed.'))
  .catch(console.error);
