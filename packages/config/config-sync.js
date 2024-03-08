const { execSync } = require('child_process');
const path = require('path');

function getConfigSync(currentPath = __dirname) {
  const runConfigAsyncPath = path.resolve(__dirname, 'run-config-async.js');

  try {
    const stdout = execSync(`node "${runConfigAsyncPath}" "${currentPath}"`, {
      encoding: 'utf8',
    });
    // Extract the marked configuration output using the identifier
    const configOutputPrefix = 'CONFIG_OUTPUT:';
    const configOutput = stdout
      .split('\n')
      .find(line => line.startsWith(configOutputPrefix));
    if (!configOutput) {
      throw new Error('Configuration output not found in script output.');
    }
    // Remove the identifier before parsing JSON
    return JSON.parse(configOutput.slice(configOutputPrefix.length));
  } catch (error) {
    console.error('Failed to execute run-config-async.js:', error);
    throw error;
  }
}

module.exports = { getConfigSync };

if (require.main === module) {
  try {
    let webUiProjectRoot = path.resolve(__dirname, '../../apps/web-ui');
    let paycodeProxyProjectRoot = path.resolve(
      __dirname,
      '../../apps/paycode-proxy',
    );
    const config1= getConfigSync(__dirname);
    const config2 = getConfigSync(webUiProjectRoot);
    const config3 = getConfigSync(paycodeProxyProjectRoot);
    console.log('ws=config:', config1);
    console.log('ws=web-ui:', config2);
    console.log('ws=paycode-proxy:', config3);
  } catch (error) {
    console.error('Error:', error);
  }
}
