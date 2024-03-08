import { spawn } from 'child_process';

import CONFIG from './config.js';
const {
  paths: { bundledOpenapiPath },
} = CONFIG;

// Function to validate the OpenAPI document using Redocly's OpenAPI CLI
function validateOpenAPISpec(filePath) {
  return new Promise((resolve, reject) => {
    const validator = spawn('npx', ['redocly', 'lint', `"${filePath}"`], {
      stdio: 'inherit',
      shell: true,
    });

    validator.on('exit', code => {
      if (code === 0) {
        console.log('OpenAPI specification is valid.');
        resolve();
      } else {
        console.error('OpenAPI specification validation failed.');
        reject(new Error('Validation failed'));
      }
    });
  });
}

validateOpenAPISpec(bundledOpenapiPath);
