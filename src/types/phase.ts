import { Artifact } from './artifact';

export interface Phase {
  id: string;
  name: string;
  order: number;
  durationEstimate: string;
  objectives: string[];
  participatingAgents: string[]; // agent IDs
  deliverables: string[];
  qualityGateCriteria: string[];
  exampleArtifacts: Artifact[];
  color: string; // Tailwind color class
}
