/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// index.d.ts

//TODO  lazy migration to TS from JS => add proper type support or migrate to TS
export function getConfigAsync(): Promise<Config>;
export function getMonorepoConfig(
  appName: string | undefined,
): Promise<MonorepoConfig>;
export function getWorkspaceConfig(
  workspaceRoot: string,
): Promise<WorkspaceConfig>;
export function getWorkspaceInfo(currentPath: string): Promise<WorkspaceInfo>;
export function setEnv(
  workspaceRoot: string,
  imports: Record<string, unknown>,
  envVars: Record<string, unknown>,
  prefix: string,
): void;
export function getConfig(currentPath: string): Config;

export interface MonorepoConfig {
  paths: {
    __monorepoRoot: string;
  };
  appGlobalConfig: {
    domain: string;
  };
  appEnvConfig: Record<string, unknown>;
  domain: string;
  domainPartition: string;
  externalInfraConfig: {
    amplifyAppNames: string[];
    githubAwsOidcRolePrefix: string;
  };
  imports: string[];
  exports: string[];
  deploymentConfig: DeploymentConfig;
  packagesConfig: Array<PackagesConfig>;
}

export interface DeploymentConfig {
  deploymentNamespace: string;
  domainNamespace: string;
  account: string;
  branch: string;
  deploymentEnv: string;
  profile: string;
  region: string;
  repo: string;
}

export interface WorkspaceInfo {
  __workspaceRoot: string;
  appName: string;
  appPartition: string;
  majorVersion: string;
  outputsPartition: string;
  stackName: string;
  version: string;
}

export interface WorkspaceConfig {
  appEnvConfig: Record<string, unknown>[];
  customSettings: Records<string, unknown>;
  deploymentOptions: Record<string, unknown>;
  envVars: Record<string, unknown>;
  infraEnvConfig: Record<string, unknown>[];
  defaultImports: Record<string, unknown>[];
  paths: Record<string, string>;
}

export interface PackagesConfig {
  name: string;
  browser: boolean;
  build: boolean;
  dependsOn?: string[];
  hash: boolean
  node: boolean;
}

type Config = {
  appGlobalConfig: Record<string, unknown>;
  appEnvConfig: Record<string, unknown>;
  appName: string;
  appNameCamelCase: string;
  appNameConstantCase: string;
  appNameKebabCase: string;
  appNamePascalCase: string;
  appNameSnakeCase: string;
  appPartition: string;
  customSettings: Record<string, unknown>;
  deploymentOptions: Record<string, unknown>;
  deploymentConfig: DeploymentConfig;
  domain: string;
  domainPartition: string;
  envVars: Record<string, unknown>;
  exports: Record<string, string | undefined>;
  exportsLookup: Record<string, string | undefined>;
  externalInfraConfig: Record<string, unknown>;
  imports: Record<string, string | undefined>;
  infraEnvConfig: Record<string, unknown>;
  outputsPartition: string;
  packagesConfig: Array<PackagesConfig>;
  paths: Record<string, string>;
  stackNameCamelCase: string;
  stackNameKebabCase: string;
  stackNameConstantCase: string;
  stackNamePascalCase: string;
  stackNameSnakeCase: string;
};
