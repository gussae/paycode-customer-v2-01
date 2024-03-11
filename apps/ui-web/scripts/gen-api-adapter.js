//TODO  migrate to the new api adapter generation
// import path from 'path';
// import { fileURLToPath } from 'url';
// import config from './config.js';
// import utils from '@paycode-customer-v2/utils';
// //generate paycode apigw client and inject it into utils.ts
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const { awsUserPoolsId, awsUserPoolsWebClientId, paycodeProxyUrl } =
//   config.imports;
// utils.generateProxyApiAdapterModule({
//   apiUrl: paycodeProxyUrl,
//   awsUserPoolsId,
//   awsUserPoolsWebClientId,
//   apiWorkspaceRoot: path.resolve(__dirname, '../../../apps/paycode-proxy'),
//   adapterModulePath: path.resolve(__dirname, '../src/utils.ts'),
//   apigwClientModuleName: '@paycode-customer-v2/apigw-client',
// });
