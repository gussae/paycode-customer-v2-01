/* eslint-disable @typescript-eslint/no-explicit-any */
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { getProxyApiAdapter } from './cognito-auth-api-adapter';
import * as utils from './utils';
import path from 'path';

//!TODO  This is failing b/c of some jest configuration issue =>fix
//!TODO Remove after test
const Username = 'behailu.yilma@gmail.com';
const Password = '28x!hMV7SaXc#Nq';

const UserPoolId = 'us-west-2_37luWeyxV';
const ClientId = '7tk0boii48984cjog7pqv8u5vl';
const apiId = 'ut8cv58qie';

//! jest has issues with dynamic imports from OS temp folders
process.env.TEST_API_TS_MODULE_PATH = '../client/API.js';
process.env.TEST_API_TS_DIR = './client';

// Jest setup for mocking getCurrentUserToken
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  getCurrentUserToken: jest.fn(),
}));

// Function to sign in and get a token from Cognito
async function signInAndGetToken() {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username,
      Password,
    },
  );

  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId,
    ClientId,
  });

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: Username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result.getIdToken().getJwtToken()),
      onFailure: err => reject(err),
    });
  });
}

describe('API Adapter with Authenticated Session', () => {
  beforeAll(async () => {
    const token = await signInAndGetToken();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    utils.getCurrentUserToken.mockImplementation(() => Promise.resolve(token));
  });

  it('should use the authenticated token for API calls', async () => {
    const adapter = await getProxyApiAdapter({
      apiId,
      awsUserPoolsId: UserPoolId,
      awsUserPoolsWebClientId: ClientId,
      apiStageName: 'prod',
      apiWorkspaceRoot: path.resolve(__dirname, '../../../apps/paycode-proxy/'),
      region: 'us-west-2',
    });

    expect(utils.getCurrentUserToken).toHaveBeenCalled();
    adapter
      .getBalance({ username: 'testUserUsername' })
      .then((data: unknown) => {
        console.log({data});
        expect(data).toBeDefined();
        expect(data).toHaveProperty('balance');
        expect((data as any).balance).toBeInstanceOf(Number);
      })
      .catch(console.error);
  }, 100000);
});
