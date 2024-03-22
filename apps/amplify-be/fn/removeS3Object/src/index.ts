/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_DOCUMENTSTORE_BUCKETNAME
Amplify Params - DO NOT EDIT */
import { DynamoDBStreamEvent, DynamoDBRecord } from 'aws-lambda';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const s3Client = new S3Client({ region: process.env.REGION });

if (!process.env.STORAGE_DOCUMENTSTORE_BUCKETNAME)
  throw new Error('STORAGE_DOCUMENTSTORE_BUCKETNAME is not set');

/**
 * Handler for DynamoDB Stream events to delete objects from S3 based on deletion events in DynamoDB.
 * @param event - The DynamoDB Stream event.
 */
export const handler = async (event: DynamoDBStreamEvent) => {
  for (const record of event.Records) {
    try {
      if (record.eventName === 'REMOVE') {
        const oldImage = record.dynamodb?.OldImage;
        if (!oldImage) continue;

        //@ts-ignore
        const document = unmarshall(oldImage );
        const key: string = document.key;
        const version: string = document.version;

        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.STORAGE_DOCUMENTSTORE_BUCKETNAME,
            Key: key,
            ...(version && { VersionId: version }),
          }),
        );

        console.log(
          `Successfully deleted S3 object ${key}${version ? ` with version ${version}` : ''}`,
        );
      }
    } catch (error) {
      console.error('Error deleting document from S3:', error);
      // Consider adding more error handling logic here
    }
  }
};
