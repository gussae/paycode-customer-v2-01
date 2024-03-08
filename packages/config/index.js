// Re-exporting the imported functions
module.exports = {
  getConfigAsync: require('./config-async').getConfigAsync,
  getMonorepoConfig: require('./monorepo-config').getMonorepoConfig,
  getWorkspaceConfig: require('./workspace-config').getWorkspaceConfig,
  getWorkspaceInfo: require('./workspace-info').getWorkspaceInfo,
  setEnv: require('./set-env').setEnv,
  getConfig: require('./config-sync').getConfigSync,
  getDomainDeploymentConfigurations: require('./utils').getDomainDeploymentConfigurations,
};
