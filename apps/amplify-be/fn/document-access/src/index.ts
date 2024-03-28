/* Amplify Params - DO NOT EDIT
	API_PAYCODEGQL_DOCUMENTINDEXTABLE_ARN
	API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME
	API_PAYCODEGQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { AmplifyGraphQlResolverEvent} from 'aws-lambda';
import { PAYCODE_DOCUMENT_STORE_BUCKET_NAME } from './.env.json';

import {
  UploadDocumentAccessInput,
  DownloadDocumentAccessInput,
  DownloadDocumentAccess,
  UploadDocumentAccess,
} from '@paycode-customer-v2/graphql/dist/cjs';
import {
  GetPresignedUrlParams,
  S3ObjectKeyInput,
  createMetadata,
  createS3ObjectKey,
  getPresignedUrl,
  getValidatedS3ObjectKey,
} from '@paycode-customer-v2/lib/dist/cjs';

if (!process.env.API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME) {
  throw new Error('API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME is not defined.');
}
const DOCUMENT_INDEX_TABLE = process.env.API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME;

const DOCUMENT_STORE_BUCKET_NAME = `${PAYCODE_DOCUMENT_STORE_BUCKET_NAME}-${process.env.ENV}`;

export const handler = async (
  event: AmplifyGraphQlResolverEvent<{
    params: DownloadDocumentAccessInput | UploadDocumentAccessInput;
  }>,
  //@ts-ignore  description: all return types are handled
): Promise<DownloadDocumentAccess | UploadDocumentAccess> => {
  if (
    event.fieldName !== 'getUploadDocumentAccess' &&
    event.fieldName !== 'getDownloadDocumentAccess'
  ) {
    throw new Error('Invalid handler invocation');
  }

  try {
    if (event.fieldName === 'getUploadDocumentAccess') {
      const {
        mimetype,
        dirname,
        entityType,
        filename,
        username,
        ttl,
        tags,
        expiry = 3600,
      } = event.arguments.params as UploadDocumentAccessInput;

      const args = {
        mimetype,
        dirname,
        entityType,
        filename,
        username,
        ...(ttl && { ttl }),
        ...(tags && { tags }),
      };

      const presignedParams = {
        method: 'putObject',
        bucket: DOCUMENT_STORE_BUCKET_NAME,
        contentType: mimetype,
        expiry,
        key: createS3ObjectKey(args),
        metadata: createMetadata(args as S3ObjectKeyInput, 'headers') as Record<
          string,
          string
        >,
      };

      console.debug({ presignedParams, metadata: presignedParams.metadata });

      return {
        __typename: 'UploadDocumentAccess',
        metadataHeaders: JSON.stringify(presignedParams.metadata),
        signedUrl: await getPresignedUrl(
          presignedParams as GetPresignedUrlParams,
        ),
      };
    } else if (event.fieldName === 'getDownloadDocumentAccess') {
      const {
        dirname,
        filename,
        username,
        version,
        expiry = 3600,
      } = event.arguments.params as DownloadDocumentAccessInput;

      const validatedKey = await getValidatedS3ObjectKey(
        {
          dirname,
          filename,
          username,
        },
        DOCUMENT_INDEX_TABLE,
      );

      if (!validatedKey)
        throw new Error('Document not found or access denied.');

      const getPresignedUrlParams = {
        method: 'getObject',
        bucket: DOCUMENT_STORE_BUCKET_NAME,
        key: validatedKey,
        expiry,
        versionId: version,
      };

      console.debug({ getPresignedUrlParams });

      return {
        __typename: 'DownloadDocumentAccess',
        signedUrl: await getPresignedUrl(
          getPresignedUrlParams as GetPresignedUrlParams,
        ),
      };
    }
  } catch (error) {
    console.error(error);
    throw error; // Re-throw to ensure errors are properly propagated
  }
};
