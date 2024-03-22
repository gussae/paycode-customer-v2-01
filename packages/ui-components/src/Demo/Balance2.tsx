import React, { useEffect, useState } from 'react';
import './Balance2.module.css';
import { Card, Heading, Loader } from '@aws-amplify/ui-react';

export interface Balance2 {
  balance?: number;
}

export interface GetBalance2Params {
  username: string;
}

export interface Balance2Props {
  username: string; // Directly use username passed as a prop
  fetchBalance: (params: GetBalance2Params) => Promise<Balance2>;
}

export const Balance2Component: React.FC<Balance2Props> = ({
  username,
  fetchBalance,
}) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string>('987654321');

  useEffect(() => {
    const loadBalance = async () => {
      if (username) {
        try {
          const res = await fetchBalance({username});
          console.log(3443, res);
        if(res.balance)setBalance(res.balance.toString());
        } catch (error) {
          console.error('Error fetching balance:', error);
          setBalance('Error');
        }
      }
    };
    loadBalance();
  }, [username, fetchBalance]);

  return (
    <div className="root-view main-view home">
      <Card variation="elevated">
        <Heading level={4}>Account Summary</Heading>
        <div className="accounts">
          <div className="labels">
            <div>Account Number</div>
            <div>Account Name</div>
            <div>Currency</div>
            <div>Current Balance</div>
          </div>
          <div className="account">
            <div>
              <a href="#">{accountId}</a>
            </div>
            <div>{username}</div>
            <div>CAD</div>
            <div>{balance ? balance : <Loader />}</div>
          </div>
          <div className="totals">
            <div className="label">Totals</div>
            <div className="figure">{balance ? balance : <Loader />}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
