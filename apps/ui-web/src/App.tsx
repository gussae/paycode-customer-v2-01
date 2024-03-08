import { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Demo } from '@paycode-customer-v2/ui-components';
import { getCurrentUser } from 'aws-amplify/auth';
import {
  subscribeToNotifications,
  sendNotification,
  fetchProfile,
  updateProfile,
  fetchTransactions,
  postPayment,
  fetchBalance,
} from './utils'; // Import the utility functions




const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Asynchronously sign in the user and set the username
    const signInUser = async () => {
      try {
        const user = await getCurrentUser(); // Assume this is available and correctly implemented
        setUsername(user.username);
        setInitializing(false);
      } catch (error) {
        console.error('Error during user sign-in or creation:', error);
        setInitializing(false);
      }
    };

    signInUser();
  }, []);

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <Authenticator signUpAttributes={["email"]}>
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
          <Demo
            username={username}
            subscribeToNotifications={subscribeToNotifications}
            sendNotification={sendNotification}
            fetchProfile={fetchProfile}
            updateProfile={updateProfile}
            fetchTransactions={fetchTransactions}
            postPayment={postPayment}
            fetchBalance={fetchBalance}
          />
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
