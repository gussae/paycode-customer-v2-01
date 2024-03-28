/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getDocumentIndex,
  listDocumentIndexes,
  getDownloadDocumentAccess,
  getUploadDocumentAccess,
  DownloadDocumentAccessInput,
  UploadDocumentAccessInput,
  UploadDocumentAccess,
  DownloadDocumentAccess,
  RemoveDocumentInput,
  removeDocument,
  S3Operation,
  RemoveDocumentResponse,
} from '@paycode-customer-v2/graphql/dist/cjs';
import { generateClient } from 'aws-amplify/api';

export async function listDocuments({ username }: { username: string }) {
  const client = generateClient();
  const { data } = await client.graphql({
    query: listDocumentIndexes,
    variables: { username },
  });
  return data.listDocumentIndexes.items;
}

export async function fetchDocumentIndex({
  username,
  key,
}: {
  username: string;
  key: string;
}) {
  const client = generateClient();
  const { data } = await client.graphql({
    query: getDocumentIndex,
    variables: { username, key },
  });
  return data.getDocumentIndex;
}

//?note that there are a upload and download document functions (upload|fetchDocumentWithPresignedUrl) in the lib developed primarily for the backend use as they are used in testing and leverage a backend (signed + node fetch) gql call. Here we use Amplify client as these functions are destined for the browser

export type UploadDocumentParams = UploadDocumentAccessInput & {
  content: Blob | string;
};

export type DownloadDocumentParams = DownloadDocumentAccessInput;

export async function uploadDocument(
  params: UploadDocumentParams,
): Promise<Boolean> {
  console.debug(9820, { params });
  try {
    const {
      content,
      dirname,
      entityType,
      expiry,
      filename,
      mimetype,
      ttl,
      username,
    } = params;
    const client = generateClient();

    const { data } = await client.graphql({
      query: getUploadDocumentAccess,
      variables: {
        params: {
          dirname,
          filename,
          entityType,
          expiry,
          mimetype,
          operation: S3Operation.PUT,
          ttl,
          username,
        },
      },
    });

    const response = data.getUploadDocumentAccess as UploadDocumentAccess;
    console.debug(9821, { uploadDocumentAccessResponse: response });
    const { signedUrl, metadataHeaders } = response;
    if (!signedUrl || !metadataHeaders)
      throw new Error('Failed to get signed url');

    const fetchResponse = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        ...JSON.parse(metadataHeaders),
        'Content-Type': mimetype,
      },
      body:
        typeof content === 'string'
          ? new Blob([content], { type: mimetype })
          : content,
    });
    console.debug(9822, { fetchResponse: fetchResponse });
    return fetchResponse.ok;
  } catch (e) {
    console.error(9823, { error: e });
    return false;
  }
}

export async function downloadDocument(
  params: DownloadDocumentParams,
): Promise<string | null> {
  console.debug(9831, { params });

  try {
    const { dirname, expiry, filename, username, version } = params;

    const client = generateClient();
    //TODO some typing issue: temp fix here
    let _version = null;
    if (version && version !== 'N/A') _version = version;

    const { data } = await client.graphql({
      query: getDownloadDocumentAccess,
      variables: {
        params: {
          dirname,
          expiry,
          filename,
          username,
          operation: S3Operation.GET,
          version: _version,
        },
      },
    });
    console.debug(9832, { data: data });
    if (!data.getDownloadDocumentAccess)
      throw new Error('Failed to get download document access');
    return (data.getDownloadDocumentAccess as DownloadDocumentAccess).signedUrl;
  } catch (e) {
    console.error(9833, { error: e });
    return null;
  }
}

export async function deleteDocument(
  params: RemoveDocumentInput,
): Promise<boolean> {
  console.debug(9841, { params });
  try {
    const { dirname, filename, username, versionId } = params;
    //TODO some typing issue: temp fix here
    let _versionId = null;
    if (versionId && versionId !== 'N/A') _versionId = versionId;

    const client = generateClient();
    const { data } = await client.graphql({
      query: removeDocument,
      variables: {
        params: {
          dirname,
          filename,
          username,
          versionId: _versionId,
        },
      },
    });
    if (!data.removeDocument) throw new Error('Failed to delete document');
    return (data.removeDocument as RemoveDocumentResponse).success;
  } catch (e) {
    console.error(9842, { error: e });
    return false;
  }
}
