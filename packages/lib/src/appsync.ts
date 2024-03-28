import { HttpRequest } from '@smithy/protocol-http';
import { signAwsRequest } from './utils';

export interface GqlRequestParams {
  graphqlEndpoint: string;
  query: string;
  variables: Record<string, unknown>;
  path: string;
}

/**
 * Calls a GraphQL endpoint with a signed request.
 *
 * @param params - Parameters including the GraphQL endpoint, query, and variables.
 * @returns The JSON response from the GraphQL endpoint.
 */
export async function callGqlEndpoint(
  params: GqlRequestParams,
): Promise<Record<string, unknown>> {
  const region = process.env.AWS_REGION || process.env.REGION;
  if (!region) throw new Error('Region not found in environment variables');
  const { graphqlEndpoint, query, variables } = params;


  const request = new HttpRequest({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    hostname: new URL(graphqlEndpoint).hostname,
    path: params.path,
    body: JSON.stringify({ query, variables }),
  });

  const signedRequest = await signAwsRequest('appsync', request, region);

  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: signedRequest.headers,
    body: signedRequest.body,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Error calling GraphQL endpoint: ${errorBody}`);
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
}
