//execute-check generate functions

import { join } from 'path';
import { generateApigwClient } from './generate-apigw-client';
import { generateApigwClientDoc } from './generate-apigw-client-doc';
import { generateApigwDoc } from './generate-apigw-doc';

//? Ignore type guard compilation errors
generateApigwClient({
  bundledOpenapiPath: join(
    __dirname,
    '../../../apps/paycode-proxy/api/openapi.bundled.yaml',
  ),
  outdir: join(__dirname, '../.generated-tests/client'),
  workspaceRoot: join(__dirname, '../../../apps/paycode-proxy/'),
  addGuards: true,
})
  .then(() => {
    //need to wait till the client is generated before generating the client doc
    generateApigwClientDoc({
      clientPath: join(__dirname, '../.generated-tests/client/'),
      outdir: join(__dirname, '../.generated-tests/docs/client'),
      workspaceRoot: join(__dirname, '../../../apps/paycode-proxy'),
    }).catch(console.error);
  })

  .catch(console.error);

generateApigwDoc({
  openapiSpecPath: join(
    __dirname,
    '../../../apps/paycode-proxy/api/openapi.bundled.yaml',
  ),
  outdir: join(__dirname, '../.generated-tests/docs/api'),
}).catch(console.error);
