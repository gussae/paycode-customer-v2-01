import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { getAwsCredsProvider } from '@paycode-customer-v2/lib';
import CONFIG from './config.js';

// Configurations
const {
  deploymentConfig: { profile: PROFILE, region: REGION },
} = CONFIG;

const ssmClient = new SSMClient({
  credentials: getAwsCredsProvider(PROFILE),
  region: REGION,
});
// Function to merge root-level config with nested map (only one level) for comprehensive replacements
function createReplacementMap(config) {
  let replacementMap = {};
  Object.keys(config).forEach(key => {
    // Check if the value is an object and not null (to avoid attempting to spread null values)
    if (
      typeof config[key] === 'object' &&
      config[key] !== null &&
      !Array.isArray(config[key])
    ) {
      // Spread object keys into the replacement map
      replacementMap = { ...replacementMap, ...config[key] };
    } else {
      // Directly assign non-object values
      replacementMap[key] = config[key];
    }
  });
  console.log({ replacementMap });
  return replacementMap;
}

// Function to normalize keys to both camelCase and UpperSnakeCase for matching
function normalizeConfigKeys(mergedConfig) {
  const normalized = {};
  Object.keys(mergedConfig).forEach(key => {
    const value = mergedConfig[key];

    // Store the value directly, assuming it's already in an appropriate format (original form)
    normalized[key] = value;

    // Normalize to UpperSnakeCase and store if different
    const upperSnakeKey = key.replace(/([A-Z])/g, '_$1').toUpperCase();
    normalized[upperSnakeKey] = value;

    // Normalize to lower_snake_case and store if different
    const lowerSnakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    normalized[lowerSnakeKey] = value;

    // Normalize to PascalCase and store if different
    // Convert the first character to uppercase and concatenate the rest of the string
    const pascalCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
    normalized[pascalCaseKey] = value;

    // Normalize to camelCase and ensure the first character is lowercase
    // This might be redundant if the original key is already in camelCase, but it ensures consistency
    const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
    normalized[camelCaseKey] = value;
  });
  return normalized;
}

// Function to replace placeholders in the content with values from the merged and normalized config
function replacePlaceholders(content, normalizedConfig) {
  // Ensure content is a string
  if (typeof content !== 'string') {
    console.error('Content must be a string');
    return content;
  }
  const placeholders = content.match(/\$\{([^}]+)\}/g) || [];
  placeholders.forEach(placeholder => {
    const key = placeholder.slice(2, -1); // Remove ${ and }
    if (normalizedConfig.hasOwnProperty(key)) {
      content = content.replace(
        new RegExp(`\\$\\{${key}\\}`, 'g'),
        normalizedConfig[key],
      );
    }
  });
  return content;
}

export function replacePlaceholdersWithConfigValues(content, config) {
  const mergedConfig = createReplacementMap(config);
  const normalizedConfig = normalizeConfigKeys(mergedConfig);
  return replacePlaceholders(content, normalizedConfig);
}

// Function to get API ID from Parameter Store
export async function getApiId(parameterStoreKey) {
  try {
    const command = new GetParameterCommand({ Name: parameterStoreKey });
    const data = await ssmClient.send(command);
    return data.Parameter.Value;
  } catch (err) {
    throw new Error(`Error getting API ID from Parameter Store: ${err}`);
  }
}
