//* Need to build the client before you can use it. Hence the client, while a build output, shouldn't be ignored as modules depend on it. During the build, the latest client is generated and overwrite the previous one. All the client and this module is the only one exported from the package/browser

export * from './client';
import {
    PostPayment202,
    PostPaymentBody,
    //@ts-ignore
    getApiAdapter
} from './client';

export async function makePayment(
  body: PostPaymentBody,
): Promise<PostPayment202> {
  console.log(6612, body.username);
  const proxyApi = await getApiAdapter();
  const result = await proxyApi.postPayment(body);
  console.log(6645, 'Payment successful', result.data);
  return result.data;
}



