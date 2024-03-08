/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import styles from './Demo.module.css';
import { NotificationsComponent, GenericNotification } from './Notification';
import { ProfileComponent, Profile } from './Profile';
import { TransferComponent } from './Transfer';
import { TransactionComponent, Transaction } from './Transaction';
import { PaymentComponent } from './Payment';
import { BalanceComponent, Balance } from './Balance';
import { Balance2Component } from './Balance2';
// import Document from './Document';
// import QRCode  from './QRCode';
// Types for the functions to be passed to Demo

export interface DemoProps extends DemoFunctions {
  username: string;
}

export interface DemoFunctions {
  // Corrected to match expected signature for subscription
  subscribeToNotifications: (
    username: string,
    callback: (notification: GenericNotification) => void,
  ) => () => void;
  // Corrected to match a more precise type for sending notifications
  sendNotification: (notification: {
    message: string;
    username: string;
    title: string;
    read: boolean;
  }) => Promise<void>;
  // Updated return types for fetching functions to be more specific
  fetchProfile: (username: string) => Promise<Profile>;
  updateProfile: (profile: { bio: string; username: string }) => Promise<Profile>;
  fetchTransactions: (username: string) => Promise<Transaction[]>;
  postPayment: (params: { username: string; amount: number }) => Promise<void>;
  fetchBalance: (username: string) => Promise<Balance>;
}
export const Demo: React.FC<DemoProps> = ({
  username,
  subscribeToNotifications,
  sendNotification,
  fetchProfile,
  updateProfile,
  fetchTransactions,
  postPayment,
  fetchBalance,
}) => {
  // No need to fetch username inside Demo, it's passed as a prop
  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.demoContainer}>
      <h2>Demo</h2>
      <h3>GraphQL BE</h3>
      <NotificationsComponent
        username={username}
        subscribeToNotifications={subscribeToNotifications}
        sendNotification={sendNotification}
      />
      <ProfileComponent
        username={username}
        fetchProfile={fetchProfile}
        updateProfile={updateProfile}
      />
      {/* TransferComponent can be similarly implemented */}
      <h3>APIGW BE - Paycode Proxy</h3>
      <BalanceComponent username={username} fetchBalance={fetchBalance} />
      <Balance2Component username={username} fetchBalance={fetchBalance} />
      <PaymentComponent username={username} postPayment={postPayment} />
      <TransactionComponent
        username={username}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};
