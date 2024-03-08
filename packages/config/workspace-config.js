const path = require('path');
const { findWorkspaceConfig } = require('./utils');

/**
 * Transforms and flattens workspace configuration by incorporating app and infra settings into the root,
 * resolving paths, and applying defaults for missing imports.
 * Handles absence of infra.config.json gracefully.
 * - Flattens app and infra configurations to the root.
 * - Resolves paths to absolute based on project root.
 * - Validates and substitutes infra imports with defaults if necessary.
 * @param {Object} config - Initial workspace configuration with potential app and infra nested structures.
 * @returns {Object} - Transformed and flattened workspace configuration.
 */
async function getWorkspaceConfig(workspaceRoot) {
  let infraConfigJson = await findWorkspaceConfig(workspaceRoot);
  const {
    appEnvConfig = [],
    customSettings = {},
    defaultImports = [],
    infraEnvConfig = [],
    envVars = {},
    deploymentOptions = {},
    paths = {}, //relative paths from the ws
  } = infraConfigJson;

  // Flattening app and infra
  //only envVars and imports will be preserved at the root level. The rest will be flattened

  //note, for performance reasons and to run workspace fetch along with monorepo fetch, the deploymentEnv is unknown at this stage and infraEnvConfig is not filtered for the deploymentEnv here

  let wsConfig = {
    appEnvConfig,
    customSettings,
    deploymentOptions,
    envVars,
    infraEnvConfig,
    defaultImports,
    paths: {},
  };

  // Resolve paths to absolute and add them to paths extracted from monorepo configurations
  Object.keys(paths).forEach(key => {
    wsConfig.paths[key] = path.resolve(workspaceRoot, paths[key]);
  });


  return wsConfig;
}

module.exports = { getWorkspaceConfig };

if (require.main === module) {
  //to execute-check you need the actual path of the calling script to determine the project root path and the config to be transformed (which we can't simulate from here unless we do it manually)
  let webUiProjectRoot = path.resolve(__dirname, '../../apps/web-ui');
  let paycodeProxyProjectRoot = path.resolve(
    __dirname,
    '../../apps/paycode-proxy',
  );

  let test = async (workspaceRoot, deploymentEnv) => {
    getWorkspaceConfig(workspaceRoot, deploymentEnv)
      .then(console.log)
      .catch(console.error);
  };
  test(webUiProjectRoot, 'dev');
  test(paycodeProxyProjectRoot, 'dev');
}
