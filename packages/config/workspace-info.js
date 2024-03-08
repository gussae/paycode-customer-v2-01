const { dirname, resolve } = require('path');
const fs = require('fs').promises;
const { getStackName } = require('./utils');

async function findPackageJson(currentPath) {
  try {
    const entries = await fs.readdir(currentPath);
    if (entries.includes('package.json')) {
      return resolve(currentPath, 'package.json');
    }
    const parentPath = resolve(currentPath, '..');
    // Stop if we reach the filesystem root or an inaccessible path
    if (currentPath === '/' || currentPath === parentPath) return null;
    return await findPackageJson(parentPath);
  } catch (error) {
    return null; // Return null if error (e.g., path doesn't exist)
  }
}

async function fetchWsRootInfo(currentPath) {
  const packageJsonPath = await findPackageJson(currentPath);
  if (!packageJsonPath) {
    throw new Error('package.json not found');
  }

  const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonData);
  const __workspaceRoot = dirname(packageJsonPath);
  const { name, version } = packageJson;

  return { __workspaceRoot, name, version };
}

function getAppInfo(name, version) {
  const appName =
    name.includes('@') && name.includes('/') ? name.split('/')[1] : name;

  const appPartition = `${appName}/`;
  const majorVersion = version.split('.')[0];
  const outputsPartition = `${appPartition}V${majorVersion}/outputs/`;
  const stackName = getStackName(appName, majorVersion);

  return {
    appPartition,
    appName,
    majorVersion,
    outputsPartition,
    stackName,
    version,
  };
}

async function getWorkspaceInfo(currentPath) {
  const { __workspaceRoot, name, version } = await fetchWsRootInfo(currentPath);
  const { appPartition, appName, majorVersion, outputsPartition, stackName } =
    getAppInfo(name, version);

  return {
    __workspaceRoot,
    appName,
    appPartition,
    majorVersion,
    outputsPartition,
    stackName,
    version,
  };
}

module.exports = { getWorkspaceInfo };

if (require.main === module) {
  (async () => {
    console.log('workspaceInfo', await getWorkspaceInfo(__dirname));
  })();
}
