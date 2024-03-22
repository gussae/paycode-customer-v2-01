const path = require('path');
const util = require('util');
const fs = require('fs/promises');
const changeCase = require('change-case-all');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const { fromIni } = require('@aws-sdk/credential-providers');
const names = require('./names.json');
const exec = util.promisify(require('child_process').exec);
const crypto = require('crypto');

function generateDeploymentNamespace(
  username,
  repoName,
  account,
  deploymentEnv,
) {
  //hashing ns is necessary to preserve the size limitations of stackNames, resourceNames etc.
  const hashSize = 4;
  const hash = stringToHash =>
    crypto
      .createHash('sha256')
      .update(stringToHash)
      .digest('hex')
      .substring(0, hashSize)
      .substring(0, hashSize);
  return {
    deploymentNamespace: hash(
      `${username}-${repoName}-${account}-${deploymentEnv}`,
    ),
    domainNamespace: hash(`${username}-${repoName}`),
  };
}
/**
 * Suppress errors in child processes and silently handle the error to avoid CI interruption.
 * Recursively searches for a .monorepo.config.json file by traversing up the directory hierarchy.
 * @param {string} startPath - The directory path to start the search from.
 * @returns {Promise<{monorepoConfig: Object, __monorepoRoot: string}>} - The monorepo configuration and root path.
 */
async function findMonorepoConfig(startPath) {
  let currentPath = startPath;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const configPath = path.join(currentPath, names.monorepoConfigFilename);

    try {
      // Check if .monorepo.config.json exists at the current path
      await fs.access(configPath);
      const monorepoConfig = JSON.parse(await fs.readFile(configPath, 'utf8'));
      validateMonorepoConfig(monorepoConfig);
      return {
        monorepoConfig,
        __monorepoRoot: currentPath,
      };
    } catch (error) {
      const parentPath = path.dirname(currentPath);
      if (parentPath === currentPath) {
        // Reached the filesystem root without finding the config
        throw new Error(
          '.monorepo.config.json not found in any parent directory.',
        );
      }
      currentPath = parentPath; // Move up the directory tree
    }
  }
}

/**
 * Retrieves the current branch name.
 * @returns {Promise<string|null>} The current branch name, or null if an error occurred.
 */
async function getBranch() {
  try {
    // CI environment - GitHub Actions specifics
    if (process.env.CI === 'true') {
      //rely on envars
      if (process.env.CI_GIT_BRANCH) {
        return process.env.CI_GIT_BRANCH;
      }
      //push events and others
      const ref = process.env.GITHUB_REF;
      if (ref && ref.startsWith('refs/heads/')) {
        return ref.replace('refs/heads/', '');
      }
      //pull request events
      if (process.env.GITHUB_HEAD_REF) {
        return process.env.GITHUB_HEAD_REF;
      }
    }

    const { stdout } = await exec('git rev-parse --abbrev-ref HEAD');
    const branchName = stdout.trim();
    return branchName !== 'HEAD' ? branchName : null;
  } catch (error) {
    console.error('Error getting branch:', error);
    return null;
  }
}

/**
 * Retrieves the URL of the remote repository.
 * @returns {Promise<string>} The URL of the remote repository.
 */
async function getRepoUrl() {
  try {
    if (process.env.CI === 'true' && process.env.CI_REPO_URL) {
      return process.env.CI_REPO_URL;
    }
    const { stdout } = await exec('git remote get-url origin');
    return stdout.trim();
  } catch (error) {
    console.error('Error getting remote URL:', error);
    return '';
  }
}

/**
 * Retrieves the deployment configuration based on the current branch and repository URL.
 * @param {Array} deploymentConfigs - An array of deployment configurations.
 * @returns {Object} - The matching deployment configuration.
 * @throws {Error} - If no matching deployment configuration is found.
 */
async function getDeploymentConfig(deploymentConfigs) {
  try {
    // console.debug('getDeploymentConfig', deploymentConfigs);
    const [branch, repoUrl] = await Promise.all([getBranch(), getRepoUrl()]);
    console.debug('branch:', branch, 'repoUrl:', repoUrl);

    const config = deploymentConfigs.find(
      config => config.branch === branch && repoUrl.includes(config.repo),
    );

    if (!config) {
      throw new Error('No matching deployment configuration found');
    }
    const { account, deploymentEnv, region, repo } = config;
    if (!account || !branch || !deploymentEnv || !region || !repo) {
      throw new Error('Invalid deployment configuration');
    }
    const { repoName, username } = extractRepoDetails(repo);
    const { deploymentNamespace, domainNamespace } =
      generateDeploymentNamespace(username, repoName, account, deploymentEnv);

    return { deploymentNamespace, domainNamespace, ...config };
  } catch (error) {
    console.error('Error in getDeploymentConfig:', error);
    throw error; // Rethrow or handle as needed
  }
}

