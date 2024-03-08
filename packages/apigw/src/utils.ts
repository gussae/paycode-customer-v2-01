import './polyfills';
import {
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

export const getCurrentUserToken = (
  awsUserPoolId: string,
  awsUserPoolsWebClientId: string,
): Promise<string | undefined> => {

  const userPool = new CognitoUserPool({
    UserPoolId: awsUserPoolId,
    ClientId: awsUserPoolsWebClientId,
  });

  return new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser != null) {
      currentUser.getSession(
        (err: Error, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
            return;
          }
          const idToken = session?.getIdToken().getJwtToken();
          console.log(77828, idToken)
          resolve(idToken);
        },
      );
    } else {
      reject('No current user');
    }
  });
};

// New function to inject token into headers
export const getCognitoAuthHeader = async (
  awsUserPoolId: string,
  awsUserPoolsWebClientId: string,
): Promise<Record<string, string>> => {
  try {
    const token = await getCurrentUserToken(
      awsUserPoolId,
      awsUserPoolsWebClientId,
    );
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    throw new Error(`Error getting user token: ${error}`);
  }
};
