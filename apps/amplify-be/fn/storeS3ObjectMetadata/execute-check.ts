import { getMonorepoConfig } from '@paycode-customer-v2/config';
import { executeCheckLambda } from '@paycode-customer-v2/utils';
getMonorepoConfig(__dirname)
  .then(config =>
    executeCheckLambda({
      deploymentEnv: config.deploymentConfig?.deploymentEnv,
      profile: config.deploymentConfig?.profile,
      region: config.deploymentConfig?.region,
      projectRoot: __dirname,
      envars: {},
      event: {},
    }),
  )
  .catch(console.error);
