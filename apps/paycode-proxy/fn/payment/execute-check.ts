import { executeCheckLambda } from '@paycode-customer-v2/utils';
executeCheckLambda({
  projectRoot: __dirname,
  envars: {
    PAYCODE_SERVER_API_KEY_NAME: 'test',
    PAYCODE_API_URL: 'MOCK',
    ALLOWED_ORIGINS: '["http://localhost:3000"]',
  },
  event: {
    body: {
      username: 'test',
      id: 'test',
      amount: 50,
    },
    headers: {
      // origin: 'http://localhost:3000',
    },
  },
}).catch(console.error);
