//?Note that while all workspaces should deploy independently, initial deployments require the presence of amplify-be since it manages the cognito user pool. And the Web UI requires the backend APIs (for now paycode proxy to exist) After the initial setup, each workspace in apps and services can be deployed independently.

//! DO NOT use packages that require build as this will run before the build in CI/CD
const { AmplifyClient, ListAppsCommand } = require('@aws-sdk/client-amplify');
const { fromEnv, fromIni } = require('@aws-sdk/credential-providers');
const { getConfigAsync } = require('@paycode-customer-v2/config');
const {
  CloudFormationClient,
  DescribeStacksCommand,
} = require('@aws-sdk/client-cloudformation');

const getCreds = profile => {
  return process.env.CI === 'true' ? fromEnv() : fromIni({ profile });
};

async function checkAmplifyAppExists(appNames, region, profile) {
  const client = new AmplifyClient({
    region,
    credentials: getCreds(profile),
  });
  let nextToken;
  try {
    do {
      const data = await client.send(
        new ListAppsCommand({
          nextToken: nextToken,
        }),
      );
      console.log({ data: data.apps });

      const appExists = data.apps.some(app => appNames.includes(app.name));
      console.log({data})
      console.log({ appExists });
      if (appExists) {
        return true;
      }

      nextToken = data.nextToken;
    } while (nextToken);

    return false;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
async function checkIfStackExists(stackName, region, profile) {
  const client = new CloudFormationClient({
    region,
    credentials: getCreds(profile),
  });

  try {
    const { Stacks } = await client.send(
      new DescribeStacksCommand({ StackName: stackName }),
    );
    return Stacks && Stacks.length > 0;
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Stack does not exist
      return false;
    }
    console.error('An error occurred checking stack:', stackName, error);
    throw error; // Rethrow to handle upstream
  }
}

async function getDeploymentState() {
  //check if amplify exists
  const amplifyBePath = require('path').resolve(
    __dirname,
    '../apps/amplify-be',
  );
  const amplifyBeConfig = await getConfigAsync(amplifyBePath);
  const {
    externalInfraConfig: { amplifyAppNames },
    deploymentConfig: { region, profile },
  } = amplifyBeConfig;

  console.log({amplifyAppNames})
  const isAmplifyExists = await checkAmplifyAppExists(
    amplifyAppNames,
    region,
    profile,
  );

  //check if paycode-proxy exists
  const paycodeProxyPath = require('path').resolve(
    __dirname,
    '../apps/paycode-proxy',
  );
  const paycodeProxyConfig = await getConfigAsync(paycodeProxyPath);
  const { stackNameKebabCase } = paycodeProxyConfig;
  const isPaycodeProxyExists = await checkIfStackExists(
    stackNameKebabCase,
    region,
    profile,
  );
  return { isAmplifyExists, isPaycodeProxyExists };
}

getDeploymentState()
  .then(({ isAmplifyExists, isPaycodeProxyExists }) => {
    console.log(`isAmplifyExists=${isAmplifyExists}`);
    console.log(`isPaycodeProxyExists=${isPaycodeProxyExists}`);
  })
  .catch(console.error);
