//?Note that you can dynamically determine the repoName and repoUser from within github workflow. However,  you still need an account number to construct the github access role name, which by convention follows `${ROLE_PREFIX}-${githubUsername}-${githubRepoName}-${account}-${deploymentEnv}`
//this will force you to configure your system deliberately within the .monorepo.config.json tying {githubUsername, githubRepoName, account, env} as a unique namespace for your end to end deployment needs. Note that region is avoided b/c not all AWS resources, including IAM roles are regional (it is global). This said, stack names (CFN is regional ) can use regional namespace to avoid name collision but not for IAM roles.
// access.js

//! DO NOT use packages that require build as this will run before the build in CI/CD
const { getMonorepoConfig } = require('@paycode-customer-v2/config');
const ROLE_PREFIX = 'GitHubAwsOidc';

function extractRepoDetails(repoUrl) {
  const regex = /https:\/\/github\.com\/(.+)\/(.+)/;
  const matches = regex.exec(repoUrl);
  if (!matches) {
    throw new Error('Invalid repository URL');
  }
  return { username: matches[1], repoName: matches[2]?.split('.')[0] };
}

function constructRoleArn(rolePrefix, username, repoName, account, deploymentEnv) {
  const roleName = `${rolePrefix}-${username}-${repoName}-${account}-${deploymentEnv}`;
  return `arn:aws:iam::${account}:role/${roleName}`;
}

getMonorepoConfig()
  .then(config => {
    const {
      deploymentConfig: { account, region, repo, deploymentEnv },
      externalInfraConfig: { githubAwsOidcRolePrefix: ROLE_PREFIX}
    } = config;
    const { username, repoName } = extractRepoDetails(repo);

    if (!account || !repo) {
      //! this can be deliberate effort to avoid CI/CD in the specific branch, so it will just need to be handled without an error (note that, it could also be a misconfiguration, but then you would have other errors somewhere else in the whole build and you should know about it
    }
    console.log(111, {
      account: account,
      deploymentEnv,
      region,
      repo: repo,
      username,
      repoName,
    });

    //using $GITHUB_OUTPUT
    if (account && username && repoName) {
      const roleArn = constructRoleArn(
        ROLE_PREFIX,
        username,
        repoName,
        account,
        deploymentEnv,
      );
      console.log(`roleArn=${roleArn}`);
      console.log(`region=${region}`);
      console.log('roleAvailable=true');
    } else {
      console.log('roleAvailable=false');
    }
  })
  .catch(e => {
    console.error('Failed to generate outputs:', e);
    process.exit(1);
  });
