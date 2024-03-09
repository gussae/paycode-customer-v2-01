/* eslint-disable no-undef */
import { spawn } from 'child_process';
import CONFIG from './config.js';
import path from 'path';
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';
import { getParameter, getAwsCredsProvider } from '@paycode-customer-v2/lib';

const {
  deploymentConfig: { region: REGION, profile: PROFILE },
  paths: { __workspaceRoot },
  customSettings: { staticFilesDir: STATIC_FILES_DIR },
  exports: {
    UiWebHostS3BucketParameterStoreHandle: BUCKET_NAME_HANDLE,
    UiWebCloudFrontDistributionIdParameterStoreHandle: DISTRIBUTION_ID_HANDLE,
  },
} = CONFIG;

const credentials = getAwsCredsProvider(PROFILE);

const clfClient = new CloudFrontClient({ region: REGION, credentials });

async function invalidateCloudFront(distributionId) {
  const command = new CreateInvalidationCommand({
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: `invalidate-${Date.now()}`,
      Paths: {
        Quantity: 1,
        Items: ['/*'],
      },
    },
  });
  await clfClient.send(command);
  console.log(`Invalidation request sent for distribution ${distributionId}`);
}

async function syncToS3(bucketName) {
  const buildDir = path.join(__workspaceRoot, STATIC_FILES_DIR);
  const syncCommand = 'aws';
  const syncArgs = ['s3', 'sync', buildDir, `s3://${bucketName}`, '--delete'];
  const options = {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      AWS_PROFILE: PROFILE,
      AWS_REGION: REGION,
      FORCE_COLOR: '1',
    },
  };
  spawn(syncCommand, syncArgs, options);
}

async function main() {
  try {
    const bucketName = await getParameter(BUCKET_NAME_HANDLE, REGION, PROFILE);
    const distributionId = await getParameter(
      DISTRIBUTION_ID_HANDLE,
      REGION,
      PROFILE,
    );
    console.log({ bucketName, distributionId });
    await syncToS3(bucketName);
    await invalidateCloudFront(distributionId);
  } catch (error) {
    console.error('Error during post-deployment:', error);
  }
}

main();
