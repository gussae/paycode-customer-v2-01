/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sha256 } from '@aws-crypto/sha256-js';
import {
  CloudFormationClient,
  DescribeStackResourcesCommand,
} from '@aws-sdk/client-cloudformation';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { fromEnv, fromIni } from '@aws-sdk/credential-providers';
import { HeaderBag } from '@aws-sdk/types';
import { HttpRequest } from '@smithy/protocol-http';
import { SignatureV4 } from '@smithy/signature-v4';
import { AwsCredentialIdentityProvider } from '@smithy/types';
import { AppSyncClient, ListGraphqlApisCommand, ListGraphqlApisCommandOutput } from '@aws-sdk/client-appsync';
export type ReplacementPairs = [target: string, replacement: string][];
export type TemplateTag = [open: string, close: string];

/**
 * Replaces placeholders in a text string with specified replacement pairs using a template tag format.
 * @param text The input text string where placeholders will be replaced.
 * @param replacementPairs An array of replacement pairs where each pair is [target, replacement].
 * @param templateTag The template tag used to identify placeholders, defaults to ['%{', '}'].
 * @returns The text with placeholders replaced by specified replacements.
 */
export function replacePlaceholdersInText(
  text: string,
  replacementPairs: ReplacementPairs,
  templateTag: TemplateTag = ['${', '}'],
): string {
  // Copy the input text to avoid mutating the original
  let replacedText = text;

  // Replace each placeholder with its corresponding replacement
  replacementPairs.forEach(([target, replacement]) => {
    const regex = new RegExp(
      `${templateTag[0]}${target}${templateTag[1]}`,
      'g',
    );
    replacedText = replacedText.replace(regex, replacement);
  });

  return replacedText;
}

/**
 * Retrieves AWS credentials based on the provided profile.
 * If running in a CI environment, it attempts to load AWS credentials via OIDC token file.
 * If running in a non-CI environment, it loads credentials from AWS profiles.
 * @param profile - The AWS profile to use for retrieving credentials.
 * @returns The AWS credential identity provider or undefined if credentials cannot be loaded.
 */
export function getAwsCredsProvider(
  profile: string | undefined,
): AwsCredentialIdentityProvider | undefined {
  // Check if running in CI environment
  if (process.env.CI === 'true') {
    // Attempt to load AWS credentials via OIDC token file for CI environments
    try {
      return fromEnv();
    } catch (error) {
      console.error('Failed to load AWS credentials from token file:', error);
      return undefined; //hopefully it will pick up from defaultConfig on the CI
    }
  } else if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
    console.log('Running in AWS Lambda. Using execution role for credentials.');
    return undefined;
  } else {
    // Load credentials from AWS profiles for non-CI environments
    return fromIni({ profile });
  }
}

/**
 * Signs an AWS request with AWS Signature Version 4 in nodejs environment.
 *
 * @param service - The AWS service name.
 * @param request - The HTTP request to sign.
 * @param region - The AWS region.
 * @returns The signed HTTP request.
 */
export async function signAwsRequest(
  service: string,
  request: HttpRequest,
  region: string,
): Promise<HttpRequest> {
  request.headers['Host'] = new URL(`https://${request.hostname}`).hostname;

  function headersToHeaderBag(headers: Headers): HeaderBag {
    const headerBag: HeaderBag = {};
    headers.forEach((value, key) => {
      headerBag[key] = value;
    });
    return headerBag;
  }

  //need to bag headers
  request.headers = headersToHeaderBag(
    new Headers(Object.entries(request.headers)),
  );

  console.log(444, request.headers);
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region,
    service,
    sha256: Sha256,
  });

  const signedRequest = await signer.sign(request);

  return signedRequest as HttpRequest;
}

export interface LogicalIdResourcesMap {
  [logicalId: string]: string;
}

/**
 * Fetches resources by logical ID from a CloudFormation stack.
 * @param resources - The map of logical IDs to resource types.
 * @param stackName - The name of the stack.
 * @param client - The CloudFormation client.
 * @returns A promise that resolves to a map of logical IDs to physical resource IDs, or undefined if the stack resources are not available.
 */
export async function fetchResourcesByLogicalId(
  resources: LogicalIdResourcesMap,
  stackName: string,
  client: CloudFormationClient,
): Promise<LogicalIdResourcesMap | undefined> {
  const command = new DescribeStackResourcesCommand({ StackName: stackName });
  const response = await client.send(command);
  const result: LogicalIdResourcesMap = {};
  if (!response.StackResources) {
    return undefined;
  }

  response.StackResources.forEach(resource => {
    const logicalResourceId = resource.LogicalResourceId as string;
    if (!logicalResourceId) return;
    if (
      resources[logicalResourceId] &&
      resource.ResourceType === resources[logicalResourceId]
    ) {
      result[logicalResourceId] = resource.PhysicalResourceId as string;
    }
  });

  return result;
}

export interface FindAppSyncAPiIdParams {
  endpoint?: string;
  name?: string;
  client: AppSyncClient;
}
/**
 * Finds the AppSync API ID corresponding to a given GraphQL endpoint URL or API name.
 *
 * @param {object} params - The parameters for the function.
 * @param {string} [params.endpoint] - The GraphQL endpoint URL to match.
 * @param {string} [params.name] - The name of the AppSync API to match.
 * @param {AppSyncClient} params.client - An instance of the AppSyncClient.
 * @returns {Promise<string | null>} The API ID if found, or null if not found.
 *
 */
export async function findAppSyncApiId({
  endpoint,
  name,
  client,
}: FindAppSyncAPiIdParams): Promise<string | null> {
  if (!endpoint && !name) {
    throw new Error("Either 'endpoint' or 'name' must be provided.");
  }

  let nextToken: string | undefined = undefined;
  do {
    const response: ListGraphqlApisCommandOutput = await client.send(
      new ListGraphqlApisCommand({ nextToken }),
    );
    for (const api of response.graphqlApis || []) {
      if (endpoint && api.uris?.GRAPHQL === endpoint) {
        return api.apiId || null;
      } else if (name && api.name === name) {
        return api.apiId || null;
      }
    }
    nextToken = response.nextToken;
  } while (nextToken);

  return null;
}


