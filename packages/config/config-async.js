const path = require('path');
const { getWorkspaceInfo } = require('./workspace-info');
const { getMonorepoConfig } = require('./monorepo-config');
const { getWorkspaceConfig } = require('./workspace-config');
const {
  fetchExportedValuesFromParameterStore,
  fetchWsImportValuesFromParameterStore, // Updated to async version
  getEnvMarkedAndDeploymentNamespacedStackNames,
  getCasedAppNames,
} = require('./utils'); // Assume these are updated or already async compatible

/**
 * Asynchronously retrieves the configuration object based on the current path.
 * @param {string} currentPath - The current path.
 * @returns {Promise<Object>} The configuration object.
 */
async function getConfigAsync(currentPath) {
  const {
    __workspaceRoot,
    appName,
    appPartition,
    outputsPartition,
    stackName,
  } = await getWorkspaceInfo(currentPath);

  let config = { appName };

  // Use Promise.all to fetch monorepoConfig and workspaceConfig concurrently
  const [monorepoConfigResult, wsConfigResult] = await Promise.all([
    getMonorepoConfig(appName),
    getWorkspaceConfig(__workspaceRoot),
  ]);

  const {
    domainPartition,
    paths: paths1,
    imports,
    exports: exportsList,
    ...monorepoConfig
  } = monorepoConfigResult;

  const deploymentConfig = monorepoConfig.deploymentConfig;
  const {
    branch,
    repo,
    deploymentEnv,
    region,
    profile: _profile,
    deploymentNamespace: deploymentNs,
  } = deploymentConfig;
  const profile = process.env.CI === 'true' ? undefined : _profile;

  const nsStackNames = getEnvMarkedAndDeploymentNamespacedStackNames(
    stackName,
    deploymentNs,
    deploymentEnv,
  );
  const nsAppNames = getCasedAppNames(appName);

  //outputsPartition must be namespaced
  const outputsPartitionNamespaced = `${domainPartition}${outputsPartition}${deploymentNs}/`;
  config = {
    ...nsAppNames,
    appPartition,
    outputsPartition: outputsPartitionNamespaced,
    domainPartition,
    ...nsStackNames,
    ...config,
  };

  const {
    appEnvConfig,
    paths: paths2,
    defaultImports,
    infraEnvConfig,
    envVars,
    ...wsConfig
  } = wsConfigResult;

  //Grab envVars
  //merge appEnvConfig and monorepo appConfig to envVars after extracting the config for the deploymentEnv
  let _appEnvConfig = appEnvConfig.find(
    envConfig => envConfig.branch === branch,
  );

  let { appEnvConfig: monorepoAppEnvConfig, appGlobalConfig } = monorepoConfig;
  config.envVars = {
    ...appGlobalConfig,
    ...monorepoAppEnvConfig,
    ...envVars,
    ..._appEnvConfig,
  };

  //merge monorepo and workspace paths
  config.paths = { __workspaceRoot, ...paths1, ...paths2 };

  // Filter infraEnvConfig based on deploymentEnv (remove deploymentEnv key from the object)
  let _infraEnvConfig = infraEnvConfig.find(
    envConfig => envConfig.deploymentEnv === deploymentEnv,
  );
  if (_infraEnvConfig) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    let { deploymentEnv: _, ..._infraConfig } = _infraEnvConfig;
    config.infraEnvConfig = _infraConfig;
  } else {
    config.infraEnvConfig = {};
  }

  // Fetch imports asynchronously
  const importsFromParameterStore = await fetchWsImportValuesFromParameterStore(
    imports,
    domainPartition,
    deploymentNs,
    region,
    profile,
  );

  //

  // console.log(4444, { importsFromParameterStore });

  //default imports are environment dependent (branch, repo) which is uniquely tied to (acct, region) in aws and set per workspace basis
  const defaultImportsForEnv =
    (defaultImports &&
      defaultImports.find(
        defaultImport =>
          defaultImport.branch === branch && defaultImport.repo === repo,
      )) ||
    {};

  Object.keys(importsFromParameterStore).forEach(key => {
    if (
      [undefined, null, '', [], {}].includes(importsFromParameterStore[key])
    ) {
      importsFromParameterStore[key] = defaultImportsForEnv[key];
    }
  });

  // Transform exports to their respective parameter store handles
  const exportsKeyValues = exportsList
    .map(key => ({
      [`${key}ParameterStoreHandle`]: `${outputsPartitionNamespaced}${key}`,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  config.exports = exportsKeyValues;

  //The importing workspace should use the imports. However, some applications leverage exports to directly grab it from the exporting workspace
  config.exportsLookup = await fetchExportedValuesFromParameterStore(
    exportsKeyValues,
    region,
    profile,
  );

  return {
    ...config,
    ...wsConfig,
    ...monorepoConfig,
    imports: importsFromParameterStore,
  };
}

module.exports = { getConfigAsync };

if (require.main === module) {
  (async () => {
    let webUiProjectRoot = path.resolve(__dirname, '../../apps/web-ui');
    let paycodeProxyProjectRoot = path.resolve(
      __dirname,
      '../../apps/paycode-proxy',
    );
    let amplifyBeProjectRoot = path.resolve(__dirname, '../../apps/amplify-be');

    // Execute-check asynchronously
    console.log('webUiConfig', await getConfigAsync(webUiProjectRoot));
    console.log(
      'paycodeProxyConfig',
      await getConfigAsync(paycodeProxyProjectRoot),
    );
    console.log('amplifyBeConfig', await getConfigAsync(amplifyBeProjectRoot));
  })();
}
