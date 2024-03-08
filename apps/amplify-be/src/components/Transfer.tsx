import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listTransfers } from '../graphql/queries';
import { createTransfer } from '../graphql/mutations';
import { Transfer as TransferType, TransferStatus } from '../graphql/API'; // Importing the Transfer type
import { Button, Input, Box, Text } from '@chakra-ui/react';
import styles from '../css/Demo.module.css';

interface TransferProps {
  username: string;
}
const TransferComponent: React.FC<TransferProps> = ({ username }) => {
  const [transfers, setTransfers] = useState<TransferType[]>([]);
  const [newTransfer, setNewTransfer] = useState({ to: '', amount: '' });
  const client = generateClient();

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const { data } = await client.graphql({ query: listTransfers });
      if (data.listTransfers) {
        setTransfers(data.listTransfers.items);
      }
    } catch (error) {
      console.error('Error fetching transfers:', error);
    }
  };

  const handleCreateTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await client.graphql({
        query: createTransfer,
        variables: {
          input: {
            to: newTransfer.to,
            amount: parseFloat(newTransfer.amount),
            from: username,
            status: TransferStatus.PENDING,
          },
        },
      });
      setNewTransfer({ to: '', amount: '' }); // Reset form
      fetchTransfers(); // Refresh the list after adding
    } catch (error) {
      console.error('Error creating a transfer:', error);
    }
  };

  return (
    <div className={styles.transferContainer}>
      <Box >
        <Text className={styles.boxTextSize}>Transfer Money</Text>
        {transfers.map(transfer => (
          <Box key={transfer.id}>
            <Text>{`Transfer to ${transfer.to}: ${transfer.amount} - ${transfer.status}`}</Text>
          </Box>
        ))}

        <Box as="form" onSubmit={handleCreateTransfer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Input
              placeholder="To"
              value={newTransfer.to}
              onChange={e =>
                setNewTransfer({ ...newTransfer, to: e.target.value })
              }
            />
            <Input
              placeholder="Amount"
              type="number"
              value={newTransfer.amount}
              onChange={e =>
                setNewTransfer({ ...newTransfer, amount: e.target.value })
              }
            />
            <Button mt={4} type="submit">
              Create Transfer
            </Button>
          </div>
        </Box>
        <div className={styles.transferContainer}>
          <table>
            <thead>
              <tr>
                <th>To</th>
                <th>Amount</th>
                <th>Status</th>
                <th>From</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer, index) => (
                <tr key={index}>
                  <td>{transfer.to}</td>
                  <td>{transfer.amount}</td>
                  <td>{transfer.status}</td>
                  <td>{transfer.from}</td>
                  <td>{new Date(transfer.createdAt).toLocaleString()}</td>
                  <td>{new Date(transfer.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </div>
  );
};

export default TransferComponent;
