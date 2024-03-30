//? NB documentIndex is not directly testable with the execute check as it's event driven and you would need to orchestrate many things to simulate that ...however, if you run this execute check, you will also able to test it indirectly
import { AppSyncClient } from '@aws-sdk/client-appsync';
import { getMonorepoConfig } from '@paycode-customer-v2/config';
import { getAwsCredsProvider } from '@paycode-customer-v2/lib/dist/cjs';
import {
  findAppSyncApiId,
  uploadDocumentWithPresignedUrl,
} from '@paycode-customer-v2/lib/dist/cjs';
import { executeCheckLambda } from '@paycode-customer-v2/utils/dist/node';
import { aws_appsync_graphqlEndpoint } from '../../src/amplifyconfiguration.json';

async function executeWorkflow() {
  const config = await getMonorepoConfig(__dirname);
  const {
    deploymentConfig: { deploymentEnv, profile, region },
  } = config;

  const appId = await findAppSyncApiId({
    endpoint: aws_appsync_graphqlEndpoint,
    client: new AppSyncClient({
      region,
      credentials: getAwsCredsProvider(profile),
    }),
  });

  //documentIndexTableName = DocumentIndex-{graphqlId}-{env}
  const API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME = `DocumentIndex-${appId}-${deploymentEnv}`;
  const lambdaData = await executeCheckLambda({
    deploymentEnv,
    profile,
    region,
    projectRoot: __dirname,
    envars: {
      API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME,
      ENV: 'dev',
    },
    event: {
      fieldName: 'getUploadDocumentAccess',
      arguments: {
        params: {
          mimetype: 'text/plain',
          dirname: 'test/partition',
          entityType: 'RECEIPT',
          filename: 'test-document.txt',
          username: 'tester',
          operation: 'PUT',
          ttl: 3600,
        },
      },
    },
  });

  //@ts-ignore
  const { signedUrl, metadataHeaders } = lambdaData;
  const content = `This is a test document: ${new Date().toISOString()}`;
  const uploadResponse = await uploadDocumentWithPresignedUrl({
    signedUrl,
    metadataHeaders: JSON.parse(metadataHeaders),
    content,
    contentType: 'text/plain',
  });

  console.debug({ uploadResponse });
  if (!uploadResponse.ok) {
    throw new Error(`Failed to upload document: ${uploadResponse.statusText}`);
  }

  // Delay for S3 PUT event
  await new Promise(resolve => setTimeout(resolve, 10000));

  return await executeCheckLambda({
    deploymentEnv,
    profile,
    region,
    projectRoot: __dirname,
    envars: {
      API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME,
      ENV: 'dev',
    },
    event: {
      fieldName: 'getDownloadDocumentAccess',
      arguments: {
        params: {
          filename: 'test-document.txt',
          dirname: 'test/partition',
          username: 'tester',
          operation: 'GET',
        },
      },
    },
  });
}

executeWorkflow().then(console.log).catch(console.error);
