import { Phase } from '../types';

export const phases: Phase[] = [
  {
    id: 'discovery',
    name: 'Discovery',
    order: 1,
    durationEstimate: '1-2 weeks',
    objectives: [
      'Gather and validate business requirements',
      'Conduct user research and create personas',
      'Define success metrics and KPIs',
      'Identify constraints and risks',
      'Create user stories with acceptance criteria',
    ],
    participatingAgents: ['product-owner', 'ux-researcher', 'stakeholder'],
    deliverables: [
      'User stories with Gherkin scenarios',
      'User personas and journey maps',
      'Business requirements document',
      'Success metrics definition',
      'Risk register',
    ],
    qualityGateCriteria: [
      'All user stories have clear acceptance criteria',
      'Stakeholder sign-off on requirements',
      'User personas validated with research data',
      'Success metrics measurable and aligned with business goals',
      'Identified risks have mitigation plans',
    ],
    exampleArtifacts: [],
    color: 'areas',
  },
  {
    id: 'design',
    name: 'Design',
    order: 2,
    durationEstimate: '1-2 weeks',
    objectives: [
      'Design system architecture and data models',
      'Define API contracts and integration points',
      'Create comprehensive test strategy',
      'Document technical decisions (ADRs)',
      'Plan implementation approach and milestones',
    ],
    participatingAgents: ['tech-lead', 'qa-lead', 'product-manager'],
    deliverables: [
      'System architecture diagram (C4 model)',
      'API specifications (OpenAPI/Swagger)',
      'Database schema and migrations',
      'Test strategy document',
      'Architecture Decision Records (ADRs)',
      'Implementation plan with milestones',
    ],
    qualityGateCriteria: [
      'Architecture reviewed and approved by tech lead',
      'API contracts validated against user stories',
      'Test strategy covers all acceptance criteria',
      'Non-functional requirements (NFRs) addressed',
      'Security and compliance considerations documented',
    ],
    exampleArtifacts: [],
    color: 'projects',
  },
  {
    id: 'implementation',
    name: 'Implementation',
    order: 3,
    durationEstimate: '2-4 weeks',
    objectives: [
      'Implement features according to architecture',
      'Write clean, maintainable, documented code',
      'Create comprehensive automated test suites',
      'Conduct peer code reviews',
      'Integrate with CI/CD pipeline',
    ],
    participatingAgents: ['developer', 'sdet-automation', 'tech-lead'],
    deliverables: [
      'Production-ready code',
      'Unit tests (80%+ coverage)',
      'Integration tests',
      'End-to-end tests',
      'Code review approvals',
      'API documentation',
    ],
    qualityGateCriteria: [
      'All user stories implemented and demo-ready',
      'Code coverage ≥80% (unit tests)',
      'All tests passing in CI/CD pipeline',
      'Code review approved by tech lead',
      'No critical or high-priority bugs',
      'Static analysis (linting, security) passing',
    ],
    exampleArtifacts: [],
    color: 'resources',
  },
  {
    id: 'qa',
    name: 'QA & Testing',
    order: 4,
    durationEstimate: '1-2 weeks',
    objectives: [
      'Execute manual and exploratory testing',
      'Perform cross-browser and device testing',
      'Conduct security testing and vulnerability scanning',
      'Validate non-functional requirements',
      'Report and track defects to resolution',
    ],
    participatingAgents: ['qa-tester', 'security-lead', 'qa-lead'],
    deliverables: [
      'Test execution reports',
      'Defect reports with reproduction steps',
      'Security test results',
      'Performance test results',
      'Cross-browser compatibility matrix',
      'Regression test results',
    ],
    qualityGateCriteria: [
      'All critical and high-priority defects resolved',
      'Test pass rate ≥95%',
      'No critical security vulnerabilities (OWASP Top 10)',
      'Performance metrics meet NFRs',
      'Accessibility compliance (WCAG 2.1 AA)',
      'Stakeholder acceptance testing passed',
    ],
    exampleArtifacts: [],
    color: 'qa',
  },
  {
    id: 'compliance',
    name: 'Compliance & Release',
    order: 5,
    durationEstimate: '3-5 days',
    objectives: [
      'Validate regulatory compliance (PCI-DSS, HIPAA, GDPR)',
      'Complete QMS documentation and traceability',
      'Generate release notes and version history',
      'Prepare audit trail and evidence packages',
      'Obtain final release approval',
    ],
    participatingAgents: ['qms-lead', 'compliance-lead', 'stakeholder'],
    deliverables: [
      'Design History File (DHF)',
      'Traceability matrix (requirements → tests → code)',
      'Compliance checklist with evidence',
      'Release notes',
      'Change control documentation',
      'Audit trail',
    ],
    qualityGateCriteria: [
      'All compliance checklist items verified',
      'Traceability matrix complete (100% coverage)',
      'Documentation meets QMS standards',
      'Regulatory requirements satisfied',
      'Stakeholder approval obtained',
      'Release readiness review passed',
    ],
    exampleArtifacts: [],
    color: 'compliance',
  },
];

export function getPhaseById(id: string): Phase | undefined {
  return phases.find((phase) => phase.id === id);
}

export function getPhaseByOrder(order: number): Phase | undefined {
  return phases.find((phase) => phase.order === order);
}

export function getNextPhase(currentPhaseId: string): Phase | undefined {
  const currentPhase = getPhaseById(currentPhaseId);
  if (!currentPhase) return undefined;
  return getPhaseByOrder(currentPhase.order + 1);
}

export function getPreviousPhase(currentPhaseId: string): Phase | undefined {
  const currentPhase = getPhaseById(currentPhaseId);
  if (!currentPhase) return undefined;
  return getPhaseByOrder(currentPhase.order - 1);
}
