/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as CONFIG from '@paycode-customer-v2/config';
import os from 'os';
import { join } from 'path';

//? Use the amplify-be workspace to import the client params so that it can be used to build the api adapter enabling the frontend app to import it statically and use it to make requests to the backend api
let amplifyBeWorkspaceRoot = join(
  __dirname,
  '../../../../../../apps/amplify-be',
);
let paycodeProxyWorkspaceRoot = join(
  __dirname,
  '../../../../../../apps/paycode-proxy',
);
let bundledOpenapiPath = join(
  paycodeProxyWorkspaceRoot,
  'api',
  'openapi.bundled.yaml',
);

if (os.platform() === 'win32') {
  amplifyBeWorkspaceRoot = amplifyBeWorkspaceRoot.replace(/\\/g, '\\\\');
  bundledOpenapiPath = bundledOpenapiPath.replace(/\\/g, '\\\\');
  paycodeProxyWorkspaceRoot = paycodeProxyWorkspaceRoot.replace(/\\/g, '\\\\');
}

//?note that if you have other APIs, you can add them here

const {
  imports: { paycodeProxyApiUrl },
  exportsLookup: { awsUserPoolsId, awsUserPoolsWebClientId },
} = CONFIG.getConfig(amplifyBeWorkspaceRoot);

if (!awsUserPoolsId || !awsUserPoolsWebClientId || !paycodeProxyApiUrl) {
  throw new Error('Missing required configuration');
}

console.debug({
  awsUserPoolsId,
  awsUserPoolsWebClientId,
  bundledOpenapiPath,
  paycodeProxyWorkspaceRoot,
  paycodeProxyApiUrl,
});

export const getPaycodeApiConfig = () => ({
  awsUserPoolsId,
  awsUserPoolsWebClientId,
  bundledOpenapiPath,
  paycodeProxyWorkspaceRoot,
  paycodeProxyApiUrl,
});

//execute check
if (require.main == module) console.log(getPaycodeApiConfig());
