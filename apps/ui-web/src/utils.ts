/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  updateProfile as _updateProfile,
  createNotification,
  getProfile,
  onCreateNotification,
} from '@paycode-customer-v2/graphql';
import * as apiGw from '@paycode-customer-v2/apigw';
import { generateClient } from 'aws-amplify/api';
//! using types from the ui-components (named identical with the types from the apigw b/c the demo actually )
import { Profile, GenericNotification } from '@paycode-customer-v2/ui-components';
import {
  aws_user_pools_id,
  aws_user_pools_web_client_id,
} from './amplify-be.config.json';

const IS_MOCK = import.meta.env.VITE_PAYCODE_PROXY_IS_MOCK === 'true';
const API_URL = import.meta.env.VITE_PAYCODE_PROXY_API_URL;
console.log({ apiGw });

export async function getProxyApiAdapter() {
  const headerToInject = await apiGw.getCognitoAuthHeader(
    aws_user_pools_id,
    aws_user_pools_web_client_id,
  );
  const proxyApi = apiGw.paycodeProxyApiAdapter.createApiAdapter(
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

//graphql
export async function fetchProfile(username: string) {
  const client = generateClient();
  const { data } = await client.graphql({
    query: getProfile,
    variables: { username },
  });
  if (!data) throw new Error('Failed to fetch profile');
  const profile = data.getProfile;
  console.log(2331, 'Fetched profile:', profile);
  return profile as Profile;
}

export async function updateProfile(profile: {
  bio: string;
  username: string;
}) {
  const client = generateClient();
  const { data } = await client.graphql({
    query: _updateProfile,
    variables: { input: profile },
  });
  if (!data) throw new Error('Failed to update profile');
  return data.updateProfile as Profile;
}

export const subscribeToNotifications = (
  username: string,
  callback: (notification: GenericNotification) => void
): (() => void) => {
  const client = generateClient();

  const subscription = client.graphql({
    query: onCreateNotification,
    variables: { username },
  }).subscribe({
    next: ({ data }) => {
      if (data.onCreateNotification) {
        callback(data.onCreateNotification);
      }
    },
    error: error => console.error(error),
  });

  // Return a function to unsubscribe when needed
  return () => subscription.unsubscribe();
};

export async function sendNotification({
  message,
  username,
  title = 'New Notification',
  read = false,
}: {
  message: string;
  username: string;
  title?: string;
  read?: boolean;
}) {
  const client = generateClient();
  await client.graphql({
    query: createNotification,
    variables: {
      input: { message, username, title, read },
    },
  });
}

//apigw
export async function fetchBalance(username: string) {
  console.log(6661, username);
  const proxyApi = await getProxyApiAdapter();
  console.log(7771, proxyApi);
  const result = await proxyApi.getBalance({ username });
  console.log(2644, { result });
  if (!result || !result.data) throw new Error('No balance data received');
  const balance = result.data.balance;
  console.debug('9999: Fetched balanced:', balance);
  return balance;
}

export async function postPayment({
  username,
  amount,
}: {
  username: string;
  amount: number;
}) {
  const proxyApi = await getProxyApiAdapter();
  const result = await proxyApi.postPayment({ username, amount });
  console.log(2722, 'Payment successful', result);
  if (!result) throw new Error('Failed to post payment');
  return; //no PostPaymentResult type defined
}

export async function fetchTransactions(username: string) {
  const proxyApi = await getProxyApiAdapter();
  const result = await proxyApi.getTransactions({ username });
  if (!result || !result.data) throw new Error('Failed to fetch transactions');
  console.log(2744, 'Transactions fetched successfully', result);
  return result.data.transactions;
}
