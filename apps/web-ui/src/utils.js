import { getCognitoAuthHeader, paycodeProxyApiAdapter } from '@paycode-customer-v2/apigw';
import {
  aws_user_pools_id,
  aws_user_pools_web_client_id,
} from './amplify-be.config.json';
console.log({
  aws_user_pools_id,
  aws_user_pools_web_client_id,
});
const IS_MOCK = import.meta.env.VITE_PAYCODE_PROXY_IS_MOCK === 'true';
const API_URL = import.meta.env.VITE_PAYCODE_PROXY_API_URL;

export async function getProxyApiAdapter() {
  const headerToInject = await getCognitoAuthHeader(
    aws_user_pools_id,
    aws_user_pools_web_client_id,
  );
  const proxyApi = paycodeProxyApiAdapter.createApiAdapter(
    API_URL,
    headerToInject,
    IS_MOCK,
  );
  const testBalance = await proxyApi.getBalance({ username: 'test' });
  console.debug({
    tag: 28343,
    headerToInject: headerToInject,
    API_URL: API_URL,
    IS_MOCK: IS_MOCK,
    balance: testBalance,
    proxyApi,
  });
  return proxyApi;
}
