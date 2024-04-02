import { PostQrcode202, PostQrcodeBody, getApiAdapter } from './client';

// API Gateway integration
export async function generateQrcode(
  params: PostQrcodeBody,
): Promise<PostQrcode202> {
  console.log(6614, params.username);
  const proxyApi = await getApiAdapter();
  const result = await proxyApi.postQrcode(params);
  console.log(6654, 'Generated Qrcode', result.data);
  return result.data;
}
