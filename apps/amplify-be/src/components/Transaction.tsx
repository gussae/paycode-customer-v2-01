// Transaction.tsx
import { useEffect, useState } from 'react';
import { getProxyApiAdapter } from '../utils';
import { Box, Text } from '@chakra-ui/react';
import styles from '../css/Demo.module.css';

export interface TransactionComponentProps {
  username: string;
}

export interface TransactionResponse {
  id: string;
  date: string;
  amount: string;
  status: string;
}

export const TransactionComponent: React.FC<TransactionComponentProps> = ({
  username,
}) => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const proxyApi = await getProxyApiAdapter();
        const result = await proxyApi.getTransactions({ username });
        console.log('Transactions fetched successfully', result);
        setTransactions(result.data.transactions);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, [username]);

  return (
    <Box className={styles.transactionContainer}>
      <Text className={styles.boxTextSize}>Your Transactions
       </Text>
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

export default TransactionComponent;
