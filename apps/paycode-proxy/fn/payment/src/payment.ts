/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosResponse } from 'axios';
import { RunApiOps } from '@paycode-customer-v2/lib/dist/cjs';

//TODO!use API exported from @paycode-customer-v2/utils to set the types but that require dynamic import as you are in CJS module and importing an es6 module
export interface PostPaymentResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  message?: string; //only present for testing
}

export interface PostPaymentParams {
  username: string;
  amount: string; //! API schema mistake! Should have been number
}

export async function postPayment(
  props: RunApiOps,
): Promise<PostPaymentResponse> {
  const {
    event: { body },
    apiUrl,
    apiKey,
  } = props;
  if (!body || typeof body !== 'string') {
    throw new Error('Invalid request body');
  }
  const { username, amount } = JSON.parse(body) as unknown as {
    username: string;
    amount: string;
  };
  if (!username || !amount) {
    throw new Error('Username and amount are required');
  }
  console.log(`Posting payment for username: ${username}`);

  // Check if apiUrl is meant for a mock response
  if (apiUrl.toLowerCase().endsWith('mock')) {
    return {
      id: 'mockId',
      status: 'pending',
      message: `The PostPayment for the order amounting to ${amount} for ${username} is pending.`,
    };
  }

  //request config
  const url = `${apiUrl}/payment`;
  //!TODO a real ID generator or use the paycode ID generator (In which case, remove ID and modify the response object)
  const id = Math.random().toString(36).substring(7);
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
