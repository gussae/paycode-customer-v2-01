import CONFIG from './config.js';
import fs from 'fs';
import path from 'path';

const {
  paths: { __workspaceRoot },
  imports,
} = CONFIG;
const configPath = path.resolve(
  __workspaceRoot,
  'src',
  'amplify-be.config.json',
);

//we need to map to snake case so as to directly use it with the Amplify configuration method and the amplify team made bad choices and stuck with inconsistent casing scheme that needs to be handled here
const configurationJson = JSON.stringify(imports, (key, value) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const replacement = {};
    for (let k in value) {
      if (Object.hasOwnProperty.call(value, k)) {
        // Handle specific exceptions
        if (k === 'awsAppsyncGraphqlEndpoint') {
          replacement['aws_appsync_graphqlEndpoint'] = value[k];
        } else if (k === 'awsAppsyncAuthenticationType') {
          replacement['aws_appsync_authenticationType'] = value[k];
        } else {
          // Convert other keys to snake_case
          const newKey = k.replace(/([A-Z])/g, '_$1').toLowerCase();
          replacement[newKey] = value[k];
        }
      }
    }
    return replacement;
  }
  return value;
});

console.log({ configurationJson });

fs.writeFileSync(configPath, configurationJson);
