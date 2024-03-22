import {
    createProfile,
    createUser,
    getUser
} from '@paycode-customer-v2/graphql/dist/cjs';
import { generateClient } from 'aws-amplify/api';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
  //! using types from the ui-components (named identical with the types from the apigw b/c the demo actually )
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
