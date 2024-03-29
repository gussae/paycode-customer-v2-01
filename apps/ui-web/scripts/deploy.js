/* eslint-disable no-undef */
import { spawn, exec } from 'child_process';
import CONFIG from './config.js';
import path from 'path';

const {
  deploymentConfig: { region, profile },
  paths: { __workspaceRoot },
  stackNameKebabCase,
  exports,
} = CONFIG;

// Prepare environment variables for the child process
const env = {
  ...process.env,
  AWS_REGION: region,
  AWS_PROFILE: process.env.CI === 'true' ? undefined : profile,
  FORCE_COLOR: '1',
};

const deployCommand = 'aws';
const deployArgs = [
  'cloudformation',
  'deploy',
  '--template-file',
  path.join(__workspaceRoot, 'cfn.yaml'),
  '--stack-name',
  stackNameKebabCase,
  '--capabilities',
  'CAPABILITY_IAM',
  'CAPABILITY_NAMED_IAM',
  '--parameter-overrides',
  `UiWebHostS3BucketParameterStoreHandle=${exports.UiWebHostS3BucketParameterStoreHandle}`,
  `UiWebCloudFrontDistributionIdParameterStoreHandle=${exports.UiWebCloudFrontDistributionIdParameterStoreHandle}`,
  `UiWebCloudFrontDistributionDomainNameParameterStoreHandle=${exports.UiWebCloudFrontDistributionDomainNameParameterStoreHandle}`,
];

const options = {
  stdio: 'inherit',
  shell: true,
  env,
  cwd: __workspaceRoot,
};

// console.log({ deployArgs, options, region, profile });
const deployment = spawn(deployCommand, deployArgs, options);

deployment.on('error', error => {
  console.error(`Deployment process encountered an error: ${error.message}`);
});

deployment.on('exit', code => {
  console.log(`Deployment process exited with code ${code}`);
  //Get outputs on success
  if (code === 0) {
    const describeCommand = `aws cloudformation describe-stacks --stack-name ${stackNameKebabCase} --query "Stacks[0].Outputs" --output text`;
    exec(describeCommand, { env }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error fetching stack outputs: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log('Stack Outputs:\n', stdout);
    });
  }
});