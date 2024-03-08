const path = require('path');
const { constantCase } = require('change-case-all');
const { writeFile } = require('fs/promises');

/**
 * Sets environment variables based on the provided imports and envVars.
 * @param {string} workspaceRoot - The root path of the workspace.
 * @param {Object} imports - The imported environment variables.
 * @param {Object} envVars - The environment variables to be set.
 */
function setEnv(workspaceRoot, imports, envVars, prefix = '') {
  const envVarsJson = {
    ...imports,
    ...envVars,
  };

  const envContent = Object.keys(envVarsJson)
    .map(key => `${prefix}${constantCase(key)}=${envVarsJson[key]}`)
    .join('\n');

  //   console.log({ envVarsJson, envCOntent });
  writeFile(path.resolve(workspaceRoot, '.env'), envContent, {
    encoding: 'utf8',
  })
    .then(console.log('Updated .env'))
    .catch(console.error);
}

module.exports = { setEnv };

if (require.main == module) {
  const workspaceRoot = path.resolve(__dirname, '../../apps/web-ui');
  const { imports, envVars } = require('./index.js').getConfig(workspaceRoot);
  setEnv(workspaceRoot, imports, envVars, 'VITE_');
}
