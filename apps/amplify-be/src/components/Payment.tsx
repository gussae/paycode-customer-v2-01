// Payment.tsx
import { useState } from 'react';
import { getProxyApiAdapter } from '../utils';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import styles from '../css/Demo.module.css';

interface PaymentComponentProps {
  username: string;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ username }) => {
  const [amount, setAmount] = useState('');

  const handlePostPayment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const proxyApi = await getProxyApiAdapter();
      const result = await proxyApi.postPayment({ username, amount });
      console.log(2722, 'Payment successful', result);
      setAmount(''); // Reset after posting
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

export default PaymentComponent;
