import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import dotenv from 'dotenv';
import path from 'path';
import { getPaycodeApiConfig } from './get-paycode-proxy-api-config';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
const { awsUserPoolsId, awsUserPoolsWebClientId } = getPaycodeApiConfig();

const Username = process.env.APP_USERNAME as string;
const Password = process.env.APP_PASSWORD as string;

if (!Username || !Password) {
  throw new Error('Missing required environment variables');
}

export async function getTestToken() {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username,
      Password,
    },
  );

  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: awsUserPoolsId,
    ClientId: awsUserPoolsWebClientId,
  });

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: any) => {
        const jwtToken = session.getIdToken().getJwtToken();
        resolve(jwtToken);
      },
      onFailure: (err: any) => {
        reject(err);
      },
    });
  });
}

//execute check
if (require.main === module)
  getTestToken().then(console.log).catch(console.error);
