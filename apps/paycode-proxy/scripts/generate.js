//! must be run from the terminal
import fs from 'fs-extra';
import { join, dirname } from 'path';
import { stringify } from 'yaml';
import { spawn } from 'child_process';
import CONFIG from './config.js';
import { replacePlaceholdersWithConfigValues, getApiId } from './utils.js';

// Configurations
const {
  deploymentConfig: {
    deploymentEnv: DEPLOYMENT_ENV,
    profile: PROFILE,
    region: REGION,
  },
  paths: {
    __workspaceRoot: __WORKSPACE_ROOT,
    apiClientAndDocDir: API_CLIENT_AND_DOC_DIR,
    bundledOpenapiPath: BUNDLED_OPENAPI_PATH,
  },
  exports: {
    paycodeProxyApiIdParameterStoreHandle:
      PAYCODE_PROXY_API_ID_PARAMETER_STORE_HANDLE,
  },
} = CONFIG;

// console.log({
//   __WORKSPACE_ROOT,
//   DEPLOYMENT_ENV,
//   PROFILE,
//   REGION,
//   API_CLIENT_AND_DOC_DIR,
//   BUNDLED_OPENAPI_PATH,
//   PAYCODE_API_ID_PARAMETER_STORE_HANDLE: PAYCODE_PROXY_API_ID_PARAMETER_STORE_HANDLE,
// });



//paths
//Need to work in temp dir within this workspace and copy it to the output dir to avoid numerous complications.
//Not using variable or OS temp dir to avoid node_modules and tsconfig issues
const TEMP_DIR_NAME = '.temp-generateClientAndDocs';
const TEMP_DIR_PATH = join(__WORKSPACE_ROOT, TEMP_DIR_NAME);
const TEMP_OPENAPI_SPEC_PATH = join(TEMP_DIR_PATH, 'openapi.yaml');
const TEMP_API_TS_CLIENT_DIR = join(TEMP_DIR_PATH, 'client');
const TEMP_API_TS_CLIENT_ENTRY = join(TEMP_API_TS_CLIENT_DIR, 'index.ts');
const TEMP_API_TS_CLIENT_PATH = join(TEMP_API_TS_CLIENT_DIR, 'API.ts');
const TEMP_CLIENT_DOC_OUTPUT_DIR = join(TEMP_DIR_PATH, 'doc', 'client');
const TEMP_API_DOC_OUTPUT_DIR = join(TEMP_DIR_PATH, 'doc', 'api');
const TEMP_EXPORT_API_OUTPUT_DIR = join(TEMP_DIR_PATH, '__endpoint');
const TEMP_API_DOC_OUTPUT_DIR_PATH = join(
  TEMP_API_DOC_OUTPUT_DIR,
  'index.html',
);
const EXPORTED_OPENAPI_PATH = join(TEMP_EXPORT_API_OUTPUT_DIR, 'openapi.json');

//setup
fs.emptyDirSync(TEMP_DIR_PATH);
const globalDeclaration = `
  declare type __type = any;
  declare module '*';
  `;
