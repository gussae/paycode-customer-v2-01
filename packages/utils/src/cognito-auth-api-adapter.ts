/* eslint-disable @typescript-eslint/no-explicit-any */
import os from 'os';
import fs from 'fs-extra';
import { getCognitoAuthHeader } from './utils';
import { generateApigwClient } from './generate-apigw-client';
import { createApiAdapter } from './api-adapter';
import { join } from 'path';

export interface CreateCognitoAuthorizedApiAdapterProps {
  apiUrl: string;
  awsUserPoolsId: string;
  awsUserPoolsWebClientId: string;
  apiWorkspaceRoot: string;
  options?: {
    bundledOpenapiPath?: string;
    generatedApiModulePath?: string;
  };
}

/**
 * Creates a proxy API adapter for Cognito-authorized requests.
 *
 * @param apiUrl - The URL of the API.
 * @param awsUserPoolsId - The ID of the AWS user pools.
 * @param awsUserPoolsWebClientId - The ID of the AWS user pools web client.
 * @param apiWorkspaceRoot - The root path of the API workspace.
 * @param options - Additional options for the adapter.
 * @param options.bundledOpenapiPath - The path to the bundled OpenAPI specification file. Defaults to `${apiWorkspaceRoot}/api/openapi.bundled.yaml`.
 * @param options.generatedApiModulePath - The path to the generated API module. Defaults to `client/API`.
 * @returns A promise that resolves to the created API adapter.
 */
export async function getProxyApiAdapter({
  apiUrl,
  awsUserPoolsId,
  awsUserPoolsWebClientId,
  apiWorkspaceRoot,
  options = {},
}: CreateCognitoAuthorizedApiAdapterProps) {
  const {
    bundledOpenapiPath = `${apiWorkspaceRoot}/api/openapi.bundled.yaml`,
    generatedApiModulePath = `client/API.js`, //! should be set by referring the generateApigwClient function
  } = options;
  const tempDirPath = await fs.mkdtemp(join(os.tmpdir(), 'api-adapter-'));
  console.log('tempDirPath', tempDirPath);
  try {
    //! necessary to accommodate jet issues with dynamic imports from OS temp folders
    const apiModulePath =
      process.env.NODE_ENV === 'test'
        ? (process.env.TEST_API_TS_MODULE_PATH as string)
        : join(tempDirPath, generatedApiModulePath);
    await generateApigwClient({
      workspaceRoot: apiWorkspaceRoot,
      bundledOpenapiPath,
      outdir:
        process.env.NODE_ENV === 'test'
          ? (process.env.TEST_API_TS_DIR as string)
          : tempDirPath,
    });

    const headerToInject = await getCognitoAuthHeader(
      awsUserPoolsId,
      awsUserPoolsWebClientId,
    );

    console.log(77777, apiModulePath);
    const API = await import(apiModulePath);
    console.log(API);

    return createApiAdapter(apiUrl, headerToInject, API);
  } catch (e) {
    console.error('Error in getProxyApiAdapter', e);
    throw e;
  } finally {
    //fs.remove(tempDirPath);
  }
}
