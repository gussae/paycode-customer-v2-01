/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  updateProfile as _updateProfile,
  createNotification,
  getProfile,
  onCreateNotification,
} from '@paycode-customer-v2/graphql/dist/cjs';
import { generateClient } from 'aws-amplify/api';
//! using types from the ui-components (named identical with the types from the apigw b/c the demo actually )
import {
  GenericNotification,
  Profile,
} from '@paycode-customer-v2/ui-components';

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
