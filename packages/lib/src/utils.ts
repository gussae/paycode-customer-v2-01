/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sha256 } from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { fromEnv, fromIni } from '@aws-sdk/credential-providers';
import { HeaderBag } from '@aws-sdk/types';
import { HttpRequest } from '@smithy/protocol-http';
import { SignatureV4 } from '@smithy/signature-v4';
import { AwsCredentialIdentityProvider } from '@smithy/types';
import { getSignedUrl as awsGetSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommandInput,
} from '@aws-sdk/client-s3';

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
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region,
    service,
    sha256: Sha256,
  });

  const signedRequest = await signer.sign(request);

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

  return signedRequest as HttpRequest;
}

export interface GetSignedUrlParams {
  method: 'getObject' | 'putObject';
  bucket: string;
  key: string;
  expiry: number;
  versionId?: string; // Optional version ID for getObject
  metadataHeaders?: Record<string, string>; // Optional metadata for putObject
}

/**
 * Generates a signed URL for accessing an S3 object or uploading an object to S3.
 * @param params - The parameters for generating the signed URL.
 * @returns A Promise that resolves to the signed URL.
 */
export const getSignedUrl = async (
  params: GetSignedUrlParams,
): Promise<string> => {
  const s3Client = new S3Client({ region: process.env.REGION });

  let command;
  if (params.method === 'getObject') {
    // Include versionId conditionally for getObject
    const getObjectParams: GetObjectCommandInput = {
      Bucket: params.bucket,
      Key: params.key,
      ...(params.versionId && { VersionId: params.versionId }),
    };
    command = new GetObjectCommand(getObjectParams);
  } else {
    const metadataHeaders = params.metadataHeaders || {};
    const commandInput: PutObjectCommandInput = {
      Bucket: params.bucket,
      Key: params.key,
      Metadata: params?.metadataHeaders,
      ContentType:
        metadataHeaders['Content-Type'] ||
        metadataHeaders['content-type'] ||
        metadataHeaders['x-amz-meta-type'],
    };
    command = new PutObjectCommand(commandInput);
  }

  const signedUrl = await awsGetSignedUrl(s3Client, command, {
    expiresIn: params.expiry,
  });
  return signedUrl;
};
