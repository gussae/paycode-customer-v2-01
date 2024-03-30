// You just need to update the allowedOrigins array in the .workspace.config.json file to add the new origin. It will be automatically updated in the backend workspaces on the next deployment. Run this script to update the lambda environment immediately.

import { CloudFormationClient } from '@aws-sdk/client-cloudformation';
import {
  LambdaClient,
  UpdateFunctionConfigurationCommand,
  GetFunctionConfigurationCommand,
} from '@aws-sdk/client-lambda';

import CONFIG from './config.js';
import {
  getAwsCredsProvider,
  fetchResourcesByLogicalId,
} from '@paycode-customer-v2/lib/dist/esm';

const {
  deploymentConfig: { region: REGION, profile: PROFILE },
  envVars: { allowedOrigins: ALLOWED_ORIGINS },
  stackNameKebabCase: STACK_NAME,
} = CONFIG;

console.debug({
  region: REGION,
  profile: PROFILE,
  allowedOrigins: JSON.stringify(ALLOWED_ORIGINS),
  stackName: STACK_NAME,
});

const cfnClient = new CloudFormationClient({
  region: REGION,
  credentials: getAwsCredsProvider(PROFILE),
});

const lambdaClient = new LambdaClient({
  region: REGION,
  credentials: getAwsCredsProvider(PROFILE),
});

const resourcesMap = {
  BalanceFunction: 'AWS::Lambda::Function',
  PaymentFunction: 'AWS::Lambda::Function',
  TransactionFunction: 'AWS::Lambda::Function',
};

fetchResourcesByLogicalId(resourcesMap, STACK_NAME, cfnClient)
  .then(lambdas => {
    const updatePromises = Object.entries(lambdas).map(
      async ([_, functionName]) => {
        // existing environment variables
        const getConfigCommand = new GetFunctionConfigurationCommand({
          FunctionName: functionName,
        });
        const config = await lambdaClient.send(getConfigCommand);

        //update ALLOWED_ORIGINS
        const updateCommand = new UpdateFunctionConfigurationCommand({
          FunctionName: functionName,
          Environment: {
            Variables: {
              ...config.Environment?.Variables,
              ALLOWED_ORIGINS: JSON.stringify(ALLOWED_ORIGINS),
            },
          },
        });

        return lambdaClient.send(updateCommand);
      },
    );

    return Promise.all(updatePromises);
  })
  .then(console.log)
  .catch(console.error);
