// import { uploadDocumentWithPresignedUrl } from './document-utils';
import { callGqlEndpoint } from './appsync';
import {
  createDocumentIndex,
  CreateDocumentIndexInput,
  EntityType
} from '@paycode-customer-v2/graphql/dist/cjs';

//TODO ...do proper execute check with proper configuration: selected few functions here (many were pre-checked as they were ported from another project, while some are new or updated and yet checked somewhere else, and there are these ones below)

//! u got to get fresh presigned URL
const presignedUrl = 'xxxx';

//! process env
//! u won't have access to the appsync endpoint (only accessible to cognito authorized users)unless you added your username to the amplify/backend/paycodegql/custom-roles.json - this is just for hte dev team
process.env.REGION = 'us-west-2';
process.env.AWS_PROFILE = 'awsist-dev';

// uploadDocumentWithPresignedUrl({
//   signedUrl: presignedUrl,
//   metadataHeaders: { username: 'tester' },
//   contentType: 'text/plain',
//   content: 'test',
// }).then(console.log).catch(console.error)

const createDocumentIndexVariables: { input: CreateDocumentIndexInput } = {
  input: {
    entityType: EntityType.RECEIPT,
    ttl: 3600,
    dirname: 'test/partition',
    filename: 'test-document.txt',
    username: 'tester',
    mimetype: 'text/plain',
    bucketName: 'paycode-customer-v2-document-store153324-dev',
    extension: 'txt',
    eTag: 'ea91ae6eed0c966b31137d961f836091',
    key: 'tester/test/partition/test-document.txt',
    size: 49,
    version: 'N/A',
  },
};
callGqlEndpoint({
  graphqlEndpoint:
    'https://d5huh2itmnanlcexh7zdrf4vzy.appsync-api.us-west-2.amazonaws.com/graphql',
  query: createDocumentIndex,
  variables: createDocumentIndexVariables,
  path: '/graphql',
})
  .then(console.log)
  .catch(console.error);
