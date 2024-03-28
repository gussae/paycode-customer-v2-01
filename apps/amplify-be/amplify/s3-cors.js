//! Run from cli, not intended for CI as the Amplify CI/CD is abandoned
import { S3Client, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import CONFIG from '../scripts/config.js';
import { getAwsCredsProvider } from '@paycode-customer-v2/lib/dist/esm';
import awsExports from '../src/aws-exports.js';

const {
  deploymentConfig: { profile, region },
  infraEnvConfig: { allowedOriginsForS3Access, preflightCacheTtl },
} = CONFIG;

const s3Client = new S3Client({
  credentials: getAwsCredsProvider(profile),
  region,
});

// Function to update the CORS configuration
async function updateS3Cors(bucketName, allowedOrigins, ttl) {
  const corsConfiguration = {
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
          AllowedOrigins: allowedOrigins,
          ExposeHeaders: [],
          MaxAgeSeconds: ttl ?? 3600,
        },
      ],
    },
  };

  try {
    const command = new PutBucketCorsCommand(corsConfiguration);
    const response = await s3Client.send(command);
    console.log(`CORS configuration updated for bucket: ${bucketName}`);
    console.log(response);
  } catch (error) {
    console.error('Failed to update CORS configuration:', error);
  }
}

updateS3Cors(
  awsExports.aws_user_files_s3_bucket,
  allowedOriginsForS3Access,
  preflightCacheTtl,
)
  .then(console.log) //is undefined when successful
  .catch(console.error);