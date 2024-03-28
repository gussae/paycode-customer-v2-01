import { SSMClient, PutParameterCommand } from '@aws-sdk/client-ssm';
import { getAwsCredsProvider } from '@paycode-customer-v2/lib/dist/esm';
import CONFIG from './config.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const amplifyBeConfigPath =  '../src/amplifyconfiguration.json'

const {
  deploymentConfig: { profile, region },
  exports,
  outputsPartition,
} = CONFIG;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertKeysToSnakeCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase);
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const snakeCaseKey = toSnakeCase(key);
    acc[snakeCaseKey] = convertKeysToSnakeCase(value);
    return acc;
  }, {});
}

function toSnakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

async function putParameter(ssmClient, name, value) {
  const params = {
    Name: `${outputsPartition}${name}`,
    Type: 'String',
    Value: value,
    Overwrite: true,
  };
  try {
    await ssmClient.send(new PutParameterCommand(params));
    console.log(`Successfully updated parameter: ${name}`);
  } catch (error) {
    console.error(`Error updating parameter: ${name}`, error);
  }
}

// Putting parameters to the SSM Parameter Store

async function updateParameters() {
  let amplifyConfig = JSON.parse(
    await readFile(
      path.resolve(__dirname, amplifyBeConfigPath),
      'utf8',
    ),
  );
  amplifyConfig = convertKeysToSnakeCase(amplifyConfig);
  const ssmClient = new SSMClient({
    credentials: getAwsCredsProvider(profile),
    region,
  });

  //TODO, simplify (this was modified to adapt to the new configuration structure)
  //map the exports to the old config format (uses )
  const mappedExports = Object.values(exports).map(value =>
    value.split('/').pop(),
  );

  for (const key of mappedExports) {
    const snakeCaseKey = toSnakeCase(key);
    const value = amplifyConfig[snakeCaseKey];
    console.log(777, key, value);
    if (value && Object.keys(value).length !== 0 && !Array.isArray(value)) {
      // truthy, not an empty object, and not an array.
      await putParameter(ssmClient, key, value);
    } else if (Array.isArray(value) && value.length !== 0) {
      // value' is a non-empty array.
      await putParameter(ssmClient, key, value);
    }
  }
}
//!TODO  this version only catches process exit failures
// async function checkAmplifyPushSuccess() {
//   try {
//     const data = await readFile(0, 'utf8');
//     const event = JSON.parse(data);

//     // Check if the error key exists and has a value
//     if (event.error) {
//       console.error('Amplify push failed with error:', event.error);
//       throw new Error('Amplify push failed. No parameters were updated.');
//     } else {
//       console.log('Amplify push succeeded');
//     }
//   } catch (error) {
//     console.error('Failed to process Amplify push event:', error);
//     throw error; // Re-throw the error to be caught by the caller
//   }
// }

async function postPush() {
  try {
    // await checkAmplifyPushSuccess();
    console.log('updating parameters...');
    await updateParameters();
    console.log('All parameters updated successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

postPush();
