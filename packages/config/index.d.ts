/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// index.d.ts

//TODO  lazy migration to TS from JS => add proper type support or migrate to TS
export type Config = Record<string, unknown>;
export type WorkspaceConfig = Record<string, unknown>;
export type WorkspaceInfo = Record<string, unknown>;
export type MonorepoConfig = Record<string, unknown>;
export function getConfigAsync(): Promise<Config>;
export function getMonorepoConfig(
  appName: string | undefined,
): Promise<Record<string, unknown>>;
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