fs.writeFileSync(join(TEMP_DIR_PATH, 'global.d.ts'), globalDeclaration, {
  encoding: 'utf8',
});
fs.mkdirsSync(TEMP_API_TS_CLIENT_DIR);
fs.mkdirsSync(TEMP_CLIENT_DOC_OUTPUT_DIR);
fs.mkdirsSync(TEMP_API_DOC_OUTPUT_DIR);
fs.mkdirsSync(TEMP_EXPORT_API_OUTPUT_DIR);

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, FORCE_COLOR: '1' },
      ...options,
    });
    childProcess.on('exit', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

function prepareFiles() {
  const rawOpenapiSpec = fs.readFileSync(BUNDLED_OPENAPI_PATH, 'utf8');
  const openapiSpec = replacePlaceholdersWithConfigValues(
    rawOpenapiSpec,
    CONFIG,
  );
  fs.writeFileSync(TEMP_OPENAPI_SPEC_PATH, openapiSpec);
}

async function generateClientAndDocs(tempDir) {
  const opts = { cwd: __WORKSPACE_ROOT };
  //create API.ts (api TS client)
  await runCommand(
    'npx',
    [
      '-y',
      'orval',
      '--input',
      TEMP_OPENAPI_SPEC_PATH,
      '--output',
      TEMP_API_TS_CLIENT_PATH,
    ],
    opts,
  );
  await modifyAndExposeAxios(TEMP_API_TS_CLIENT_PATH);

  //create type guards
  const tsAutoGuardArgs = [
    'ts-auto-guard',
    '--export-all',
    TEMP_API_TS_CLIENT_PATH,
  ];
  if (process.env.DEPLOY_ENV !== 'prod') tsAutoGuardArgs.push('--debug');
  await runCommand('npx', ['-y', ...tsAutoGuardArgs]);

  //client documentation
  await runCommand(
    'npx',
    [
      '-y',
      'typedoc',
      TEMP_API_TS_CLIENT_DIR,
      '--out',
      TEMP_CLIENT_DOC_OUTPUT_DIR,
      '--tsconfig',
      join(__WORKSPACE_ROOT, 'tsconfig.json'),
      '--entryPointStrategy',
      'expand',
    ],
    opts,
  );

  //api documentation
  await runCommand(
    'npx',
    [
      '-y',
      'redocly',
      'build-docs',
      '--output',
      TEMP_API_DOC_OUTPUT_DIR_PATH,
      join(tempDir, 'openapi.yaml'),
    ],
    opts,
  );

  //Add API.guard.ts to index.ts (it throws off typedoc + will be exporting the obvious + cluttering the documentation)
  await exportAsLibrary(true);

  //generate openapi.exported.yaml file to invoke the actual endpoint
  const apiId = await getApiId(PAYCODE_PROXY_API_ID_PARAMETER_STORE_HANDLE);
  let command = `aws apigateway get-export --parameters extensions='integrations' --rest-api-id ${apiId} --stage-name ${DEPLOYMENT_ENV} --export-type oas30 ${EXPORTED_OPENAPI_PATH} --region ${REGION}`;

  if (process.env.CI !== 'true') {
    command += ` --profile ${PROFILE}`;
  }
  const [awsCommand, ...args] = command.split(' ');
  await runCommand(awsCommand, args, opts);
  convertJsonToYaml(EXPORTED_OPENAPI_PATH);
  console.log(
    `OpenAPI specification exported to ${dirname(EXPORTED_OPENAPI_PATH)}`,
  );
}

async function modifyAndExposeAxios(apiFilePath) {
  let content = fs.readFileSync(apiFilePath, { encoding: 'utf8' });
  content += `\nexport const getAxiosInstance = () => axios;\n`;
  fs.writeFileSync(apiFilePath, content, { encoding: 'utf8' });
}

async function exportAsLibrary(addGuard = false) {
  let indexContent = `export * from './API';`;
  if (addGuard) {
    indexContent += `\nexport * from './API.guard';\n`;
  }
  fs.writeFileSync(TEMP_API_TS_CLIENT_ENTRY, indexContent);
}


function convertJsonToYaml(filePath) {
  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Read file error: ${err}`);
      return;
    }
    const obj = JSON.parse(data);
    const yamlStr = stringify(obj);
    const yamlFilePath = filePath.replace(/\.json$/, '.yaml');
    fs.writeFile(yamlFilePath, yamlStr, 'utf8', err => {
      if (err) {
        console.error(`Write file error: ${err}`);
        return;
      }
    });
  });
}

async function copyOutputsToFinalDestination(tempDir) {
  await fs.emptyDir(API_CLIENT_AND_DOC_DIR);
  fs.cpSync(tempDir, API_CLIENT_AND_DOC_DIR, { recursive: true, force: true });
}

async function main() {
  try {
    prepareFiles(TEMP_DIR_PATH);
    await generateClientAndDocs(TEMP_DIR_PATH);
    fs.rmSync(TEMP_OPENAPI_SPEC_PATH, { force: true });
    await copyOutputsToFinalDestination(TEMP_DIR_PATH);
    console.log(
      'API client and documentation generation completed successfully.',
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    //toggle if you don't care to see doc files in this workspace
    // fs.rmSync(TEMP_DIR_PATH, { recursive: true, force: true });
  }
}

main();
