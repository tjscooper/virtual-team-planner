import { Complexity } from './common';
import { Artifact } from './artifact';

export interface QualityCheck {
  passed: boolean;
  criteria: string[];
  feedback: string;
}

export interface WorkflowStep {
  id: string;
  phase: string; // phase ID
  activeAgents: string[]; // agent IDs
  inputArtifacts: Artifact[];
  agentReasoning: string;
  outputArtifacts: Artifact[];
  qualityCheck: QualityCheck;
}

export interface Workflow {
  id: string;
  name: string;
  industry: string;
  complexity: Complexity;
  description: string;
  steps: WorkflowStep[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms: string[]; // term IDs
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
