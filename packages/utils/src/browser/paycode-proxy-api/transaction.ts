//* Need to build the client before you can use it. Hence the client, while a build output, shouldn't be ignored as modules depend on it. During the build, the latest client is generated and overwrite the previous one. All the client and this module is the only one exported from the package/browser

export * from './client';
import {
    GetTransactions200Item,
    GetTransactionsParams,
    //@ts-ignore
    getApiAdapter
} from './client';



export async function fetchTransactions(
  params: GetTransactionsParams,
): Promise<GetTransactions200Item> {
  console.log(6613, params.username);
  const proxyApi = await getApiAdapter();
  const result = await proxyApi.getTransactions(params);
  console.log(6646, 'Transactions fetched successfully', result.data);
  return result.data;
}

