/* Amplify Params - DO NOT EDIT
    API_PAYCODEGQL_GRAPHQLAPIENDPOINTOUTPUT
    API_PAYCODEGQL_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

import { S3Event } from 'aws-lambda';
// import { createDocument } from '@paycode-customer-v2/graphql';
import {
  callGqlEndpoint,
  getMetadataFromS3Object,
} from '@paycode-customer-v2/lib';

const graphqlEndpoint = process.env.API_PAYCODEGQL_GRAPHQLAPIENDPOINTOUTPUT;

if (!graphqlEndpoint) {
  throw new Error('Missing GraphQL API endpoint');
}

function createDocument (input: any) {
  return {
    query: `mutation CreateDocument($input: CreateDocumentInput!) {
      createDocument(input: $input) {
        id
        username
        filename
        extension
        size
        type
        partition
        version
        ttl
        createdAt
        updatedAt
      }
    }`,
    variables: { input },
  };
}

export const handler = async (event: S3Event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  for (const record of event.Records) {
    const {
      object: { key },
      bucket: { name: bucketName },
    } = record.s3;

    try {
      //grab object metadata
      const input = await getMetadataFromS3Object(bucketName, key);

      // execute mutation
      const response = await callGqlEndpoint({
        //@ts-ignore
        query: createDocument,
        variables: { input },
        graphqlEndpoint,
      });

      console.log('GraphQL response:', response);
    } catch (error) {
      console.error('Error calling GraphQL endpoint or retrieving metadata:', error);
      throw new Error('Error processing document metadata');
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Metadata saved successfully'),
  };
};
