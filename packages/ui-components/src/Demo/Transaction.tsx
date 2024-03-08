// TransactionComponent.tsx
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import styles from './Demo.module.css';

export interface TransactionComponentProps {
  username: string;
  fetchTransactions: (username: string) => Promise<
    Array<{
      id: string;
      date: string;
      amount: string;
      status: string;
    }>
  >;
}

export interface Transaction {
  id: string;
  date: string;
  amount: string;
  status: string;
}
export const TransactionComponent: React.FC<TransactionComponentProps> = ({
  username,
  fetchTransactions,
}) => {
  const [transactions, setTransactions] = useState<
    Array<{
      id: string;
      date: string;
      amount: string;
      status: string;
    }>
  >([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const result = await fetchTransactions(username);
        console.log('Transactions fetched successfully', result);
        setTransactions(result);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    loadTransactions();
  }, [username, fetchTransactions]);

  return (
    <Box className={styles.transactionContainer}>
      <Text className={styles.boxTextSize}>Your Transactions</Text>
      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

