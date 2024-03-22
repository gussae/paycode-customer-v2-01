import { convertJsonToYaml, spawnCommand } from '../utils';
export interface ExportApigwProps {
  apiId: string;
  apiStageName: string;
  outdir: string;
  profile?: string;
  region: string;
}
/**
 * Exports the API Gateway configuration to OpenAPI 3.0 format.
 * @param params - The export parameters.
 * @returns A Promise that resolves when the export is complete.
 */
export async function exportApigw(params: ExportApigwProps): Promise<void> {
  //export
  const getExportArgs = [
    'apigateway',
    'get-export',
    '--parameters',
    "extensions='integrations'",
    '--rest-api-id',
    params.apiId,
    '--stage-name',
    params.apiStageName,
    '--export-type',
    'oas30',
    params.outdir,
    '--region',
    params.region,
  ];
  if (params.profile) getExportArgs.push('--profile', params.profile);
  await spawnCommand('aws', getExportArgs);
  await convertJsonToYaml(params.outdir);

  console.log(`ApiId ${params.apiId} was successfully exported.`);
}

