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
    if (currentUser !== null) {
      currentUser.getSession(
        (err: Error, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
            return;
          }
          const idToken = session?.getIdToken().getJwtToken();
          console.log(77828, idToken);
          resolve(idToken);
        },
      );
    } else {
      reject('No current user');
    }
  });
};

