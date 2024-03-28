/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_DOCUMENTSTORE_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { AmplifyGraphQlResolverEvent } from 'aws-lambda';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { createS3ObjectKey } from '@paycode-customer-v2/lib/dist/cjs';
import {
  RemoveDocumentInput,
  RemoveDocumentResponse,
} from '@paycode-customer-v2/graphql/dist/cjs';

export const handler = async (
  event: AmplifyGraphQlResolverEvent<{ params: RemoveDocumentInput }>,
): Promise<RemoveDocumentResponse> => {
  const { dirname, filename, username, versionId } = event.arguments.params;
  const s3Client = new S3Client({ region: process.env.REGION });
  const bucketName = process.env.STORAGE_DOCUMENTSTORE_BUCKETNAME;


  try {
    console.debug({
      bucketName,
      dirname,
      filename,
      username,
      versionId,
    })
    const objectKey = createS3ObjectKey({ username, dirname, filename });

    const response = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
        VersionId: versionId || undefined,
      }),
    );
    response.$metadata.httpStatusCode;
    if(response.$metadata.httpStatusCode !== 204) {
      throw new Error('Failed to delete document');
    }

    return {
      __typename: 'RemoveDocumentResponse',
      success: true,
    };
  } catch (error) {
    console.error('Error deleting document:', error);
    return {
      __typename: 'RemoveDocumentResponse',
      success: false,
      message: `Failed to delete document: ${error.message}`,
    };
  }
};
