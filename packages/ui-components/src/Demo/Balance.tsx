// BalanceComponent.tsx
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import styles from './Demo.module.css';

export interface Balance {
  username: string;
  amount: number;
}

export interface BalanceComponentProps {
  username: string;
  fetchBalance: (username: string) => Promise<Balance>;
}

export const BalanceComponent: React.FC<BalanceComponentProps> = ({
  username,
  fetchBalance,
}) => {
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    const loadBalance = async () => {
      try {
        console.log(666, username);
        const balanceAmount = await fetchBalance(username);
        console.log(9999, `Fetched balance: ${balanceAmount}`);
        setBalance(balanceAmount.toString());
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };

    loadBalance();
  }, [username, fetchBalance]);

  return (
    <Box className={styles.balanceContainer}>
      <Text className={styles.boxTextSize}>Your Balance</Text>
      <div>Current Balance: {balance}</div>
    </Box>
  );
};

