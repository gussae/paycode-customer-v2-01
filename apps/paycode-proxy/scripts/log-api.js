// this bypass a design problem with rest api deployment in CI/CD. Has some circular dependency issues that needs to be addressed.
import {
  APIGatewayClient,
  UpdateStageCommand
} from '@aws-sdk/client-api-gateway';
import {
  CloudWatchLogsClient,
  CreateLogGroupCommand,
  PutRetentionPolicyCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import CONFIG from './config.js';
import { getApiId } from './utils.js';

const {
  deploymentConfig: {
    profile: PROFILE,
    region: REGION,
    deploymentEnv: DEPLOYMENT_ENV,
  },
  infraEnvConfig: { isApiLog, apiLogRetention },
} = CONFIG;
const clientConfig = {
  region: REGION,
  credentials: getAwsCredsProvider(PROFILE),
};
const apiGwClient = new APIGatewayClient(clientConfig);
const cwLogsClient = new CloudWatchLogsClient(clientConfig);

async function updateStageLogging() {
  const apiId = await getApiId(
    CONFIG.exports.paycodeProxyApiIdParameterStoreHandle,
  );

  if (isApiLog) {
    //!TODO support enabling and disabling logging. This will fail once the log group is created.
    const logGroupName = `/aws/api-gateway/${apiId}/access-logs`;
    try {
      await cwLogsClient.send(new CreateLogGroupCommand({ logGroupName }));
      console.log(`Log group ${logGroupName} created.`);
      await cwLogsClient.send(
        new PutRetentionPolicyCommand({
          logGroupName,
          retentionInDays: apiLogRetention,
        }),
      );
      console.log(
        `Log retention for ${logGroupName} set to ${apiLogRetention} days.`,
      );
    } catch (error) {
      if (error.name !== 'ResourceAlreadyExistsException') {
        console.error(`Failed to create log group or set retention: ${error}`);
        return;
      }
      console.log(`Log group ${logGroupName} already exists.`);
    }

    try {

      const updateStageCommand = new UpdateStageCommand({
        restApiId: apiId,
        stageName: DEPLOYMENT_ENV,
        patchOperations: [
          {
            op: 'replace',
            path: '/*/*/logging/dataTrace',
            value: 'true',
          },
          {
            op: 'replace',
            path: '/*/*/logging/loglevel',
            value: 'INFO',
          },
          {
            op: 'replace',
            path: '/accessLogSettings/destinationArn',
            value: `${logGroupName}`,
          },
          {
            op: 'replace',
            path: '/accessLogSettings/format',
            value:
              '{"requestId":"$context.requestId", "ip": "$context.identity.sourceIp", "caller":"$context.identity.caller", "user":"$context.identity.user", "requestTime":"$context.requestTime", "httpMethod":"$context.httpMethod", "resourcePath":"$context.resourcePath", "status":"$context.status", "protocol":"$context.protocol", "responseLength":"$context.responseLength"}',
          },
        ],
      });
      await apiGwClient.send(updateStageCommand);
      console.log(`Stage ${DEPLOYMENT_ENV} updated with new logging settings.`);
    } catch (error) {
      console.error(`Failed to update stage: ${error}`);
    }
  } else {
    console.log(
      `API logging is disabled. No updates made to the stage ${DEPLOYMENT_ENV}.`,
    );
  }
}

if (isApiLog) updateStageLogging().catch(console.error);
