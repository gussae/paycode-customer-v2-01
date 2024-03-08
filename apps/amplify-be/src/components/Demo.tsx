import { useState, useEffect } from 'react';
import styles from '../css/Demo.module.css';
import { getCurrentUser } from 'aws-amplify/auth';
import Notification from './Notification';
import Profile from './Profile';
import Transfer from './Transfer';
import Transaction from './Transaction';
import Payment from './Payment';
import Balance from './Balance';
// import Document from './Document';
// import QRCode  from './QRCode';

const Demo = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { username } = await getCurrentUser();
        setUsername(username);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchUser();
  }, []);

  // Check if username is not yet set and return loading state, error, or similar
  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.demoContainer}>
      <h2>Demo</h2>
      <h3> Graphql BE</h3>
      <Notification username={username} />
      <Profile username={username} />
      <Transfer username={username} />
      <h3> APIGW BE - Paycode Proxy</h3>
      <Balance username={username}/>
      <Payment username={username}/>
      <Transaction username={username}/>
      {/* <QRCode username={username}/> */}
      <h3> APIGW BE - Document API TBE</h3>
      {/* <Document username={username}/> */}
    </div>
  );
};

export default Demo;
