//generates the api adapter module so that it can be generated during the build process and be available as a static import for the consumer app to use (avoid the problem of using dynamic imports)
import fs from 'fs';

export interface GenerateProxyApiAdapterModuleProps {
  apiUrl: string;
  awsUserPoolsId: string;
  awsUserPoolsWebClientId: string;
  apiWorkspaceRoot: string;
  adapterModulePath: string;
  apigwClientModuleName: string; //note that this could be taken to other projects and/or installed from npm ->don't assume the name of the package here
}

/**
 * Generates a proxy API adapter module.
 *
 * @param {GenerateProxyApiAdapterModuleProps} props - The properties for generating the adapter module.
 */
export function generateProxyApiAdapterModule({
  apiUrl,
  awsUserPoolsId,
  awsUserPoolsWebClientId,
  apiWorkspaceRoot,
  adapterModulePath,
  apigwClientModuleName,
}: GenerateProxyApiAdapterModuleProps) {
  let fileContent = '';
  const importStatement = `import apiGw from '${apigwClientModuleName}';\n`;

  // Generate the adapter code
  const adapterCode = `export async function getProxyApiAdapter() {
  return await apiGw.getProxyApiAdapter({
    apiUrl: '${apiUrl}',
    awsUserPoolsId: '${awsUserPoolsId}',
    awsUserPoolsWebClientId: '${awsUserPoolsWebClientId}',
    apiWorkspaceRoot: '${apiWorkspaceRoot}',
  });
}\n`;

  // Read the existing content of the file if it exists
  if (fs.existsSync(adapterModulePath)) {
    fileContent = fs.readFileSync(adapterModulePath, { encoding: 'utf8' });
  }

  // Check if the adapter module already has the getProxyApiAdapter function
  const adapterFunctionPattern = /export async function getProxyApiAdapter\(\)/;

  if (adapterFunctionPattern.test(fileContent)) {
    // Replace the existing getProxyApiAdapter function
    fileContent = fileContent.replace(adapterFunctionPattern, adapterCode);
  } else {
    // If the file doesn't contain the function, append the import statement once at the top if not present
    if (!fileContent.includes(importStatement.trim())) {
      fileContent = importStatement + fileContent;
    }
    fileContent += '\n' + adapterCode;
  }

  // Write the updated or new content to the module path
  fs.writeFileSync(adapterModulePath, fileContent);
  console.log(
    `Proxy API Adapter module generated/updated at ${adapterModulePath}`,
  );
}
