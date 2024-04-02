//! must be run from the terminal `npm run execute-check` as it requires special tsconfig

import { join } from 'path';
import { generateApigwClient } from './generate-apigw-client';

const bundledOpenapiPath = join(
  __dirname,
  '../../../../../apps/paycode-proxy/api/openapi.bundled.yaml',
);
const outdir = join(__dirname, './.execute-check-results');
const workspaceRoot = join(__dirname, '../../../../../apps/paycode-proxy');

//? Ignore type guard compilation errors
generateApigwClient({
  bundledOpenapiPath,
  outdir,
  workspaceRoot,
  addGuards: true,
}).catch(console.error);
