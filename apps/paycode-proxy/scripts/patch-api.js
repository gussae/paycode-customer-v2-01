//?use this to implement patch operations for the API Gateway: there maybe a persistent issue with the AWS APIGW interpretation of the openapi spec and if u can't easily fix it, patch it here

import { getAwsCredsProvider } from '@paycode-customer-v2/lib';
import CONFIG from './config.js';
import { getApiId } from './utils.js';
import {
  APIGatewayClient,
  GetResourcesCommand,
  UpdateMethodCommand,
} from '@aws-sdk/client-api-gateway';

// Configurations
const {
  deploymentConfig: { profile: PROFILE, region: REGION },
  paths: { __workspaceRoot: __WORKSPACE_ROOT },
  exports: {
    paycodeProxyApiIdParameterStoreHandle:
      PAYCODE_PROXY_API_ID_PARAMETER_STORE_HANDLE,
  },
} = CONFIG;

const removeOptionsAuth = async () => {
  const creds = getAwsCredsProvider(PROFILE);
  const apiGwClient = new APIGatewayClient({
    region: REGION,
    credentials: creds,
  });

  try {
    // Fetch API ID from Parameter Store using the utility function
    const apiId = await getApiId(PAYCODE_PROXY_API_ID_PARAMETER_STORE_HANDLE);

    // Fetch all resources for the given API ID
    const resources = await apiGwClient.send(
      new GetResourcesCommand({
        restApiId: apiId,
      }),
    );

    // Iterate through resources to find OPTIONS methods and remove authentication
    for (const resource of resources.items) {
      if (resource.resourceMethods && resource.resourceMethods.OPTIONS) {
        //?patch the OPTIONS method to remove authentication
        await apiGwClient.send(
          new UpdateMethodCommand({
            restApiId: apiId,
            resourceId: resource.id,
            httpMethod: 'OPTIONS',
            patchOperations: [
              {
                op: 'replace',
                path: '/authorizationType',
                value: 'NONE',
              },
            ],
          }),
        );
        console.log(
          `Updated OPTIONS method for resource ${resource.id} to remove authentication.`,
        );
        //?you can add more patch operations here
      }
    }
  } catch (error) {
    console.error('Failed to update OPTIONS methods:', error);
  }
};

removeOptionsAuth().then(() =>
  console.log('Completed updating OPTIONS methods.'),
);
