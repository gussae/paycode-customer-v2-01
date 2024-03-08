/*README
Custom Dereferencing and Bundling for OpenAPI Specs
- Purpose: Addresses limitations in json-schema-ref-parser (Redocly leverages it) with complex relative path based `$ref` structures in OpenAPI docs.
- Process:
  1. Converts file based `$ref` to absolute paths
  2. Iteratively dereferences `$ref` (configurable passes via `maxNumOfPasses`).
- Limitations:
  - Designed specifically for dereferencing and bundling OpenAPI specs.
*/
import fs from 'fs-extra';
import {
  join,
  dirname,
  basename,
  isAbsolute,
  relative,
  sep,
  resolve,
} from 'path';
import { tmpdir } from 'os';
import { stringify, parse } from 'yaml';
import { bundle, dereference } from '@apidevtools/json-schema-ref-parser';

import CONFIG from './config.js';
const { openapiSpecPath, bundledOpenapiPath } = CONFIG.paths;

async function processOpenAPI() {
  if (!(await fs.pathExists(openapiSpecPath))) {
    throw new Error(
      `${openapiSpecPath} not found in the source directory: ${openapiSpecPath}`,
    );
  }

  const tempDir = fs.mkdtempSync(join(tmpdir(), 'openapi-'));
  const originalApiDir = dirname(openapiSpecPath);
  const tempOpenApiPath = join(tempDir, basename(openapiSpecPath));

  console.log('Processing OpenAPI document:', originalApiDir);

  try {
    //! copy or it will overwrite original!
    await fs.copy(originalApiDir, tempDir);

    // Check if openapi.yaml exists in the temp directory after copying
    if (!(await fs.pathExists(tempOpenApiPath))) {
      throw new Error(
        `${openapiSpecPath} not found in the temporary directory: ${tempOpenApiPath}`,
      );
    }

    // Dereference, bundle and output
    const bundledApi =
      await dereferenceAndBundleWithMultiplePass(tempOpenApiPath);
    //why this step? local ref can be remaining
    const fullyDereferencedApi = await fullyDereferenceInMemory(bundledApi);

    await fs.writeFile(bundledOpenapiPath, stringify(fullyDereferencedApi));
  } catch (error) {
    console.error('Error processing OpenAPI document:', error);
    throw error; //suppress when u don't want it to exit
  } finally {
    // Clean up
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

//utils

async function dereferenceAndBundleWithMultiplePass(
  apiPath,
  maxNumOfPasses = 10,
) {
  // Initially resolve all $ref paths to absolute paths
  await dirAbsPathResolver(dirname(apiPath));

  // Start the recursive process
  return await processPass(apiPath, 1, maxNumOfPasses);
}

async function processPass(apiPath, currentPass, maxNumOfPasses) {
  if (currentPass > maxNumOfPasses) {
    // Base case: Maximum number of passes reached
    return parse(await fs.readFile(apiPath, 'utf8'));
  }

  // Bundle and convert paths
  let document = await bundle(apiPath);
  document = convertToRelativePaths(document, dirname(apiPath));

  // Overwrite the file with the updated document
  await fs.writeFile(apiPath, stringify(document));

  if (isOnlyLocalAndHttpRefs(document)) {
    // Exit if only local and HTTP $refs remain
    return document;
  }

  // Recursive call for the next pass
  return await processPass(apiPath, currentPass + 1, maxNumOfPasses);
}

function convertToRelativePaths(document, rootPath) {
  function convertRefs(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        convertRefs(obj[key]);
      } else if (key === '$ref' && isAbsolute(obj[key])) {
        let relativePath = relative(rootPath, obj[key]);
        relativePath = relativePath.split(sep).join('/');
        if (!relativePath.startsWith('.')) {
          relativePath = './' + relativePath;
        }
        obj[key] = relativePath;
      }
    }
  }

  convertRefs(document);
  return document;
}

function isOnlyLocalAndHttpRefs(document) {
  // Function to check if the only remaining $refs are local or HTTP
  function checkRefs(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (checkRefs(obj[key])) return true;
      } else if (
        key === '$ref' &&
        typeof obj[key] === 'string' &&
        !(obj[key].startsWith('#') || obj[key].startsWith('http'))
      ) {
        return true; // Found a file-based $ref
      }
    }
    return false;
  }

  return !checkRefs(document);
}

function fileAbsPathResolver(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let document = parse(fileContent);

  // Only resolve file path
  function resolveRefPath(ref, basePath) {
    if (ref.startsWith('#') || ref.startsWith('http')) {
      return ref;
    } else {
      //has issues with windows paths
      return resolve(basePath, ref).normalize();
    }
  }

  // Function to recursively convert $ref paths in the document
  function convertRefs(obj, basePath) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        convertRefs(obj[key], basePath);
      } else if (key === '$ref' && typeof obj[key] === 'string') {
        obj[key] = resolveRefPath(obj[key], basePath);
      }
    }
  }

  convertRefs(document, dirname(filePath));
  fs.writeFileSync(filePath, stringify(document));
}

async function dirAbsPathResolver(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  const promises = files.map(async file => {
    const res = resolve(dir, file.name);
    if (file.isDirectory()) {
      return dirAbsPathResolver(res);
    } else if (file.name.endsWith('.yaml') || file.name.endsWith('.yml')) {
      return fileAbsPathResolver(res);
    }
  });

  await Promise.all(promises);
}

// Function to fully dereference the OpenAPI document in-memory (note that there may be a local reference remaining)
async function fullyDereferenceInMemory(apiObject) {
  try {
    // Dereference the bundled API object without modifying the file system
    const dereferencedApi = await dereference(apiObject);
    return dereferencedApi; // Return the fully dereferenced API object
  } catch (error) {
    console.error('Error fully dereferencing in-memory:', error);
    throw error; // Rethrow to handle it outside if necessary
  }
}

//it's designed to be a script
processOpenAPI();
