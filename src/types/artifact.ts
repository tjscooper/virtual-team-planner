import { ArtifactType, Metadata } from './common';

export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  content: string;
  language?: string; // For syntax highlighting (js, ts, python, etc.)
  metadata: Metadata;
}
