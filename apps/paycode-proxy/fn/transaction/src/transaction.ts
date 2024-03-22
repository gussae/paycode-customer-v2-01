/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RunApiOps } from '@paycode-customer-v2/lib';
import axios, { AxiosResponse } from 'axios';
//TODO!use API exported from @paycode-customer-v2/utils to set the types but that require dynamic import as you are in CJS module and importing an es6 module
export interface TransactionResponse {
  id: string;
  date: string;
  amount: string;
  status: string;
}

export interface TransactionsResponses {
  transactions: TransactionResponse[];
}

// Mock data for transactions
const mockTransactions: TransactionsResponses = {
  transactions: [
    { id: '1', date: '2024-02-01', amount: '100.00', status: 'Completed' },
    { id: '2', date: '2024-02-02', amount: '200.00', status: 'Pending' },
    { id: '3', date: '2024-02-03', amount: '300.00', status: 'Pending' },
  ],
};

export const handleTransactionsRequests = async (
  props: RunApiOps,
): Promise<TransactionResponse | TransactionsResponses> => {
  const {
    event: { queryStringParameters, path, httpMethod },

    apiUrl,
    apiKey,
  } = props;
  if (!queryStringParameters || !queryStringParameters.username) {
    throw new Error('Username is required');
  }
  const username = queryStringParameters.username;
  console.log(`Fetching transactions for username: ${username}`);

  //implement appropriate routing logic
  if (path === '/transactions' && httpMethod.toLowerCase() === 'get') {
    console.log(`Getting transactions for username: ${username}`);
    // Implement logic or return mock data here
    if (apiUrl.toLowerCase().endsWith('mock')) {
      return mockTransactions;
    }
  }

  // Check if the request is for a specific transaction by ID
  else if (path === '/transaction' && httpMethod.toLowerCase() === 'get') {
    console.log(`Getting transaction for ID: ${username}`); // Assuming username is used as an ID here for simplicity
    // Implement logic or return mock data here
    if (apiUrl.toLowerCase().endsWith('mock')) {
      return mockTransactions.transactions[0] as TransactionResponse;
    }
  }

  // Construct the URL for the real API call
  const url = `${apiUrl}${path}/${username}`;
  const config = {
    method: 'get',
    url: url,
    headers: { 'x-api-key': apiKey },
  };

  try {
    const response: AxiosResponse<TransactionResponse | TransactionsResponses> =
      await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data for ${username}: ${error}`);
  }
};
