//* Need to build the client before you can use it. Hence the client, while a build output, shouldn't be ignored as modules depend on it. During the build, the latest client is generated and overwrite the previous one. All the client and this module is the only one exported from the package/browser

export * from './client';
import {
  GetBalance200,
  GetBalanceParams,
  GetTransactions200Item,
  GetTransactionsParams,
  PostPayment202,
  PostPaymentBody,
  //@ts-ignore
  getApiAdapter, //* might not exist till the first prebuild
} from './client';

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

export async function makePayment(
  body: PostPaymentBody,
): Promise<PostPayment202> {
  console.log(6612, body.username);
  const proxyApi = await getApiAdapter();
  const result = await proxyApi.postPayment(body);
  console.log(6645, 'Payment successful', result.data);
  return result.data;
}

export async function fetchTransactions(
  params: GetTransactionsParams,
): Promise<GetTransactions200Item> {
  console.log(6613, params.username);
  const proxyApi = await getApiAdapter();
  const result = await proxyApi.getTransactions(params);
  console.log(6646, 'Transactions fetched successfully', result.data);
  return result.data;
}
