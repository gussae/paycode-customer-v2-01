import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchBalance } from '@paycode-customer-v2/utils/dist/browser';

import './home.css';

import { Card, Heading, Loader } from '@aws-amplify/ui-react';

function Home() {
  const [balance, setBalance] = useState(null);
  const [accountId, setAccountId] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    const init = async () => {
      await getUsername();
      setAccountId('987654321');
    };
    init();
  }, []);

  useEffect(() => {
    if (username) {
      loadBalance();
    }
  }, [username]); //Watch changes to username

  async function getUsername() {
    try {
      const user = await getCurrentUser();
      setUsername(user.username);
    } catch (error) {
      console.error("Error fetching user's username:", error);
    }
  }

  async function loadBalance() {
    try {
      const result = await fetchBalance({ username });
      if (result) {
        const balanceResponse = result.balance;
        console.log(999, { balanceResponse });
        const formattedBalance = `$${balanceResponse.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        setBalance(formattedBalance);
      } else {
        console.error('No balance data received');
        setBalance('Error');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('Error');
    }
  }

  return (
    <div className="root-view main-view home">
      <Card variation="elevated">
        <Heading level={4}>Account Summary</Heading>
        <div className="accounts">
          <div className="labels">
            <div>Account Number</div>
            <div>Account Name</div>
            <div>Currency</div>
            <div>Current Balance</div>
          </div>

          <div className="account">
            <div>
              <a>{accountId}</a>
            </div>
            <div>{username}</div>
            <div>CAD</div>
            <div>{balance ? balance : <Loader />}</div>
          </div>

          <div className="totals">
            <div className="label">Totals</div>
            <div className="figure">{balance ? balance : <Loader />}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Home;
