import { S3 } from '@aws-sdk/client-s3';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import {
  Document,
  DocumentKeyInput,
} from '@paycode-customer-v2/graphql/dist/esm';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export type DocumentMetadata = Omit<
  Document,
  | '__typename'
  | 'createdAt'
  | 'key'
  | 'updatedAt'
  | 'user'
  | 'userDocumentUsername'
>;

/**
 * Checks if the provided document metadata is valid.
 * @param metadata - The document metadata to validate.
 * @returns A boolean indicating whether the metadata is valid or not.
 */
export const isValidDocumentMetadata = (
  metadata: Partial<DocumentMetadata>,
): metadata is DocumentMetadata => {
  return (
    typeof metadata.username === 'string' &&
    typeof metadata.filename === 'string' &&
    typeof metadata.extension === 'string' &&
    typeof metadata.dirname === 'string' &&
    typeof metadata.size === 'number' &&
    typeof metadata.type === 'string' &&
    (typeof metadata.version === 'string' || metadata.version === undefined) &&
    (typeof metadata.ttl === 'number' ||
      metadata.ttl === null ||
      metadata.ttl === undefined)
  );
};

const ddbClient = new DynamoDBClient({ region: process.env.REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

/**
 * Retrieves a validated S3 object key from the specified table.
 *
 * @param args - The input arguments for the document key.
 * @param tableName - The name of the table to retrieve the document from.
 * @returns A promise that resolves to the validated S3 object key, DocumentStatus, or null.
 */
export const getValidatedS3ObjectKey = async (
  args: DocumentKeyInput,
  tableName: string,
): Promise<string | null> => {
  const key = createS3ObjectKey(args);

  const { Item } = await ddbDocClient.send(
    new GetCommand({
      TableName: tableName,
      Key: { key },
      ProjectionExpression: 'username, dirname, filename, status',
    }),
  );

  if (Item) {
    const isExpectedDocument =
      Item.username === args.username &&
      Item.dirname === args.dirname &&
      Item.filename === args.filename;

    if (isExpectedDocument) {
      return key;
    }
  }

  return null;
};

/**
 * Creates metadata for a document.
 * @param metadata - The partial document metadata.
 * @param mode - The mode for creating metadata. Default is "metadata".
 * @returns The created document metadata or a record of metadata headers.
 * @throws Error if the provided metadata is invalid.
 */
export const createMetadata = (
  metadata: Partial<DocumentMetadata>,
  mode: 'metadata' | 'headers' = 'metadata',
): DocumentMetadata | Record<string, string> => {
  if (!isValidDocumentMetadata(metadata)) {
    throw new Error('Invalid metadata provided');
  }

  const formattedMetadata = {
    filename: metadata.filename!,
    extension: metadata.extension!,
    dirname: metadata.dirname!,
    size: metadata.size!,
    type: metadata.type!,
    ttl: metadata.ttl,
    username: metadata.username!,
    version: metadata.version || '',
  };
  if (mode !== 'metadata' && mode !== 'headers')
    throw new Error('Invalid mode provided');

  if (mode === 'headers') {
    const headers: Record<string, string> = {};
    Object.entries(formattedMetadata).forEach(([key, value]) => {
      // Prefix with 'x-amz-meta-' for S3 metadata headers, omitting undefined values
      if (value !== undefined) {
        headers[`x-amz-meta-${key}`] = value?.toString() || 'Invalid_Metadata';
      }
    });
    return headers;
  }

  return formattedMetadata;
};
/**
 * Creates an S3 object key based on the provided arguments.
 * @param args - The input arguments for creating the S3 object key.
 * @returns The generated S3 object key.
 */
export const createS3ObjectKey = (args: DocumentKeyInput): string => {
  return `${args.username}/${args.dirname}/${args.filename}`;
};

/**
 * Retrieves the S3 object key for a document based on the provided arguments and table name.
 * @param args - The input arguments for the document key.
 * @param tableName - The name of the table where the document is stored.
 * @returns A Promise that resolves to the S3 object key of the document, or null if it cannot be determined.
 */
export const getS3ObjectKey = async (
  args: DocumentKeyInput,
  tableName: string,
): Promise<string | null> => {
  return getValidatedS3ObjectKey(args, tableName);
};

/**
 * Retrieves metadata from an S3 object.
 * @param bucketName - The name of the S3 bucket.
 * @param objectKey - The key of the S3 object.
 * @returns A promise that resolves to the metadata of the S3 object, or null if the object does not exist.
 */
export const getMetadataFromS3Object = async (
  bucketName: string,
  objectKey: string,
): Promise<DocumentMetadata | null> => {
  const s3Client = new S3({});
  const response = await s3Client.headObject({
    Bucket: bucketName,
    Key: objectKey,
  });

  if (response.Metadata) {
    // Provide fallback values or handle undefined cases
    return {
      filename: response.Metadata['filename'] || '',
      extension: response.Metadata['extension'] || '',
      dirname: response.Metadata['dirname'] || '',
      size: response.Metadata['size']
        ? parseInt(response.Metadata['size'], 10)
        : 0,
      type: response.Metadata['type'] || '',
      ttl: response.Metadata['ttl']
        ? parseInt(response.Metadata['ttl'], 10)
        : null,
      username: response.Metadata['username'] || '',
      version: response.Metadata['version'] || '',
    };
  } else {
    return null;
  }
};

export interface UploadDocumentWithSignedUrlParams {
  signedUrl: string;
  metadataHeaders: Record<string, string>;
  content: string;
}
export async function uploadDocumentWithSignedUrl(
  params: UploadDocumentWithSignedUrlParams,
): Promise<Response> {
  // Construct metadata headers
  const { signedUrl, metadataHeaders, content } = params;
  console.debug({ signedUrl, metadataHeaders });
  const uploadResult = await fetch(signedUrl, {
    method: 'PUT',
    headers: metadataHeaders,
    body: content,
  });

  return uploadResult;
}

/**
 * Fetches a document from AWS S3 using a signed URL and automatically handles
 * the content type of the response.
 *
 * @param {string} downloadUrl - The signed URL provided for the document download.
 * @returns {Promise<unknown>} - A promise that resolves with the document content.
 *                            The content type is automatically handled.
 */
export async function fetchDocumentWithSignedUrl(downloadUrl: string): Promise<unknown> {
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.statusText}`);
    }

    // Automatically handle content based on the response's Content-Type header
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      return await response.json();
    } else if (contentType?.includes('text')) {
      return await response.text();
    } else {
      //default
      return await response.blob();
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error; // Re-throw
  }
}

