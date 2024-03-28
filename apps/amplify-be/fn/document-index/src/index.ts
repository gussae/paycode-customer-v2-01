/* Amplify Params - DO NOT EDIT
	API_PAYCODEGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_PAYCODEGQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {
  createDocumentIndex,
  deleteDocumentIndex,
} from '@paycode-customer-v2/graphql/dist/cjs';
import { callGqlEndpoint } from '@paycode-customer-v2/lib/dist/cjs';
import { S3Event } from 'aws-lambda';
import { generateDocumentIndex } from './generate-index';

const graphqlEndpoint = process.env.API_PAYCODEGQL_GRAPHQLAPIENDPOINTOUTPUT;

if (!graphqlEndpoint) {
  throw new Error('Missing GraphQL API endpoint');
}

/**
 * Lambda function handler for processing S3 events PUT Object and DELETE Object. PUT Object triggers the creation of a document index, while DELETE Object triggers the deletion of a document index.
 *
 * @param event - The S3 event triggered by object creation or deletion.
 * @returns A Promise that resolves to void.
 */
export const handler = async (event: S3Event): Promise<void> => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  for (const record of event.Records) {
    try {
      let response;
      switch (record.eventName) {
        case 'ObjectCreated:Put': {
          const documentIndex = await generateDocumentIndex(record);
          console.debug({ documentIndex });
          response = await callGqlEndpoint({
            query: createDocumentIndex,
            variables: { input: documentIndex },
            graphqlEndpoint,
            path: '/graphql',
          });
          break;
        }
        case 'ObjectRemoved:Delete':
          {
            const key = decodeURIComponent(
              record.s3.object.key.replace(/\+/g, ' '),
            );
            const username = key.split('/')[0];
            response = await callGqlEndpoint({
              query: deleteDocumentIndex,
              variables: {
                input: {
                  username,
                  key,
                },
              },
              graphqlEndpoint,
              path: '/graphql',
            });
          }
          break;
        default:
          console.log(`Unhandled event: ${record.eventName}`);
          return;
      }

      console.log('GraphQL response:', response);
    } catch (error) {
      console.error('Error processing event record:', error);
      throw error; // Or handle more gracefully
    }
  }
};
