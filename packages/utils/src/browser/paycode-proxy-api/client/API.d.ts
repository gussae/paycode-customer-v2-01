import type { AxiosRequestConfig, AxiosResponse } from 'axios';
export type PostPayment202 = {
    /** Unique identifier for the payment. */
    id?: string;
    /** Status of the payment operation. */
    status?: string;
};
export type PostPaymentBody = {
    /** Amount to be paid. */
    amount?: string;
    /** The username initiating the payment. */
    username?: string;
};
export type GetTransactionById200 = {
    /** Transaction amount. */
    amount?: string;
    /** Date when the transaction occurred. */
    date?: string;
    /** Unique identifier for the transaction. */
    id?: string;
    /** Current status of the transaction. */
    status?: string;
};
export type GetTransactionByIdParams = {
    id: string;
    username: string;
};
export type GetTransactions200Item = {
    /** Transaction amount. */
    amount?: string;
    /** Date when the transaction occurred. */
    date?: string;
    /** Unique identifier for the transaction. */
    id?: string;
    /** Current status of the transaction. */
    status?: string;
};
export type GetTransactionsParams = {
    username: string;
};
export type GetBalance200 = {
    /** The current balance for the specified username. */
    balance?: number;
};
export type GetBalanceParams = {
    username: string;
};
/**
* @summary Get balance for a user
*/
export declare const getBalance: <TData = AxiosResponse<GetBalance200, any>>(params: GetBalanceParams, options?: AxiosRequestConfig) => Promise<TData>;
/**
 * @summary Get transactions for a user
 */
export declare const getTransactions: <TData = AxiosResponse<GetTransactions200Item[], any>>(params: GetTransactionsParams, options?: AxiosRequestConfig) => Promise<TData>;
/**
 * @summary Get transaction by ID and username
 */
export declare const getTransactionById: <TData = AxiosResponse<GetTransactionById200, any>>(params: GetTransactionByIdParams, options?: AxiosRequestConfig) => Promise<TData>;
/**
 * @summary Post a payment
 */
export declare const postPayment: <TData = AxiosResponse<PostPayment202, any>>(postPaymentBody: PostPaymentBody, options?: AxiosRequestConfig) => Promise<TData>;
export type GetBalanceResult = AxiosResponse<GetBalance200>;
export type GetTransactionsResult = AxiosResponse<GetTransactions200Item[]>;
export type GetTransactionByIdResult = AxiosResponse<GetTransactionById200>;
export type PostPaymentResult = AxiosResponse<PostPayment202>;
export declare const getAxiosInstance: () => import("axios").AxiosStatic;
//# sourceMappingURL=API.d.ts.map