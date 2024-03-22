// BalanceComponent.tsx
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import styles from './Demo.module.css';

export interface Balance {
  balance?: number;
}

export interface GetBalanceParams {
  username: string;
}

export interface BalanceComponentProps {
  username: string;
  fetchBalance: (params: GetBalanceParams) => Promise<Balance>;
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
        const res = await fetchBalance({ username });
        console.log(9999, `Fetched balance: ${res}`);
        if(res.balance)setBalance(res.balance.toString());
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
