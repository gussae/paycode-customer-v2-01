import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import styles from './Demo.module.css';

export interface MakePaymentReceipt {
  id?: string;
  status?: string;
}

export interface MakePaymentParams {
  username: string;
  amount: string;
}

export interface PaymentComponentProps {
  username: string;
  makePayment: (params: MakePaymentParams) => Promise<MakePaymentReceipt>;
}

export const PaymentComponent: React.FC<PaymentComponentProps> = ({
  username,
  makePayment,
}) => {
  const [amount, setAmount] = useState<string>('');

  const handleMakePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await makePayment({ username, amount });
      if (res) alert(`Payment successful: ${JSON.stringify(res)}`);
      console.log(2722, 'Payment successful');
      setAmount(''); // Reset after payment goes through
    } catch (err) {
      console.error('Error making payment:', err);
    }
  };

  return (
    <Box className={styles.paymentContainer}>
      <Text className={styles.boxTextSize}>Make a Payment</Text>
      <form onSubmit={handleMakePayment}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label htmlFor="amount">Amount: </label>
          <Input
            id="amount"
            name="amount"
            type="number" // Assuming amount input should be of type number for better UX
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <Button mt={4} type="submit">
            Submit Payment
          </Button>
        </div>
      </form>
    </Box>
  );
};
