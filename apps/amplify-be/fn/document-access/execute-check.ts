//? NB documentIndex is not directly testable with the execute check as it's event driven and you would need to orchestrate many things to simulate that ...however, if you run this execute check, you will also able to test it indirectly
import { getMonorepoConfig } from '@paycode-customer-v2/config';
import { executeCheckLambda } from '@paycode-customer-v2/utils';
import {
  fetchDocumentWithPresignedUrl,
  uploadDocumentWithPresignedUrl,
} from '@paycode-customer-v2/lib';

const documentTable = 'DocumentIndex-fc4ki34qcjc6zfhzy6bjp65hvm-dev';

getMonorepoConfig(__dirname)
  .then(config =>
    executeCheckLambda({
      deploymentEnv: config.deploymentConfig?.deploymentEnv,
      profile: config.deploymentConfig?.profile,
      region: config.deploymentConfig?.region,
      projectRoot: __dirname,
      envars: {
        API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME: documentTable,
        ENV: 'dev',
      },
      event: {
        fieldName: 'getUploadDocumentAccess',
        arguments: {
          params: {
            mimetype: 'text/plain',
            dirname: 'test/partition',
            entityType: 'RECEIPT',
            filename: 'test-document.txt',
            username: 'tester',
            operation: 'PUT',
            ttl: 3600,
          },
        },
      },
    }),
  )
  .then(data => {
    //@ts-ignore
    const { signedUrl, metadataHeaders } = data;
    const content = `This is a test document: ${new Date().toISOString()}`;
    return uploadDocumentWithPresignedUrl({
      signedUrl,
      metadataHeaders: JSON.parse(metadataHeaders),
      content,
      contentType: 'text/plain',
    });
  })
  .then(uploadResponse => {
    console.debug({ uploadResponse });
    if (uploadResponse.ok) {
      console.log('Document uploaded successfully');
      //? Delay liberally for the S3 PUT event to trigger documentIndex and create index in the table (or else the fetch will not be be able to validate the document exists in the table )
      return new Promise(resolve => setTimeout(resolve, 10000));
    } else {
      throw new Error(
        `Failed to upload document: ${uploadResponse.statusText}`,
      );
    }
  })
  .then(() => getMonorepoConfig(__dirname))
  .then(config =>
    executeCheckLambda({
      deploymentEnv: config.deploymentConfig?.deploymentEnv,
      profile: config.deploymentConfig?.profile,
      region: config.deploymentConfig?.region,
      projectRoot: __dirname,
      envars: {
        API_PAYCODEGQL_DOCUMENTTABLE_NAME: documentTable,
        ENV: 'dev',
      },
      event: {
        fieldName: 'getDownloadDocumentAccess',
        arguments: {
          params: {
            filename: 'test-document.txt',
            dirname: 'test/partition',
            username: 'tester',
            operation: 'GET',
          },
        },
      },
    }),
  )
  .catch(console.error);
