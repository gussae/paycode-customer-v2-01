import { fileURLToPath } from 'url';
import path from 'path';
import CONFIG from '@paycode-customer-v2/config';

const { getConfig, setEnv } = CONFIG;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = getConfig(__dirname);
const {
  paths: { __workspaceRoot },
  imports,
  envVars,
} = config;
// console.log({ __workspaceRoot, imports, envVars });
setEnv(__workspaceRoot, imports, envVars);

export default config;
console.log({ config });
