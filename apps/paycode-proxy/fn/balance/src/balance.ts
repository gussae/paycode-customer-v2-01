/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosResponse } from 'axios';
import { RunApiOps } from '@paycode-customer-v2/lib/dist/cjs';
//TODO!use API exported from @paycode-customer-v2/utils to set the types but that entails importing browser module in a nodejs requiring some polyfills
export interface BalanceResponse {
  balance: number;
}

export async function getBalance(props: RunApiOps): Promise<BalanceResponse> {
  const { event, apiUrl, apiKey } = props;

  // Extracting username from the event object, assuming it's passed in the query string parameters
  const username = event.queryStringParameters?.username;

  if (!username) {
    throw new Error('Username is required');
  }

  console.log(`Fetching balance for username: ${username}`);

  // Check if apiUrl is meant for a mock response
  if (apiUrl.toLowerCase().endsWith('mock')) {
    return {
      balance: parseInt(Math.random().toString().split('.').pop()!, 10),
    };
  }

  const url = `${apiUrl}/balance/username=${username}`;
  const config = {
    method: 'get',
    url: url,
    headers: {
      'x-api-key': apiKey,
    },
  };

  try {
    const response: AxiosResponse<BalanceResponse> = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch balance for ${username}: ${error}`);
  }
}
