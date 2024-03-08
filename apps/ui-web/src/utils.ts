/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import {
  getUser,
  createProfile,
  createUser,
  updateProfile as _updateProfile,
  createNotification,
  getProfile,
  onCreateNotification,
} from '@paycode-customer-v2/graphql';
import * as apiGw from '@paycode-customer-v2/apigw';
import { generateClient } from 'aws-amplify/api';
//! using types from the ui-components (named identical with the types from the apigw b/c the demo actually )
import {
  Profile,
  GenericNotification,
} from '@paycode-customer-v2/ui-components';
import {
  aws_user_pools_id,
  aws_user_pools_web_client_id,
} from './amplify-be.config.json';

const IS_MOCK = import.meta.env.VITE_PAYCODE_PROXY_IS_MOCK === 'true';
const API_URL = import.meta.env.VITE_PAYCODE_PROXY_API_URL;
console.log({ apiGw });

//onboarding
export const handleUserSignIn = async () => {
  try {
    const { username } = await getCurrentUser();
    const { email } = await fetchUserAttributes();
    const client = generateClient();

    // First attempt to fetch the user
    const userData = await client.graphql({
      query: getUser,
      variables: { username },
    });

    if (!userData.data.getUser) {
      try {
        // Create the user, assuming it might be their first sign-up
        await client.graphql({
          query: createUser,
          variables: {
            input: { username, email: email as string },
          },
        });
        console.log('User created successfully');
        //create profile holder (user must update)
        await client.graphql({
          query: createProfile,
          variables: {
            input: {
              username: username,
              bio: 'Your bio is not completed',
            },
          },
        });
      } catch (error) {
        // Check if error is due to the user already existing
        if (
          (error as Error).message.includes('ConditionalCheckFailedException')
        ) {
          console.log(
            'User already exists, likely due to eventual consistency. No further action needed.',
          );
        } else {
          // If the error is not a ConditionalCheckFailedException, rethrow it
          throw error;
        }
      }
    } else {
      console.log('User already exists');
    }
  } catch (error) {
    console.error('Error during user sign-in or creation:', error);
  }
};
//api adapter
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
  console.log(2331, 'Fetched profile:', data.getProfile);
  if (data && data.getProfile) {
    const profile = data.getProfile;
    console.log(2331, 'Fetched profile:', profile);
    return profile as Profile;
  } else {
    return { bio: '', username: '' };
  }
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
  console.log(2332, 'Profile updated:', data);
  if (data && data.updateProfile) return data.updateProfile as Profile;
  else return { bio: '', username: '' };
}

export const subscribeToNotifications = (
  username: string,
  callback: (notification: GenericNotification) => void,
): (() => void) => {
  const client = generateClient();

  const subscription = client
    .graphql({
      query: onCreateNotification,
      variables: { username },
    })
    .subscribe({
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
  let balance;
  if (!result || !result.data) balance = 'Error';
  else balance = result.data.balance;
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
  return; //no PostPaymentResult type defined
}

export async function fetchTransactions(username: string) {
  const proxyApi = await getProxyApiAdapter();
  const result = await proxyApi.getTransactions({ username });
  if (result && result.data && result.data.transactions)
    return result.data.transactions;
  else [];
  console.log(2744, 'Transactions fetched successfully', result);
}
