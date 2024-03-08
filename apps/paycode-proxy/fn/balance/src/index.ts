/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { handleError, runApiOps } from '@paycode-customer-v2/lib';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getBalance } from './balance';

const apiKey = process.env.PAYCODE_SERVER_API_KEY_NAME;
const apiUrl = process.env.PAYCODE_API_URL;
const deploymentEnv = process.env.DEPLOYMENT_ENV;

console.log({ apiKey, apiUrl, deploymentEnv });

if (!apiKey || !apiUrl || !deploymentEnv) {
  throw new Error('Missing environment variables');
}

export const handler: APIGatewayProxyHandler = async event => {
  try {
    //TODO  app authorization layer : check claim in token so forth (check event.headers in authorization)
    // const token = event.headers.Authorization || event.headers.authorization;

    return await runApiOps({ operation: getBalance, event, apiUrl, apiKey });
  } catch (error) {
    console.error('error:', error);
    return handleError(error as Error);
  }
};
