import path from 'path';
import { fileURLToPath } from 'url';
import CONFIG from '@paycode-customer-v2/config';
const { getConfig, setEnv } = CONFIG;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const config = getConfig(__dirname);
const {
  paths: { __workspaceRoot },
  imports,
  envVars,
} = config;
const envars = { ...envVars, ...config.deploymentConfig };
setEnv(__workspaceRoot, imports, envars, 'VITE_');

export default config;
console.debug({ config });
