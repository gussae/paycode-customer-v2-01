import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { getParameter } from './parameter';
import { getAwsCredsProvider } from './utils';

// Only manually enter secrets in the console, this is the most secure.
// at this scale, this makes the most sense, unless having lots and lots of secrets.

// Used from Production environments

export interface GetSecretFromSecretsManagerProps {
  secretId: string;
  region?: string;
  profile?: string;
}

/**
 * Retrieves a secret from AWS Secrets Manager.
 *
 * @param secretId - The ID of the secret to retrieve.
 * @param region - The AWS region where the secret is stored.
 * @param profile - The AWS profile to use for authentication.
 * @returns A promise that resolves to the secret value as a string.
 * @throws If there is an error fetching the secret.
 */
export const getSecretFromSecretsManager = async ({
  secretId,
  region,
  profile,
}: GetSecretFromSecretsManagerProps): Promise<string> => {
  const secretsManagerClient = new SecretsManagerClient({
    region,
    credentials: getAwsCredsProvider(profile), // Assuming getAwsCredsProvider is defined elsewhere
  });
  try {
    const command = new GetSecretValueCommand({ SecretId: secretId });
    const response = await secretsManagerClient.send(command);
    return response.SecretString || '';
  } catch (error) {
    console.error(`Error fetching secret: ${error}`);
    throw error;
  }
};

export interface GetSecretProps {
  key: string;
  env: string;
  region?: string;
  profile?: string;
}

/**
 * Retrieves a secret based on the provided parameters.
 * @param key - The identifier of the secret.
 * @param env - The environment in which the secret is being retrieved.
 * @param region - The AWS region where the secret is stored.
 * @param profile - The AWS profile to use for authentication.
 * @returns A promise that resolves to the retrieved secret as a string, or undefined if the secret is not found.
 */
export const getSecret = async ({
  key,
  env,
  region,
  profile,
}: GetSecretProps): Promise<string | undefined> => {
  try {
    if (env === 'prod') {
      return await getSecretFromSecretsManager({
        secretId: key,
        region,
        profile,
      });
    } else {
      const secret = await getParameter(key, region, profile);
      return secret || process.env[key];
    }
  } catch (error) {
    console.warn(`Error fetching secret: ${error}`);
    //suppress error and return undefined
    return undefined;
  }
};