async function getDomainDeploymentConfigurations() {
  try {
    const [branch, repoUrl] = await Promise.all([getBranch(), getRepoUrl()]);
    const getMonorepoConfig = await findMonorepoConfig(process.cwd());
    const deploymentConfigs =
      getMonorepoConfig.monorepoConfig.infraConfig.deploymentConfig;

    const domainConfigs = deploymentConfigs.filter(config =>
      repoUrl.includes(config.repo),
    );

    if (!domainConfigs.length) {
      throw new Error('No matching deployment configuration found');
    }

    return domainConfigs.map(config => {
      const { account, deploymentEnv, region, repo } = config;
      if (!account || !branch || !deploymentEnv || !region || !repo) {
        throw new Error('Invalid deployment configuration');
      }
      const { repoName, username } = extractRepoDetails(repo);
      const { deploymentNamespace, domainNamespace } =
        generateDeploymentNamespace(username, repoName, account, deploymentEnv);

      return { deploymentNamespace, domainNamespace, ...config };
    });
  } catch (error) {
    console.error('Error in getDomainDeploymentConfigurations:', error);
    throw error; // Rethrow or handle as needed
  }
}

/**
 * Finds the workspace configuration based on the provided workspace root.
 * @param {string} workspaceRoot - The root directory of the workspace.
 * @returns {Promise<object>} - The workspace configuration object.
 */
async function findWorkspaceConfig(workspaceRoot) {
  const wsConfigJsonPath = path.join(
    workspaceRoot,
    names.workspaceConfigFilename,
  );

  try {
    await fs.access(wsConfigJsonPath);
    const wsConfigJson =
      JSON.parse(await fs.readFile(wsConfigJsonPath, 'utf8')) || {};
    validateWsConfig(wsConfigJson);
    return wsConfigJson;
  } catch (error) {
    return {};
  }
}

function extractRepoDetails(repoUrl) {
  const regex = /https:\/\/github\.com\/(.+)\/(.+)/;
  const matches = regex.exec(repoUrl);
  if (!matches) {
    throw new Error('Invalid repository URL');
  }
  return { username: matches[1], repoName: matches[2]?.split('.')[0] };
}

/**
 * Retrieves the deployment configuration based on the current branch and repository URL.
 * @param {Array} deploymentConfigs - An array of deployment configurations.
 * @returns {Promise<Object>} - A promise that resolves to the deployment configuration object.
 */

//TODO! validators generated by copilot , should be verified :works but doesn't mean it works all the time

function validateMonorepoConfig(config) {
  if (typeof config !== 'object' || config === null) {
    throw new Error('Monorepo configuration should be an object.');
  }

  // Validate appConfig structure
  if (!config.appConfig || typeof config.appConfig !== 'object') {
    throw new Error('appConfig is missing or not an object.');
  }
  if (!Array.isArray(config.appConfig.envConfig)) {
    throw new Error('appConfig.envConfig is missing or not an array.');
  }

  // Validate infraConfig structure
  if (!config.infraConfig || typeof config.infraConfig !== 'object') {
    throw new Error('infraConfig is missing or not an object.');
  }
  if (!Array.isArray(config.infraConfig.infraApp)) {
    throw new Error('infraConfig.infraApp is missing or not an array.');
  }
  if (!Array.isArray(config.infraConfig.deploymentConfig)) {
    throw new Error('infraConfig.deploymentConfig is missing or not an array.');
  }

  // Validate infraApp and deploymentConfig entries
  config.infraConfig.infraApp.forEach(app => {
    if (typeof app.name !== 'string') {
      throw new Error(
        'infraApp entry is missing a name or name is not a string.',
      );
    }
    if (!Array.isArray(app.exports)) {
      throw new Error('infraApp entry exports is missing or not an array.');
    }
    if (!Array.isArray(app.imports)) {
      throw new Error('infraApp entry imports is missing or not an array.');
    }
    if (!Array.isArray(app.versions)) {
      throw new Error('infraApp entry versions is missing or not an array.');
    }
  });

  config.infraConfig.deploymentConfig.forEach(deployment => {
    if (typeof deployment.branch !== 'string') {
      throw new Error(
        'deploymentConfig entry is missing a branch or branch is not a string.',
      );
    }
    if (typeof deployment.deploymentEnv !== 'string') {
      throw new Error(
        'deploymentConfig entry is missing a deploymentEnv or deploymentEnv is not a string.',
      );
    }
    //! CI environment may not provide profile
    // if (typeof deployment.profile !== 'string') {
    //   throw new Error(
    //     'deploymentConfig entry is missing a profile or profile is not a string.',
    //   );
    // }
    if (typeof deployment.region !== 'string') {
      throw new Error(
        'deploymentConfig entry is missing a region or region is not a string.',
      );
    }
  });
}

