//* Need to build the client before you can use it. Hence the client, while a build output, shouldn't be ignored as modules depend on it. During the build, the latest client is generated and overwrite the previous one. All the client and this module is the only one exported from the package/browser

import { GetBalance200, GetBalanceParams, getApiAdapter } from './client';

//apigw
export async function fetchBalance(
  params: GetBalanceParams,
): Promise<GetBalance200> {
  console.log(6611, params.username);
  const proxyApi = await getApiAdapter();
  const result = await proxyApi.getBalance(params);
  console.log(6644, 'Fetched Balance', result.data);
  return result.data;
}
