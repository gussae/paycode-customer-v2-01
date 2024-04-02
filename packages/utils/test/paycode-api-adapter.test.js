//! must be run from `npm run test` as it uses the right configurations. And note, we aren't unit testing and not mocking the API calls - it's more of an integration test

//! getBalance, getTransactions and posPayment are from API client generator (not using adapter, and they work b/c they are being intercepted by the adapter, which uses an interceptor and the axios instance is being configured. This shows that as long as we call the adapter first and configure it properly, creating fetchBalance, makePayment, fetchTransactions is not necessary. Note that these functions will fail if you comment out the use of the getApiAdapter as they won't get intercepted with authorization token as well as have access to an axios instance configured with the right apiUrl. Hence the use of the adapter is necessary it just can be made more efficient and the best place to do this is in the builder whereby we can iterate through each method and output a configured method automatically instead  of having to manually configure each method.
//! generateQrcode and genQrcode are added as an example feature. The above discussion holds for these methods as well.
//!TODO  Modify the builder to not just configure the apiAdapter and return the getApiAdapter, but to iterate through the methods on the apiAdapter and  configure them with right deployment configuration and token provider and  return the modified methods.

require('dotenv').config({ path: '../.env' });
const {
  getApiAdapter,
  getBalance,
  getTransactions,
  postPayment,
  fetchBalance,
  fetchTransactions,
  makePayment,
  postQrcode,
  generateQrcode
} = require('../dist/browser');

//note that we are using typescript directly from node/builders/paycode-proxy-api - not part of the dist - so we need to register ts-node
require('ts-node').register({});

const getTestToken =
  require('../src/node/builders/paycode-proxy-api/get-test-token').getTestToken;
const getPaycodeApiConfig =
  require('../src/node/builders/paycode-proxy-api/get-paycode-proxy-api-config').getPaycodeApiConfig;

const { paycodeProxyApiUrl: apiUrl } = getPaycodeApiConfig();

const Username = process.env.APP_USERNAME;
let jwtToken;
//intercept the getCurrentUserToken method (it requires logged browser session)
jest.mock(
  '../dist/browser/paycode-proxy-api/client/get-current-user-token',
  () => ({ getCurrentUserToken: jest.fn() }),
);
describe('API Adapter with Authenticated Session', () => {
  beforeAll(async () => {
    jwtToken = await getTestToken();
    const {
      getCurrentUserToken,
    } = require('../dist/browser/paycode-proxy-api/client/get-current-user-token');
    getCurrentUserToken.mockImplementation(() => Promise.resolve(jwtToken));
  });

  it(' getApiAdapter should make authenticated API calls and has methods allowing the fetching of  balance and transactions', async () => {
    const adapter = await getApiAdapter(apiUrl, jwtToken);

    let response = await adapter.getBalance({ username: Username });
    const balance = response.data.balance;
    console.log(4371, { balance });
    expect(typeof balance).toBe('number');

    response = await adapter.getTransactions({ username: Username });
    const transactions = response.data.transactions;
    console.log(4372, { transactions });
    expect(Array.isArray(transactions)).toBe(true);
  }, 10000);

  it('getBalance should make authenticated API calls and fetch balance', async () => {
    const getBalanceResponse = await getBalance({ username: Username });
    const balance = getBalanceResponse.data.balance;
    console.log(4373, { balance });
    expect(balance).toBeDefined();
    expect(typeof balance).toBe('number');
  }, 10000);

  it('postPayment should make authenticated API calls and post payment', async () => {
    const paymentResult = await postPayment({
      username: Username,
      amount: 100,
    });
    const postPaymentResponse = paymentResult.data;
    console.log(4374, { postPaymentResponse });

    expect(postPaymentResponse).toBeDefined();
    expect(postPaymentResponse.status).toBeDefined();
  }, 10000);

  it('getTransactions on apiAdapter should make authenticated API calls and fetch transactions', async () => {
    const transactionsResponse = await getTransactions({ username: Username });
    const transactions = transactionsResponse.data.transactions;
    console.log(4375, { transactions });
    expect(transactions).toBeDefined();
    expect(Array.isArray(transactions)).toBe(true);
  }, 10000);

  it('fetchBalance should make authenticated API calls and fetch balance', async () => {
    const getBalanceResponse = await fetchBalance({ username: Username });
    const balance = getBalanceResponse.balance;
    console.log(4376, { balance });
    expect(balance).toBeDefined();
    expect(typeof balance).toBe('number');
  }, 10000);

  it('makePayment should make authenticated API calls and post payment', async () => {
    const postPaymentResponse = await makePayment({
      username: Username,
      amount: 100,
    });
    console.log(4377, { postPaymentResponse })
    expect(postPaymentResponse).toBeDefined();
    // you could check status type but that is not concrete yet
    expect(postPaymentResponse.id).toBeDefined();
    expect(postPaymentResponse.status).toBeDefined();
  }, 10000);

  it('fetchTransactions should make authenticated API calls and fetch transactions', async () => {
    const transactionsResponse = await fetchTransactions({
      username: Username,
    });
    const transactions = transactionsResponse.transactions;
    console.log(4378, { transactions });
    expect(transactions).toBeDefined();
    expect(Array.isArray(transactions)).toBe(true);
  }, 10000);

  it('generateQrcode should make authenticated API calls and generate a QR code', async () => {
    const generateQrcodeResponse = await generateQrcode({
      username: Username,
    });
    const qrCode = generateQrcodeResponse.qrCode;
    console.log(4379, { qrCode });
    expect(qrCode).toBeDefined();
  }, 10000);

  it('genQrcode should make authenticated API calls and generate a QR code', async () => {
    const qrCode = await genQrcode({
      username: Username,
    });
    console.log(4380, { qrCode });
    expect(qrCode).toBeDefined();
  }, 10000);
});
