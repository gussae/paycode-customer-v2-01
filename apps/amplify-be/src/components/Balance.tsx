import { useState, useEffect } from 'react';
import { getProxyApiAdapter } from '../utils';
import { Box, Text } from '@chakra-ui/react';
import styles from '../css/Demo.module.css';

interface BalanceComponentProps {
  username: string;
}

const BalanceComponent: React.FC<BalanceComponentProps> = ({ username }) => {
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        console.log(666, username);
        const proxyApi = await getProxyApiAdapter();
        console.log(777, proxyApi);
        const result = await proxyApi.getBalance({ username });
        console.log(4444, { result });
        const balance = result.data.balance;
        console.debug('9999: Fetched balanced:', balance);
        setBalance(balance);
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };

    fetchBalance();
  }, [username]);

  return (
    <Box className={styles.balanceContainer}>
      <Text className={styles.boxTextSize}>Your Balance</Text>
      <div>Current Balance: {balance}</div>
    </Box>
  );
};

export default BalanceComponent;
