/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sha256 } from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { fromEnv, fromIni } from '@aws-sdk/credential-providers';
import { HeaderBag } from '@aws-sdk/types';
import { HttpRequest } from '@smithy/protocol-http';
import { SignatureV4 } from '@smithy/signature-v4';
import { AwsCredentialIdentityProvider } from '@smithy/types';

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
