import fs from 'fs';
import CONFIG from './config.js';
import { stringify } from 'yaml';
import { constantCase } from 'change-case-all';

import { replacePlaceholdersWithConfigValues } from './utils.js';

const BASE_DEFINITION_BODY_INDENTATION = 6;
const BASE_ENV_VARS_INDENTATION = 8;

const {
  paths: {
    templateInputPath: TEMPLATE_INPUT_PATH,
    bundledOpenapiPath: BUNDLED_OPENAPI_PATH,
    templateOutputPath: TEMPLATE_OUTPUT_PATH,
    samconfigTomlInputPath: SAM_CONFIG_TOML_INPUT_PATH,
    samconfigTomlOutputPath: SAM_CONFIG_TOML_OUTPUT_PATH,
  },
} = CONFIG;

// console.log({CONFIG})

// Include the OpenAPI spec in the template
function processOpenapiSpec(templateContent, bundledOpenapiPath) {
  let openapiSpec = fs.readFileSync(bundledOpenapiPath, 'utf8');
  //$ will throw it off!
  openapiSpec = openapiSpec.replace(/\$/g, '__DOLLAR__');

  let indentedOpenapiSpec = indentYamlString(
    openapiSpec,
    BASE_DEFINITION_BODY_INDENTATION,
    2,
  );
  // Replace the placeholder with the indented OpenAPI spec
  templateContent = templateContent.replace(
    '${__INCLUDE_OPENAPI_SPEC__}',
    indentedOpenapiSpec,
  );

  const envarsYamlString = stringify(preprocessEnvVars(CONFIG.envVars), {
    indent: 4,
    noRefs: true,
  });
  const indentedEnvars = indentYamlString(
    envarsYamlString,
    BASE_ENV_VARS_INDENTATION,
    0,
  );

  templateContent = templateContent.replace(
    '${__INCLUDE_ENV_VARIABLES__}',
    indentedEnvars,
  );

  // Revert placeholder back to $
  templateContent = templateContent.replace(/__DOLLAR__/g, '$');

  return templateContent;
}

// Function to process and build the template and SAM config files
function buildTemplateAndConfigFiles(inputPath, outputPath, configMap) {
  let content = fs.readFileSync(inputPath, 'utf8');
  // OpenAPI spec needs to be included in template(but not the samconfig file)
  if (inputPath === TEMPLATE_INPUT_PATH) {
    content = processOpenapiSpec(content, BUNDLED_OPENAPI_PATH);
  }
  const processedContent = replacePlaceholdersWithConfigValues(
    content,
    configMap,
  );
  fs.writeFileSync(outputPath, processedContent, 'utf8');
}

function indentYamlString(yamlString, baseIndentation, tab) {
  const lines = yamlString.split('\n');
  return lines
    .map((line, index) => {
      // Apply base indentation for the first line and baseIndentation + tab for subsequent lines
      const indentation = index === 0 ? baseIndentation : baseIndentation + tab;
      // However, do not add extra indentation if the line is empty or if it's a comment
      if (index === 0) {
        // For the first line, if it needs different handling
        return line;
      }
      if (line.trim() === '') {
        return line;
      }
      return `${' '.repeat(indentation)}${line}`;
    })
    .join('\n');
}

// Function to preprocess and stringify non-string values in envVars
function preprocessEnvVars(envVars) {
  const processedVars = {};
  Object.keys(envVars).forEach(key => {
      // Convert key to constant case
      const constantKey = constantCase(key);
      const value = envVars[key];
      // Check if the value is an object (and not null) or an array, then stringify
      if (typeof value === 'object' && value !== null || Array.isArray(value)) {
          processedVars[constantKey] = JSON.stringify(value);
      } else {
          // Assume the value is a string or can be treated as such
          processedVars[constantKey] = value;
      }
  });
  return processedVars;
}

// Process both template and SAM config files
buildTemplateAndConfigFiles(TEMPLATE_INPUT_PATH, TEMPLATE_OUTPUT_PATH, CONFIG);
buildTemplateAndConfigFiles(
  SAM_CONFIG_TOML_INPUT_PATH,
  SAM_CONFIG_TOML_OUTPUT_PATH,
  CONFIG,
);
