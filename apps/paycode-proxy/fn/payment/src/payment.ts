/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosResponse } from 'axios';
import { RunApiOps } from '@paycode-customer-v2/lib';

export interface PostPaymentResponse {
  id: string;
  username: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
}

export async function postPayment(
  props: RunApiOps,
): Promise<PostPaymentResponse> {
  const { event, apiUrl, apiKey } = props;
  //@ts-ignore
  const { id, username, amount } = event.body;
  console.log(`Posting payment for username: ${username}`);

  // Check if apiUrl is meant for a mock response
  if (apiUrl.toLowerCase().endsWith('mock')) {
    return {
      id: 'mockId',
      username,
      amount,
      status: 'pending',
    };
  }

  //request config
  const url = `${apiUrl}/payment`;
  const config = {
    method: 'post',
    url: url,
    headers: { 'x-api-key': apiKey },
    data: {
      id,
      username,
      amount,
    },
  };

  try {
    const response: AxiosResponse<PostPaymentResponse> = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to post payment for ${username}: ${error}`);
  }
}
