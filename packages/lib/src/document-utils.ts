import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Case } from 'change-case-all';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommandInput,
} from '@aws-sdk/client-s3';

export interface S3ObjectKeyInput {
  dirname: string;
  filename: string;
  username: string;
}

export interface UploadDocumentMetadata extends S3ObjectKeyInput {
  mimetype: string;
  entityType: string;
  tags?: string[];
  ttl?: number;
}

export interface DownloadDocumentKeys extends S3ObjectKeyInput {
  version?: string;
}
/**
 * Checks if the provided document metadata is valid.
 * @param metadata - The document metadata to validate.
 * @returns A boolean indicating whether the metadata is valid or not.
 */
export const isValidUploadDocumentMetadata = (
  metadata: unknown,
): metadata is UploadDocumentMetadata => {
  // First, ensure metadata is an object
  if (typeof metadata !== 'object' || metadata === null) return false;

  // Type assertion to access properties
  const meta = metadata as Partial<UploadDocumentMetadata>;

  // Check if required fields are of type 'string' and not empty
  const isValidStrings = [
    'mimetype',
    'dirname',
    'entityType',
    'filename',
    'username',
    //@ts-ignore description: should
  ].every(field => typeof meta[field] === 'string' && meta[field] !== '');

  // Validate tags if present, should be an array of strings
  const isValidTags =
    !meta.tags ||
    (Array.isArray(meta.tags) &&
      meta.tags.every(tag => typeof tag === 'string'));

  // TTL can be a number, null, or undefined
  const isValidTtl =
    typeof meta.ttl === 'number' || meta.ttl === null || meta.ttl === undefined;

  return isValidStrings && isValidTags && isValidTtl;
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
  args: DownloadDocumentKeys,
  tableName: string,
): Promise<string | null> => {
  const key = createS3ObjectKey(args as S3ObjectKeyInput);
  console.log({
    args,
    tableName,
  });

  const { Item } = await ddbDocClient.send(
    new GetCommand({
      TableName: tableName,
      Key: { key, username: args.username },
      ProjectionExpression: 'username, dirname, filename',
    }),
  );

  if (Item) {
    let isExpectedDocument =
      Item.username === args.username &&
      Item.dirname === args.dirname &&
      Item.filename === args.filename;
    if (args.version) {
      isExpectedDocument = isExpectedDocument && Item.version === args.version;
    }

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
  metadata: Partial<UploadDocumentMetadata>,
  mode: 'metadata' | 'headers' = 'metadata',
): UploadDocumentMetadata | Record<string, string> => {
  if (!isValidUploadDocumentMetadata(metadata)) {
    throw new Error('Invalid metadata provided');
  }
  const { mimetype, dirname, filename, entityType, username, ttl, tags } =
    metadata;

  // Note: No change needed for handling arrays in header mode due to toString() behavior
  const formattedMetadata = {
    mimetype,
    dirname,
    filename,
    entityType,
    username,
    ...(ttl && { ttl }),
    ...(tags && { tags: tags.toString() }),
  };

  if (mode !== 'metadata' && mode !== 'headers')
    throw new Error('Invalid mode provided');

  if (mode === 'headers') {
    //Metadata handling will lower case the keys so to preserve the casing during extraction, kebab case it
    return Object.entries(formattedMetadata)
      .map(([key, value]: [string, unknown]) => ({
        [Case.kebab(key)]: value?.toString(),
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Record<
      string,
      string
    >;
  }
  return formattedMetadata as UploadDocumentMetadata;
};

/**
 * Extracts and transforms metadata from S3 object headers.
 * @param {Record<string, string> | undefined} Metadata - The S3 object metadata.
 * @returns {UploadDocumentMetadata | undefined} - Transformed metadata.
 */
export function extractMetadataFromHeaders(
  Metadata: Record<string, string> | undefined,
): UploadDocumentMetadata | undefined {
  //! Assumes the metadata headers are all strings except for ttl which is a number.
  if (!Metadata) return undefined;

  const extractedMetadata: Partial<UploadDocumentMetadata> = {};

  Object.entries(Metadata).forEach(([key, value]) => {
    // Normalize key to camelCase to preserve original casing scheme
    const normalizedKey = Case.camel(
      key.startsWith('x-amz-meta-') ? key.substring(11) : key,
    );

    if (normalizedKey === 'ttl') {
      extractedMetadata[normalizedKey] = parseInt(value, 10);
    } else {
      //@ts-ignore description: will be validated
      extractedMetadata[normalizedKey] = value;
    }
  });

  if (extractedMetadata.tags && typeof extractedMetadata.tags === 'string') {
    extractedMetadata.tags = (extractedMetadata.tags as string).split(',');
  }

  return extractedMetadata as UploadDocumentMetadata;
}

/**
 * Creates an S3 object key based on the provided arguments.
 * @param args - The input arguments for creating the S3 object key.
 * @returns The generated S3 object key.
 */
export const createS3ObjectKey = (args: S3ObjectKeyInput): string => {
  return `${args.username}/${args.dirname}/${args.filename}`;
};

/**
 * Retrieves the S3 object key for a document based on the provided arguments and table name.
 * @param args - The input arguments for the document key.
 * @param tableName - The name of the table where the document is stored.
 * @returns A Promise that resolves to the S3 object key of the document, or null if it cannot be determined.
 */
export const getS3ObjectKey = async (
  args: DownloadDocumentKeys,
  tableName: string,
): Promise<string | null> => {
  return getValidatedS3ObjectKey(args, tableName);
};

export interface GetPresignedUrlParams {
  method: 'getObject' | 'putObject';
  bucket: string;
  contentType?: string;
  key: string;
  expiry: number;
  versionId?: string; // Optional version ID for getObject
  metadata?: Record<string, string>; // Optional metadata for putObject
}

/**
 * Generates a signed URL for accessing an S3 object or uploading an object to S3.
 * @param params - The parameters for generating the signed URL.
 * @returns A Promise that resolves to the signed URL.
 */
export const getPresignedUrl = async (
  params: GetPresignedUrlParams,
): Promise<string> => {
  const s3Client = new S3Client({ region: process.env.REGION });

  let command;
  if (params.method === 'getObject') {
    // Include versionId conditionally for getObject
    const getObjectParams: GetObjectCommandInput = {
      Bucket: params.bucket,
      Key: params.key,
      ...(params.versionId && { VersionId: params.versionId }),
    };
    command = new GetObjectCommand(getObjectParams);
  } else if (params.method === 'putObject') {
    const commandInput: PutObjectCommandInput = {
      Bucket: params.bucket,
      Key: params.key,
      Metadata: params.metadata,
      //@ts-ignore description:it should exist
      ContentType: params?.contentType,
    };
    command = new PutObjectCommand(commandInput);
    // console.debug({ command, metadata });
  } else {
    throw new Error('Unsupported method provided');
  }

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: params.expiry,
  });
  return signedUrl;
};
export interface UploadDocumentWithPresignedUrlParams {
  signedUrl: string;
  metadataHeaders: Record<string, string>;
  contentType?: string;
  content: string;
}

/**
 * Uploads a document to a pre-signed URL with the specified parameters.
 * @param params - The parameters for uploading the document.
 * @returns A Promise that resolves to the response of the upload operation.
 */
export async function uploadDocumentWithPresignedUrl(
  params: UploadDocumentWithPresignedUrlParams,
): Promise<Response> {
  const { signedUrl, metadataHeaders, content, contentType } = params;

  const uploadResult = await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      ...metadataHeaders,
      'Content-Type': contentType || 'application/octet-stream',
    },
    body: content,
  });

  return uploadResult;
}

/**
 * Fetches a document using a pre-signed URL.
 *
 * @param downloadUrl - The URL to download the document from.
 * @returns A Promise that resolves to the fetched document.
 * @throws If there is an error fetching the document.
 */
export async function fetchDocumentWithPresignedUrl(
  downloadUrl: string,
): Promise<unknown> {
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.statusText}`);
    }

    // Automatically handle content based on the response's Content-Type header
    const mimetype = response.headers.get('Content-Type');
    if (mimetype?.includes('application/json')) {
      return await response.json();
    } else if (mimetype?.includes('text')) {
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
