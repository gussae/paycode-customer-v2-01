import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Demo } from '@paycode-customer-v2/ui-components';
import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import {
  fetchBalance,
  fetchProfile,
  fetchTransactions,
  handleUserSignIn,
  postPayment,
  sendNotification,
  subscribeToNotifications,
  updateProfile,
} from './utils'; // Import the utility functions

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [username, setUsername] = useState('');

  // This function handles the onboarding process

  useEffect(() => {
    handleUserSignIn()
      .then(() => getCurrentUser())
      .then(user => {
        setUsername(user.username);
      })
      .catch(error => {
        console.error('Error during initialization:', error);
      })
      .finally(() => {
        setInitializing(false);
      });
  }, []);

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <Authenticator signUpAttributes={['email']}>
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
