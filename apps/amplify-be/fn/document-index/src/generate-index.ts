import {
  HeadObjectCommand,
  HeadObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  CreateDocumentIndexInput,
  EntityType,
  StorageClass as StorageClassEnum,
} from '@paycode-customer-v2/graphql/dist/cjs';
import {
  UploadDocumentMetadata,
  extractMetadataFromHeaders,
  isValidUploadDocumentMetadata,
} from '@paycode-customer-v2/lib';
import { S3EventRecord } from 'aws-lambda';
import path from 'path';

/**
 * Generates a DocumentIndexInput object from an S3 event record.
 * @param {S3EventRecord} record - The S3 event record.
 * @returns {DocumentIndexInput} The generated DocumentIndexInput object.
 */
export async function generateDocumentIndex(
  record: S3EventRecord,
): Promise<CreateDocumentIndexInput> {
  const s3Client = new S3Client({});
  const { bucket, object } = record.s3;

  const decodedKey = decodeURIComponent(object.key.replace(/\+/g, ' '));

  const headObjectCommand = new HeadObjectCommand({
    Bucket: bucket.name,
    Key: decodedKey,
  });

  //@ts-ignore description: aws types assume metadata but the s3 event object clearly has Metadata
  const { StorageClass, Metadata: metadataHeaders } =
    await s3Client.send(headObjectCommand);

  const metadata = extractMetadataFromHeaders(metadataHeaders);
  console.debug({ metadata, metadataHeaders });
  if (!isValidUploadDocumentMetadata(metadata)) {
    throw new Error('Invalid object metadata');
  }
  metadata as UploadDocumentMetadata;

  const documentIndex = {
    ...metadata,
    //TODO entity types validation
    entityType: metadata.entityType as EntityType,
    //additional metadata
    bucketName: bucket.name,
    extension: path.extname(object.key).substring(1),
    eTag: object.eTag,
    key: decodedKey,
    size: object.size,
    version: object.versionId || 'N/A',
    ...(StorageClass && { storageClass: StorageClass as StorageClassEnum }),
  };
  //@ts-ignore
  return documentIndex;
}
