export type Category = 'discovery' | 'design' | 'implementation' | 'qa' | 'compliance';

export type Complexity = 'simple' | 'medium' | 'complex';

export type ArtifactType = 'code' | 'markdown' | 'test' | 'documentation';

export interface Metadata {
  createdBy: string; // agent ID
  phase: string; // phase ID
  timestamp: string;
}
