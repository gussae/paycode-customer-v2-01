/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createNotification,
  onCreateNotification,
} from '@paycode-customer-v2/graphql/dist/cjs';
import { generateClient } from 'aws-amplify/api';
//! using types from the ui-components (named identical with the types from the apigw b/c the demo actually )
import { GenericNotification } from '@paycode-customer-v2/ui-components';

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
