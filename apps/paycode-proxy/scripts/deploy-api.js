import { getAwsCredsProvider}from '@paycode-customer-v2/lib/dist/esm';
import CONFIG from './config.js';
import { getApiId } from './utils.js';
import {
  APIGatewayClient,
  CreateDeploymentCommand,
  UpdateStageCommand,
} from '@aws-sdk/client-api-gateway';

// const { getAwsCredsProvider } = Lib;
// Configurations from your existing setup
const {
  deploymentConfig: {
    deploymentEnv: DEPLOYMENT_ENV,
    profile: PROFILE,
    region: REGION,
  },
  deploymentOptions: { autoDeployApi },
} = CONFIG;

const deployToExistingStage = async existingStageName => {
  if (!autoDeployApi) {
    console.log('Auto-deploy is turned off. Skipping deployment.');
    return;
  }

  const apiGwClient = new APIGatewayClient({
    region: REGION,
    credentials: getAwsCredsProvider(PROFILE),
  });

  try {
    // Fetch API ID from Parameter Store using the utility function
    const apiId = await getApiId(
      CONFIG.exports.paycodeProxyApiIdParameterStoreHandle,
    );

    // Create a new deployment for the API Gateway
    const deploymentResponse = await apiGwClient.send(
      new CreateDeploymentCommand({
        restApiId: apiId,
        description: 'Automated deployment via deploy-api.js',
      }),
    );

    console.log(
      `Deployment ${deploymentResponse.id} created for API ID ${apiId}.`,
    );

    // Update the existing stage with the new deployment
    await apiGwClient.send(
      new UpdateStageCommand({
        restApiId: apiId,
        stageName: existingStageName,
        patchOperations: [
          {
            op: 'replace',
            path: '/deploymentId',
            value: deploymentResponse.id,
          },
        ],
      }),
    );

    console.log(
      `Stage ${existingStageName} updated with deployment ${deploymentResponse.id}.`,
    );
  } catch (error) {
    console.error('Failed to deploy API to the existing stage:', error);
  }
};

deployToExistingStage(DEPLOYMENT_ENV).then(() =>
  console.log('Completed deployment to the existing stage.'),
);
