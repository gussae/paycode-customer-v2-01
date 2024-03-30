const { writeFile } = require('fs').promises;
const { aws_user_files_s3_bucket } = require('../../src/amplifyconfiguration.json');

const env = {
  PAYCODE_DOCUMENT_STORE_BUCKET_NAME: aws_user_files_s3_bucket,
};

writeFile('./src/.env.json', JSON.stringify(env));
