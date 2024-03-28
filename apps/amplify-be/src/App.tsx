/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {
  Demo,
  DownloadDocumentParams,
  UploadDocumentParams,
} from '@paycode-customer-v2/ui-components';
import {
  downloadDocument,
  fetchBalance,
  fetchDocumentIndex,
  fetchProfile,
  fetchTransactions,
  handleUserSignIn,
  listDocuments,
  makePayment,
  sendNotification,
  subscribeToNotifications,
  updateProfile,
  uploadDocument,
  deleteDocument,
} from '@paycode-customer-v2/utils/dist/browser'; // Import the utility functions
import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [username, setUsername] = useState('');

  //handles onboarding
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
            makePayment={makePayment}
            fetchBalance={fetchBalance}
            downloadDocument={
              downloadDocument as (
                params: DownloadDocumentParams,
              ) => Promise<string | null>
            }
            uploadDocument={
              uploadDocument as (
                params: UploadDocumentParams,
              ) => Promise<boolean>
            }
            getDocumentIndex={
              fetchDocumentIndex as (params: {
                username: string;
                key: string;
              }) => Promise<any>
            }
            listDocuments={listDocuments}
            deleteDocument={deleteDocument}
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
