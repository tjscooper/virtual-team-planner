import { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'agent',
    term: 'Agent',
    definition:
      'A specialized AI role with specific capabilities and responsibilities within the virtual team (e.g., Product Owner, Tech Lead, QA Tester).',
    relatedTerms: ['workflow', 'phase', 'artifact'],
  },
  {
    id: 'artifact',
    term: 'Artifact',
    definition:
      'A tangible output produced by an agent, such as code, documentation, test results, or architecture diagrams.',
    relatedTerms: ['agent', 'phase', 'quality-gate'],
  },
  {
    id: 'phase',
    term: 'Phase',
    definition:
      'A stage in the software delivery lifecycle (Discovery, Design, Implementation, QA, Compliance), each with specific objectives and participating agents.',
    relatedTerms: ['quality-gate', 'workflow', 'agent'],
  },
  {
    id: 'quality-gate',
    term: 'Quality Gate',
    definition:
      'A checkpoint between phases that enforces quality criteria before allowing progression to the next phase. Failed gates trigger rework loops.',
    relatedTerms: ['phase', 'workflow', 'artifact'],
  },
  {
    id: 'workflow',
    term: 'Workflow',
    definition:
      'An end-to-end sequence of steps showing how agents collaborate across phases to deliver a feature or product.',
    relatedTerms: ['agent', 'phase', 'quality-gate'],
  },
  {
    id: 'qms',
    term: 'QMS (Quality Management System)',
    definition:
      'A formal system documenting processes, procedures, and responsibilities for achieving quality policies and objectives, often required in regulated industries.',
    relatedTerms: ['compliance', 'traceability-matrix'],
  },
  {
    id: 'traceability-matrix',
    term: 'Traceability Matrix',
    definition:
      'A document mapping requirements to design, code, and test artifacts, ensuring complete coverage and audit readiness.',
    relatedTerms: ['qms', 'compliance', 'artifact'],
  },
  {
    id: 'pci-dss',
    term: 'PCI-DSS',
    definition:
      'Payment Card Industry Data Security Standard, a set of security requirements for organizations handling credit card information.',
    relatedTerms: ['compliance', 'security'],
  },
];

export function getGlossaryTermById(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find((term) => term.id === id);
}

export function searchGlossaryTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery)
  );
}
