/* Amplify Params - DO NOT EDIT
	API_PAYCODEGQL_DOCUMENTTABLE_ARN
	API_PAYCODEGQL_DOCUMENTTABLE_NAME
	API_PAYCODEGQL_GRAPHQLAPIIDOUTPUT
	API_PAYCODEGQL_USERTABLE_ARN
	API_PAYCODEGQL_USERTABLE_NAME
	ENV
	REGION
	STORAGE_DOCUMENTSTORE_BUCKETNAME
Amplify Params - DO NOT EDIT */

//? Note that get and list operations are directly handled by the Amplify GraphQL codegen and do not require a custom resolver
import { AppSyncResolverEvent } from 'aws-lambda';
import {
  DocumentKeyInput,
  UploadDocumentInput,
} from '@paycode-customer-v2/graphql/dist/cjs';
import { uploadDocument, downloadDocument } from './resolver';

export type HandlerEvent =
  | AppSyncResolverEvent<DocumentKeyInput>
  | AppSyncResolverEvent<UploadDocumentInput>;

export const handler = async (event: HandlerEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  if (!event.info || !event.info.fieldName) {
    return { statusCode: 400, body: 'Missing operation in request' };
  }

  switch (event.info.fieldName) {
    case 'uploadDocument':
      return uploadDocument(event.arguments as UploadDocumentInput);
    case 'downloadDocument':
      return downloadDocument(event.arguments as DocumentKeyInput);
    default:
      return {
        statusCode: 400,
        body: JSON.stringify('Operation not supported'),
      };
  }
};
