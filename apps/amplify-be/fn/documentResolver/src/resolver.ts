import {
  getSignedUrl,
  getValidatedS3ObjectKey,
  createS3ObjectKey,
  createMetadata,
} from '@paycode-customer-v2/lib';
import {
  DocumentKeyInput,
  UploadDocumentInput,
} from '@paycode-customer-v2/graphql/dist/cjs';

// Environment variables checks
if (
  !process.env.STORAGE_DOCUMENTSTORE_BUCKETNAME ||
  !process.env.API_PAYCODEGQL_DOCUMENTTABLE_NAME
) {
  throw new Error(
    'Missing environment variable for document store bucket name or document table name.',
  );
}

const BUCKET = process.env.STORAGE_DOCUMENTSTORE_BUCKETNAME;
const TABLE = process.env.API_PAYCODEGQL_DOCUMENTTABLE_NAME;
const DOWNLOAD_SIGN_URL_EXPIRY = Number(
  process.env.DOWNLOAD_SIGN_URL_EXPIRY || 300,
);
const UPLOAD_SIGN_URL_EXPIRY = Number(
  process.env.UPLOAD_SIGN_URL_EXPIRY || 300,
);

/**
 * Generates a signed URL for downloading a document.
 * Checks if the document exists and is active before generating the URL.
 * @param args - Contains the username, partition, and filename of the document to download.
 * @returns A promise resolved with the signed URL or an error message.
 */
export const downloadDocument = async (args: DocumentKeyInput) => {
  const keyOrStatus = await getValidatedS3ObjectKey(args, TABLE);

  if (!keyOrStatus || typeof keyOrStatus !== 'string') {
    return {
      statusCode: keyOrStatus === null ? 404 : 403,
      body: JSON.stringify({
        error: `Document ${keyOrStatus === null ? 'not found' : 'not active'}`,
      }),
    };
  }

  //? No mutation to the document. However, you can implement some such as incrementing view count, updating TTL, etc. That is the reason the downloadDocument is considered a mutation

  const downloadUrl = await getSignedUrl({
    method: 'getObject',
    bucket: BUCKET,
    key: keyOrStatus,
    expiry: DOWNLOAD_SIGN_URL_EXPIRY,
  });

  return { statusCode: 200, body: JSON.stringify({ downloadUrl }) };
};

/**
 * Handles the upload of a new document, generating a signed URL for the operation.
 * It now also includes generating metadata for the document using the `createMetadata` function
 * and inserting this metadata into the S3 object's metadata. Assumes document metadata will be
 * saved upon successful upload via a separate mechanism (e.g., S3 trigger).
 * @param args - Contains information about the document to upload.
 * @returns A promise resolved with the signed URL for uploading the document and its metadata.
 */
export const uploadDocument = async (args: UploadDocumentInput) => {
  const key = createS3ObjectKey({
    username: args.username,
    partition: args.partition,
    filename: args.filename,
  });
  const signedUrl = await getSignedUrl({
    method: 'putObject',
    bucket: BUCKET,
    key,
    expiry: UPLOAD_SIGN_URL_EXPIRY,
    metadataHeaders: createMetadata(args, "headers") as unknown as Record<string, string>,
  });
  return {
    statusCode: 200,
    //@ts-ignore
    body: JSON.stringify({ signedUrl, metadataHeaders: createMetadata(args) }),
  };
};
