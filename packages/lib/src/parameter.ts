import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { getAwsCredsProvider } from './utils';

// Used for Development / Staging environments
/**
 * Retrieves the value of a parameter from AWS Systems Manager Parameter Store.
 * @param parameterName - The name of the parameter to retrieve.
 * @param region - The AWS region to use for the SSM client. If undefined, the default region will be used.
 * @param profile - The AWS profile to use for authentication. If undefined, the default profile will be used.
 * @returns A Promise that resolves to the value of the parameter.
 * @throws If there is an error fetching the parameter.
 */
export const getParameter = async (
  parameterName: string,
  region: string | undefined,
  profile: string | undefined,
): Promise<string> => {
  const ssmClient = new SSMClient({
    region,
    credentials: getAwsCredsProvider(profile),
  });
  try {
    const command = new GetParameterCommand({
      Name: parameterName,
      WithDecryption: true,
    });
    const response = await ssmClient.send(command);
    return response.Parameter?.Value || '';
  } catch (error) {
    console.warn(`Error fetching parameter: ${error}`);
    throw error;
  }
};
