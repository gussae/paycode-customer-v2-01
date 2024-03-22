import path from 'path';
import { buildCognitoAuthApiAdapter } from '../../api-adapter';
import { getPaycodeApiConfig } from './get-paycode-proxy-api-config';
const {
  awsUserPoolsId,
  awsUserPoolsWebClientId,
  bundledOpenapiPath,
  paycodeProxyApiUrl,
  paycodeProxyWorkspaceRoot,
} = getPaycodeApiConfig();

buildCognitoAuthApiAdapter({
  apiUrl: paycodeProxyApiUrl,
  awsUserPoolsId,
  awsUserPoolsWebClientId,
  bundledOpenapiPath,
  outdir: path.join(__dirname, '../../../browser/paycode-proxy-api/'),
  workspaceRoot: paycodeProxyWorkspaceRoot,
}).catch(console.error);
