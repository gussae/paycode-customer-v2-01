//! must be run from the terminal `npm run execute-check` as it requires special tsconfig

import { join } from 'path';
import { generateApigwClient } from './generate-apigw-client';
import { generateApigwClientDoc } from './generate-apigw-client-doc';
import { generateApigwDoc } from './generate-apigw-doc';

const bundledOpenapiPath = join(
  __dirname,
  '../../../../apps/paycode-proxy/api/openapi.bundled.yaml',
);
const outdir = join(__dirname, './.execute-check-results');
const workspaceRoot = join(__dirname, '../../../../apps/paycode-proxy/');

//? Ignore type guard compilation errors
generateApigwClient({
  bundledOpenapiPath,
  outdir: join(outdir, 'client'),
  workspaceRoot,
  addGuards: true,
})
  .then(() => {
    //need to wait till the client is generated before generating the client doc
    generateApigwClientDoc({
      clientPath: join(outdir, 'client'),
      outdir: join(outdir, 'docs', 'client'),
      workspaceRoot,
    }).catch(console.error);
  })

  .catch(console.error);

generateApigwDoc({
  openapiSpecPath: bundledOpenapiPath,
  outdir: join(outdir, 'docs', 'api'),
}).catch(console.error);