function validateWsConfig(config) {
  if (typeof config !== 'object' || config === null) {
    throw new Error('Workspace configuration should be an object.');
  }

  // Validate 'customSettings' if present
  if (config.customSettings && typeof config.customSettings !== 'object') {
    throw new Error('customSettings should be an object.');
  }

  // Validate 'defaultImports' if present
  if (config.defaultImports && typeof config.defaultImports !== 'object') {
    throw new Error('defaultImports should be an object.');
  }

  // Validate 'infraEnvConfig' if present
  if (config.infraEnvConfig && typeof config.infraEnvConfig !== 'object') {
    throw new Error('infraEnvConfig should be an object.');
  }
  // Further validation for 'infraEnvConfig.cors' array if present
  if (
    config.infraEnvConfig &&
    config.infraEnvConfig.cors &&
    !Array.isArray(config.infraEnvConfig.cors)
  ) {
    throw new Error('infraEnvConfig.cors should be an array.');
  }

  // Validate 'envVars' if present
  if (config.envVars && typeof config.envVars !== 'object') {
    throw new Error('envVars should be an object.');
  }

  // Validate 'deploymentOptions' if present
  if (
    config.deploymentOptions &&
    typeof config.deploymentOptions !== 'object'
  ) {
    throw new Error('deploymentOptions should be an object.');
  }

  // Validate 'paths' if present
  if (config.paths && typeof config.paths !== 'object') {
    throw new Error('paths should be an object.');
  }

  // The function only throws errors if the expected keys are present and do not match the expected types.
  // It does not validate additional keys as per requirements.
  return true;
}

/**
 * Returns an object containing different casing of the stack name based on the provided parameters.
 *
 * @param {string} stackName - The name of the stack.
 * @param {string} ns - The namespace.
 * @param {string} env - The environment.
 * @returns {Object} - An object containing different casing of the stack name.
 */
function getEnvMarkedAndDeploymentNamespacedStackNames(
  stackName,
  ns,
  env,
  casing = '',
) {
  //namespace is not cased:stays the same
  const capEnv = changeCase.capitalCase(env);
  const mappedCasing = {
    stackNamePascalCase: `${changeCase.pascalCase(stackName)}${capEnv}${ns}`,
    stackNameCamelCase: `${changeCase.camelCase(stackName)}${capEnv}${ns}`,
    stackNameSnakeCase: `${changeCase.snakeCase(stackName)}_${env}_${ns}`,
    stackNameKebabCase: `${changeCase.kebabCase(stackName)}-${env}-${ns}`,
    stackNameConstantCase: `${changeCase.constantCase(stackName)}_${changeCase.constantCase(env)}_${ns}`,
  };
  if (!casing) {
    return mappedCasing;
  }
  return mappedCasing[`stackName${changeCase.capitalCase(casing)}`];
}


/**
 * Returns the cased versions of the given app name based on the specified casing.
 * If no casing is provided, it returns an object containing all cased versions.
 *
 * @param {string} appName - The app name to be cased.
 * @param {string} [casing=''] - The desired casing for the app name.
 * @returns {(string|Object)} - The cased app name or an object containing all cased versions.
 */
function getCasedAppNames(appName, casing = '') {
  const mappedCasing = {
    appNamePascalCase: `${changeCase.pascalCase(appName)}`,
    appNameCamelCase: `${changeCase.camelCase(appName)}`,
    appNameSnakeCase: `${changeCase.snakeCase(appName)}`,
    appNameKebabCase: `${changeCase.kebabCase(appName)}`,
    appNameConstantCase: `${changeCase.constantCase(appName)}`,
  };
  if (!casing) {
    return mappedCasing;
  }
  return mappedCasing[`appName${changeCase.capitalCase(casing)}`];
}

