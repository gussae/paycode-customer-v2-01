// Ensure the structure matches the backend response as well as mimick the Axios response + simulate network delay
export function getBalance(username: string) {
  console.log(username);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          body: JSON.stringify({ balance: { balance: 1000 } }),
        },
      });
    }, 100);
  });
}

export function postPayment({
  username,
  amount,
}: {
  username: string;
  amount: string;
}) {
  console.log(
    'postPayment called with username: ',
    username,
    ' and amount: ',
    amount,
  );
  // Simulate an Axios response with stringified JSON
  return Promise.resolve({
    data: JSON.stringify({
      message: 'Payment successful',
      username: username,
      amount: amount,
    }),
  });
}

export const getQRCode = (username: string) => {
  console.log(username);
  // Return a structure that mimics an Axios response with stringified JSON
  return Promise.resolve({
    data: JSON.stringify({
      qrCode: { url: 'https://via.placeholder.com/150' },
    }),
  });
};

export const getTransactions = (username: string) => {
  console.log(username);
  // Return a structure that mimics an Axios response with stringified JSON
  return Promise.resolve({
    data: JSON.stringify({
      transactions: [
        { id: '1', date: '2024-02-01', amount: '100.00', status: 'Completed' },
        { id: '2', date: '2024-02-02', amount: '200.00', status: 'Pending' },
        // Add more transactions as needed
      ],
    }),
  });
};
