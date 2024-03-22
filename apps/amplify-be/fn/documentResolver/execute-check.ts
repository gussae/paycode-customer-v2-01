import { getMonorepoConfig } from '@paycode-customer-v2/config';
import { executeCheckLambda } from '@paycode-customer-v2/utils';
import {
  fetchDocumentWithSignedUrl,
  uploadDocumentWithSignedUrl,
} from '@paycode-customer-v2/lib';

('paycode-customer-v2-document-store172046-dev');
import { aws_user_files_s3_bucket } from '../../src/amplifyconfiguration.json';
//!TODO how export names are generated has changed so you can't pull it from CFN imports till you figure out their hash generator=> do manual import for now

const documentTable = 'Document-dsuweqcczrehzlfuzlzmlhxjf4-dev';

console.log({
  aws_user_files_s3_bucket,
  documentTable,
});
//!This check will fail unless you have a valid document data in the table. Using upload event here does NOT upload the data. Instead, it provides you a signed URL, which u have to use to upload the data!
getMonorepoConfig(__dirname)
  .then(config =>
    executeCheckLambda({
      deploymentEnv: config.deploymentConfig?.deploymentEnv,
      profile: config.deploymentConfig?.profile,
      region: config.deploymentConfig?.region,
      projectRoot: __dirname,
      envars: {
        STORAGE_DOCUMENTSTORE_BUCKETNAME: aws_user_files_s3_bucket,
        API_PAYCODEGQL_DOCUMENTTABLE_NAME: documentTable,
      },
      event: {
        info: {
          fieldName: 'uploadDocument',
        },
        arguments: {
          filename: 'test-document.txt',
          extension: 'txt',
          partition: 'test/partition',
          size: 1000,
          type: 'text/plain',
          username: 'tester',
          version: '1.0',
        },
      },
    }),
  )
  .then(data => {
    //@ts-ignore
    const { signedUrl, metadataHeaders } = JSON.parse(data?.body);
    const content = `This is a test document: ${new Date().toISOString()}`;
    console.log({ signedUrl, metadata: metadataHeaders, content });

    // Return the promise for chaining
    return uploadDocumentWithSignedUrl({
      signedUrl,
      metadataHeaders,
      content,
    });
  })
  .then(uploadResponse => {
    console.debug({ uploadResponse });
    if (uploadResponse.ok) {
      console.log('Document uploaded successfully');
      return getMonorepoConfig(__dirname);
    } else {
      throw new Error(
        `Failed to upload document: ${uploadResponse.statusText}`,
      );
    }
  })
  //! This depends on the backend event orchestration => s3 object put event from uploadDocument => lambda => createDocument mutation on Appsync => DDB => where the downloadDocument is validating the existence of the document!
  .then(config =>
    executeCheckLambda({
      deploymentEnv: config.deploymentConfig?.deploymentEnv,
      profile: config.deploymentConfig?.profile,
      region: config.deploymentConfig?.region,
      projectRoot: __dirname,
      envars: {
        STORAGE_DOCUMENTSTORE_BUCKETNAME: aws_user_files_s3_bucket,
        API_PAYCODEGQL_DOCUMENTTABLE_NAME: documentTable,
      },
      event: {
        info: {
          fieldName: 'downloadDocument',
        },
        arguments: {
          filename: 'test-document.txt',
          partition: 'test/partition',
          username: 'tester',
          //!TODO How would it work with version??
        },
      },
    }),
  )
  .catch(console.error);