/**
 * Returns the stack name based on the provided app name and major version.
 * @param {string} appName - The name of the app.
 * @param {number} majorVersion - The major version number.
 * @param {string} [casing='camelCase'] - The casing style for the stack name. Defaults to 'camelCase'.
 * @returns {string} The stack name.
 */
function getStackName(appName, majorVersion, casing = 'camelCase') {
  const stackName = `${appName}V${majorVersion}`;
  return changeCase[casing](stackName);
}
/**
 * Transforms the partition namespaced.
 * @param {string} partition - The  partition to transform.
 * @param {string} ns - The ns to append to the partition.
 * @returns {string} - The transformed partition.
 */
function getPartitionNamespaced(partition, ns) {
  let parts = partition.split('/');
  if (parts.length > 1 && parts[0] !== '') {
    parts[0] = `${parts[0]}-${ns}`;
  } else if (parts.length > 2) {
    //leading slash scenarios
    parts[1] = `${parts[1]}-${ns}`;
  }

  let transformedPartition = parts.join('/');

  return transformedPartition;
}

/**
 * Fetches values from AWS Parameter Store for the given imports.
 *
 * @param {string[]} imports - The list of import names.
 * @param {string} domainPartition - The domain partition.
 * @param {string} deploymentNamespace - The deployment namespace.
 * @param {string} region - The AWS region.
 * @param {string} [profile] - The AWS profile (optional).
 * @returns {Promise<Object>} - A promise that resolves to an object containing the fetched values.
 */
async function fetchWsImportValuesFromParameterStore(
  imports,
  domainPartition,
  deploymentNamespace,
  region,
  profile = undefined,
) {
  const ssmClient = new SSMClient({
    region,
    credentials: profile ? fromIni({ profile }) : undefined,
  });
  const fetchedValues = {};

  for (const importName of imports) {
    if (!importName) continue;
    const importNameParts = importName.split('/');
    const poppedKey = importNameParts.pop();
    const remaining = importNameParts.join('/');
    const outputPartition = `${remaining}/${deploymentNamespace}`;
    const paramName = `${domainPartition}${outputPartition}/${poppedKey}`;
    const command = new GetParameterCommand({
      Name: paramName,
    });

    try {
      const { Parameter } = await ssmClient.send(command);
      fetchedValues[importName.split('/').pop()] = Parameter.Value;
    } catch (error) {
      // Silently handle the error to ensure consistent flow
      if (error.name === 'ParameterNotFound') {
        console.error(
          `WARNING: Import ${paramName} not found in Parameter Store. Will use workspace default if available`,
        );
      } else {
        console.error(`Error fetching parameter ${paramName}:`, error.message);
      }
      fetchedValues[importName.split('/').pop()] = null;
    }
  }

  return fetchedValues;
}

async function fetchExportedValuesFromParameterStore(
  exportsKeyValues,
  region,
  profile = undefined,
) {
  const ssmClient = new SSMClient({
    region,
    credentials: profile ? fromIni({ profile }) : undefined,
  });
  const fetchedValues = {};

  for (const value of Object.values(exportsKeyValues)) {
    const handle = value.split('/').pop();
    const command = new GetParameterCommand({
      Name: value,
    });

    try {
      const { Parameter } = await ssmClient.send(command);
      fetchedValues[handle] = Parameter.Value;
    } catch (error) {
      // Silently handle the error to ensure consistent flow
      if (error.name === 'ParameterNotFound') {
        console.error(
          `WARNING: Export ${value} not found in Parameter Store. Will use workspace default if available`,
        );
      } else {
        console.error(`Error fetching parameter ${value}:`, error.message);
      }
      fetchedValues[handle] = null;
    }
  }

  return fetchedValues;
}

module.exports = {
  extractRepoDetails,
  fetchExportedValuesFromParameterStore,
  fetchWsImportValuesFromParameterStore,
  findMonorepoConfig,
  findWorkspaceConfig,
  generateDeploymentNamespace,
  getBranch,
  getDomainDeploymentConfigurations,
  getCasedAppNames,
  getEnvMarkedAndDeploymentNamespacedStackNames,
  getPartitionNamespaced,
  getRepoUrl,
  getStackName,
  getDeploymentConfig,
  validateWsConfig,
  validateMonorepoConfig,
};

if (require.main === module) {
  // Execute Check
  // ported from another library mostly and should write execute check to the minimum for this lib
  getDomainDeploymentConfigurations().then(console.log).catch(console.error);
}
