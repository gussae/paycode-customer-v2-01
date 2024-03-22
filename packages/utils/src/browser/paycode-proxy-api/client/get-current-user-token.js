import './polyfills';
import { CognitoUserPool, } from 'amazon-cognito-identity-js';
export const getCurrentUserToken = (awsUserPoolId, awsUserPoolsWebClientId) => {
    const userPool = new CognitoUserPool({
        UserPoolId: awsUserPoolId,
        ClientId: awsUserPoolsWebClientId,
    });
    return new Promise((resolve, reject) => {
        const currentUser = userPool.getCurrentUser();
        if (currentUser !== null) {
            currentUser.getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                const idToken = session?.getIdToken().getJwtToken();
                console.log(77828, idToken);
                resolve(idToken);
            });
        }
        else {
            reject('No current user');
        }
    });
};
