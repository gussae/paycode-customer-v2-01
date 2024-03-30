import { getMonorepoConfig } from '@paycode-customer-v2/config';
import { executeCheckLambda } from '@paycode-customer-v2/utils/dist/node';
getMonorepoConfig(__dirname)
  .then(config =>
    executeCheckLambda({
      deploymentEnv: config.deploymentConfig?.deploymentEnv,
      profile: config.deploymentConfig?.profile,
      region: config.deploymentConfig?.region,
      projectRoot: __dirname,
      envars: {
        PAYCODE_SERVER_API_KEY_NAME: 'test',
        PAYCODE_API_URL: 'MOCK',
        ALLOWED_ORIGINS: '["http://localhost:3000"]',
      },
      event: {
        queryStringParameters: {
          username: 'test',
        },
        path: '/transactions',
        httpMethod: 'GET',
        headers: {
          // origin: 'http://localhost:3000',
        },
      },
    }),
  )
  .catch(console.error);
