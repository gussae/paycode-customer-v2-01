/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import styles from './Demo.module.css';
import { GenericNotification, NotificationsComponent } from './Notification';
import { Profile, ProfileComponent } from './Profile';
// import { TransferComponent } from './Transfer';
import { Balance, BalanceComponent, GetBalanceParams } from './Balance';
import { Balance2Component } from './Balance2';
import {
  PaymentComponent,
  MakePaymentParams,
  MakePaymentReceipt,
} from './Payment';
import {
  GetTransactionsParams,
  TransactionResponse,
  TransactionComponent,
} from './Transaction';
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
  updateProfile: (profile: {
    bio: string;
    username: string;
  }) => Promise<Profile>;
  fetchTransactions: (
    params: GetTransactionsParams,
  ) => Promise<TransactionResponse>;
  makePayment: (params: MakePaymentParams) => Promise<MakePaymentReceipt>;
  fetchBalance: (params: GetBalanceParams) => Promise<Balance>;
}
export const Demo: React.FC<DemoProps> = ({
  username,
  subscribeToNotifications,
  sendNotification,
  fetchProfile,
  updateProfile,
  fetchTransactions,
  makePayment,
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
      <h3>APIGW BE - Paycode Proxy</h3>
      <BalanceComponent username={username} fetchBalance={fetchBalance} />
      <Balance2Component username={username} fetchBalance={fetchBalance} />
      <PaymentComponent username={username} makePayment={makePayment} />
      <TransactionComponent
        username={username}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};
