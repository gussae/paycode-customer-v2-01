/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { APIGatewayProxyHandler } from 'aws-lambda';
import { handleError, runApiOps } from '@paycode-customer-v2/lib';
import { postPayment } from './payment';
const apiKey = process.env.PAYCODE_SERVER_API_KEY_NAME;
const apiUrl = process.env.PAYCODE_API_URL;
const deploymentEnv = process.env.DEPLOYMENT_ENV;

if (!apiKey || !apiUrl || !deploymentEnv) {
  throw new Error('Missing environment variables');
}

if (!apiKey || !apiUrl || !deploymentEnv) {
  throw new Error('Missing environment variables');
}

export const handler: APIGatewayProxyHandler = async event => {
  try {
    //TODO  app authorization layer : check claim in token so forth (check event.headers in authorization)
    // const token = event.headers.Authorization || event.headers.authorization;

    //auto generate id (something like nanoid)
    //@ts-ignore
    event.body.id = Math.random().toString(36).substring(7);
    return await runApiOps({ operation: postPayment, event, apiUrl, apiKey });
  } catch (error) {
    console.error('error:', error);
    return handleError(error as Error);
  }
};
