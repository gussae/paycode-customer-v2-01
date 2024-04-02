/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Balance, BalanceComponent, GetBalanceParams } from './Balance';
import styles from './Demo.module.css';
import { GenericNotification, NotificationsComponent } from './Notification';
import { Profile, ProfileComponent } from './Profile';
// import { Balance2Component } from './Balance2';
import DocumentComponent, {
  DeleteDocumentParams,
  DownloadDocumentParams,
  UploadDocumentParams,
} from './Document';
import {
  MakePaymentParams,
  MakePaymentReceipt,
  PaymentComponent,
} from './Payment';
import { QrcodeComponent, GenerateQrcodeResponse } from './Qrcode';
import {
  GetTransactionsParams,
  TransactionComponent,
  TransactionResponse,
} from './Transaction';
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

  getDocumentIndex: (params: {
    username: string;
    key: string;
  }) => Promise<any[]>; //not implemented
  listDocuments: ({ username }: { username: string }) => Promise<any[]>;
  uploadDocument: (params: UploadDocumentParams) => Promise<boolean>;
  downloadDocument: (params: DownloadDocumentParams) => Promise<string | null>;
  deleteDocument: (params: DeleteDocumentParams) => Promise<boolean>;
  generateQrcode: (params: {
    username: string;
  }) => Promise<GenerateQrcodeResponse>;
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
  getDocumentIndex,
  listDocuments,
  uploadDocument,
  downloadDocument,
  deleteDocument,
  generateQrcode,
}) => {
  // No need to fetch username inside Demo, it's passed as a prop
  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.demoContainer}>
      <h2>Demo</h2>
      <h3>GraphQL BE - Paycode GQL</h3>
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
      <DocumentComponent
        username={username}
        listDocuments={listDocuments}
        uploadDocument={uploadDocument}
        downloadDocument={downloadDocument}
        getDocumentIndex={getDocumentIndex}
        deleteDocument={deleteDocument}
      />
      <h3>APIGW BE - Paycode Proxy</h3>
      <BalanceComponent username={username} fetchBalance={fetchBalance} />
      {/* <Balance2Component username={username} fetchBalance={fetchBalance} /> */}
      <PaymentComponent username={username} makePayment={makePayment} />
      <TransactionComponent
        username={username}
        fetchTransactions={fetchTransactions}
      />
      <QrcodeComponent username={username} generateQrcode={generateQrcode} />
    </div>
  );
};
