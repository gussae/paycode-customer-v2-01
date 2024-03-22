/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * PayCodeProxy API
 * OpenAPI spec version: 1.0.0
 */
import axios from 'axios';
/**
* @summary Get balance for a user
*/
export const getBalance = (params, options) => {
    return axios.get(`/balance`, {
        ...options,
        params: { ...params, ...options?.params },
    });
};
/**
 * @summary Get transactions for a user
 */
export const getTransactions = (params, options) => {
    return axios.get(`/transactions`, {
        ...options,
        params: { ...params, ...options?.params },
    });
};
/**
 * @summary Get transaction by ID and username
 */
export const getTransactionById = (params, options) => {
    return axios.get(`/transaction`, {
        ...options,
        params: { ...params, ...options?.params },
    });
};
/**
 * @summary Post a payment
 */
export const postPayment = (postPaymentBody, options) => {
    return axios.post(`/payment`, postPaymentBody, options);
};
export const getAxiosInstance = () => axios;
