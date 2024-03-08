const { findMonorepoConfig, getDeploymentConfig } = require('./utils');

/**
 * Retrieves the monorepo configuration for a specific application or for the monorepo itself if no application name is provided.
 * If an appName is provided, it returns configuration including imports and exports specific to that application.
 * Without an appName, it returns the monorepo and deployment configurations without application-specific imports and exports.
 *
 * @param {string} [appName] - The name of the application to retrieve the configuration for. Optional.
 * @returns {Promise<Object>} An object containing paths, global and environment-specific configurations,
 * deployment configuration, and optionally imports and exports if an appName is provided.
 */
async function getMonorepoConfig(appName) {
  const { monorepoConfig, __monorepoRoot } =
    await findMonorepoConfig(__dirname);

  const infraConfigJson = monorepoConfig.infraConfig;
  const appConfigJson = monorepoConfig.appConfig;
  const deploymentConfig = await getDeploymentConfig(
    infraConfigJson.deploymentConfig,
  );

  //domain:note that the domain is typically the repoName
  const packageJson = require(`${__monorepoRoot}/package.json`);
  const domain = packageJson.name;
  const domainPartition = `/${domain}/`;

  const appGlobalConfig = appConfigJson.global || {};
  const environmentConfigs = appConfigJson.envConfig || [];
  const appEnvConfig =
    environmentConfigs.find(ec => ec.runtimeEnv === deploymentConfig.branch) ||
    {};

  let imports = [],
    exports = [];

  // Only attempt to find app-specific config if appName is provided
  if (appName) {
    const appSpecificInfraConfig = infraConfigJson.infraApp.find(
      app => app.name === appName,
    );
    if (appSpecificInfraConfig) {
      imports = appSpecificInfraConfig.imports || [];
      exports = appSpecificInfraConfig.exports || [];
    }
  }

  return {
    paths: {
      __monorepoRoot,
    },
    appGlobalConfig,
    appEnvConfig,
    domain,
    domainPartition,
    externalInfraConfig: infraConfigJson.__external,
    imports,
    exports,
    deploymentConfig,
    packagesConfig: monorepoConfig.packagesConfig,
  };
}

if (require.main === module) {
  const test = async appName => {
    getMonorepoConfig(appName).then(console.log).catch(console.error);
  };

  test('paycode-proxy');
  test('web-ui');
  test(); //no appName
}

module.exports = { getMonorepoConfig };
