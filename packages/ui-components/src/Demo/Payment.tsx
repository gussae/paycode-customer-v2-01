import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import styles from './Demo.module.css';

export interface PaymentComponentProps {
  username: string;
  postPayment: (params: { username: string; amount: number }) => Promise<void>;
}

export const PaymentComponent: React.FC<PaymentComponentProps> = ({
  username,
  postPayment,
}) => {
  const [amount, setAmount] = useState<number>(0);

  const handlePostPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postPayment({ username, amount });
      console.log(2722, 'Payment successful');
      setAmount(0); // Reset after posting
    } catch (err) {
      console.error('Error posting payment:', err);
    }
  };

  return (
    <Box className={styles.paymentContainer}>
      <Text className={styles.boxTextSize}>Make a Payment</Text>
      <form onSubmit={handlePostPayment}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label htmlFor="amount">Amount: </label>
          <Input
            id="amount"
            name="amount"
            type="number" // Assuming amount input should be of type number for better UX
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
          <Button mt={4} type="submit">
            Submit Payment
          </Button>
        </div>
      </form>
    </Box>
  );
};
