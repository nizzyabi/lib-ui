export interface Metadata {
  files: string[];
  envVariables: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}