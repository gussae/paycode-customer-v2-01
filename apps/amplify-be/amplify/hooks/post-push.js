import { SSMClient, PutParameterCommand } from '@aws-sdk/client-ssm';
import { getAwsCredsProvider } from '@paycode-customer-v2/lib';
import CONFIG from '../../scripts/config.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const {
  deploymentConfig: { profile, region },
  exports,
  outputsPartition,
} = CONFIG;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let amplifyConfig = JSON.parse(
  readFileSync(
    path.resolve(__dirname, '../../src/amplifyconfiguration.json'),
    'utf8',
  ),
);

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
amplifyConfig = convertKeysToSnakeCase(amplifyConfig);

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
  const ssmClient = new SSMClient({
    credentials: getAwsCredsProvider(profile),
    region,
  });

  //TODO, simply (this was modified to adapt to the new configuration structure)
  //map the exports to the old config format (uses )
  const mappedExports = Object.values(exports).map(value => value.split('/').pop());

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

updateParameters()
  .then(() => console.log('All parameters updated successfully.'))
  .catch(error => console.error(error));
