import { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { createProfile, createUser } from './graphql/mutations';
import { getUser } from './graphql/queries';
import Demo from './components/Demo';

const App = () => {
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    handleUserSignIn().finally(() => setInitializing(false));
  }, []);

  //the idea is to sort of onboard the user : create a user + profile  at the app layer the first time they sign in and set their username in the app the same as the username in the auth layer(cognito). Now, this is not mandatory but mapping the cognito username to the app username allows you to bypass mapping the cognito username to the app username every time the user signs in and that is wasteful. If you don't like the name 'username' and instead want to use 'userId' or 'email' etc, there is a way to customize this but would require you to change the cognito sub and some other stuff (I strongly suggest you do this for smooth sail unless you really allergic to the name username)
  const handleUserSignIn = async () => {
    try {
      const { username, } = await getCurrentUser();
      console.log('token', )
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

  if (initializing) {
    return <div>Loading...</div>; // Display loading state while initializing
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Demo />
          <button
            onClick={signOut}
            style={{ padding: '10px', marginTop: '20px' }}
          >
            Sign Out
          </button>
        </div>
      )}
    </Authenticator>
  );
};

export default App;
