import { Category } from './common';
import { Artifact } from './artifact';

export interface Agent {
  id: string;
  name: string;
  category: Category;
  description: string;
  icon: string; // Lucide icon name
  capabilities: string[];
  exampleInputs: string[];
  exampleOutputs: Artifact[];
  phaseParticipation: string[]; // phase IDs
  relatedAgents: string[]; // agent IDs
}
