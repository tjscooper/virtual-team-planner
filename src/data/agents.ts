import { Agent } from '../types';

export const agents: Agent[] = [
  // DISCOVERY AGENTS (3)
  {
    id: 'product-owner',
    name: 'Product Owner',
    category: 'discovery',
    description: 'Defines user stories, acceptance criteria, and product requirements from stakeholder needs.',
    icon: 'Clipboard',
    capabilities: [
      'User story creation with Gherkin scenarios',
      'Acceptance criteria definition',
      'Epic breakdown and prioritization',
      'Backlog refinement and grooming',
      'Stakeholder requirement translation',
    ],
    exampleInputs: [
      'Business goal: Increase checkout conversion by 15%',
      'Stakeholder request: Users need to save payment methods',
      'Market research: Competitors offer one-click checkout',
    ],
    exampleOutputs: [],
    phaseParticipation: ['discovery'],
    relatedAgents: ['ux-researcher', 'stakeholder', 'product-manager'],
  },
  {
    id: 'ux-researcher',
    name: 'UX Researcher',
    category: 'discovery',
    description: 'Conducts user research, creates personas, and validates design decisions with data.',
    icon: 'Users',
    capabilities: [
      'User persona development',
      'Journey mapping and flow analysis',
      'Usability testing and heuristic evaluation',
      'Accessibility requirement definition',
      'Competitive UX analysis',
    ],
    exampleInputs: [
      'Product goal: Simplify checkout flow',
      'User feedback: Payment form is confusing',
      'Analytics: 45% cart abandonment at payment step',
    ],
    exampleOutputs: [],
    phaseParticipation: ['discovery'],
    relatedAgents: ['product-owner', 'stakeholder', 'tech-lead'],
  },
  {
    id: 'stakeholder',
    name: 'Stakeholder',
    category: 'discovery',
    description: 'Provides business context, constraints, and alignment with organizational goals.',
    icon: 'Building2',
    capabilities: [
      'Business requirement validation',
      'Risk assessment and mitigation planning',
      'Budget and timeline constraint definition',
      'Regulatory compliance requirement identification',
      'Success metrics and KPI definition',
    ],
    exampleInputs: [
      'Strategic initiative: Launch new payment gateway',
      'Compliance requirement: PCI-DSS Level 1 certification',
      'Budget constraint: $50K development, 8-week timeline',
    ],
    exampleOutputs: [],
    phaseParticipation: ['discovery', 'compliance'],
    relatedAgents: ['product-owner', 'compliance-lead', 'qms-lead'],
  },

  // DESIGN AGENTS (2)
  {
    id: 'tech-lead',
    name: 'Tech Lead',
    category: 'design',
    description: 'Architects the technical solution, selects technologies, and plans implementation approach.',
    icon: 'Code2',
    capabilities: [
      'System architecture design (C4 model, ADRs)',
      'Technology stack selection and justification',
      'API contract definition (OpenAPI)',
      'Database schema design',
      'Performance and scalability planning',
    ],
    exampleInputs: [
      'User story: Save payment methods securely',
      'Non-functional requirements: <200ms API response, 99.9% uptime',
      'Existing system: Node.js + PostgreSQL + Redis',
    ],
    exampleOutputs: [],
    phaseParticipation: ['design', 'implementation'],
    relatedAgents: ['product-manager', 'qa-lead', 'developer', 'security-lead'],
  },
  {
    id: 'qa-lead',
    name: 'QA Lead',
    category: 'design',
    description: 'Defines test strategy, quality gates, and acceptance criteria for all phases.',
    icon: 'CheckSquare',
    capabilities: [
      'Test strategy document creation',
      'Quality gate criteria definition',
      'Test pyramid planning (unit/integration/e2e)',
      'Risk-based testing approach',
      'Defect prevention analysis',
    ],
    exampleInputs: [
      'Feature: Payment tokenization',
      'Acceptance criteria: Valid cards saved, invalid rejected',
      'Risk: Payment data exposure, PCI compliance breach',
    ],
    exampleOutputs: [],
    phaseParticipation: ['design', 'qa'],
    relatedAgents: ['tech-lead', 'sdet-automation', 'qa-tester', 'security-lead'],
  },

  // IMPLEMENTATION AGENTS (2)
  {
    id: 'developer',
    name: 'Senior Developer',
    category: 'implementation',
    description: 'Implements features following architecture, writes clean code with inline documentation.',
    icon: 'Terminal',
    capabilities: [
      'Feature implementation (TypeScript, React, Node.js)',
      'RESTful API development',
      'Database query optimization',
      'Code review and refactoring',
      'Technical documentation',
    ],
    exampleInputs: [
      'Architecture Decision Record: Use Stripe for tokenization',
      'API contract: POST /api/payment-methods',
      'Test cases: Valid card saves, invalid card rejects',
    ],
    exampleOutputs: [],
    phaseParticipation: ['implementation'],
    relatedAgents: ['tech-lead', 'sdet-automation', 'qa-tester'],
  },
  {
    id: 'sdet-automation',
    name: 'SDET (Automation Engineer)',
    category: 'implementation',
    description: 'Creates automated test suites covering unit, integration, and end-to-end scenarios.',
    icon: 'Bot',
    capabilities: [
      'Unit test implementation (Vitest, Jest)',
      'Integration test creation (Supertest, MSW)',
      'E2E test automation (Playwright, Cypress)',
      'API contract testing (Pact)',
      'CI/CD pipeline integration',
    ],
    exampleInputs: [
      'Feature code: PaymentMethodService.ts',
      'Test strategy: Unit + integration + e2e coverage',
      'Quality gate: 80% code coverage, 100% critical path coverage',
    ],
    exampleOutputs: [],
    phaseParticipation: ['implementation', 'qa'],
    relatedAgents: ['developer', 'qa-lead', 'qa-tester'],
  },

  // QA AGENTS (2)
  {
    id: 'qa-tester',
    name: 'QA Tester',
    category: 'qa',
    description: 'Executes manual and exploratory testing, reports defects with detailed reproduction steps.',
    icon: 'Bug',
    capabilities: [
      'Manual test case execution',
      'Exploratory testing and edge case discovery',
      'Cross-browser and device testing',
      'Defect reporting with reproduction steps',
      'Regression testing',
    ],
    exampleInputs: [
      'Build: v1.2.3-rc1 deployed to staging',
      'Test cases: Save payment method (happy path, error cases)',
      'Browsers: Chrome, Firefox, Safari, Edge',
    ],
    exampleOutputs: [],
    phaseParticipation: ['qa'],
    relatedAgents: ['qa-lead', 'developer', 'sdet-automation'],
  },
  {
    id: 'security-lead',
    name: 'Security Lead',
    category: 'qa',
    description: 'Performs security testing, vulnerability scanning, and threat modeling.',
    icon: 'Shield',
    capabilities: [
      'OWASP Top 10 vulnerability testing',
      'Penetration testing and exploit discovery',
      'Threat modeling (STRIDE, DREAD)',
      'Security code review',
      'Dependency vulnerability scanning (Snyk, npm audit)',
    ],
    exampleInputs: [
      'Feature: Payment method storage',
      'Threat: SQL injection, XSS, token theft',
      'Compliance: PCI-DSS requirement 6.5',
    ],
    exampleOutputs: [],
    phaseParticipation: ['qa', 'compliance'],
    relatedAgents: ['qa-lead', 'compliance-lead', 'tech-lead'],
  },

  // COMPLIANCE AGENTS (2)
  {
    id: 'qms-lead',
    name: 'QMS Lead',
    category: 'compliance',
    description: 'Ensures documentation meets QMS standards, maintains traceability matrix.',
    icon: 'FileCheck',
    capabilities: [
      'Design history file (DHF) maintenance',
      'Traceability matrix creation (requirements → tests)',
      'Change control documentation',
      'Release notes and version history',
      'Audit trail documentation',
    ],
    exampleInputs: [
      'Feature: Payment tokenization v1.0',
      'Requirements: User stories from discovery phase',
      'Test results: 95% pass rate, 3 critical bugs fixed',
    ],
    exampleOutputs: [],
    phaseParticipation: ['compliance'],
    relatedAgents: ['compliance-lead', 'stakeholder', 'product-manager'],
  },
  {
    id: 'compliance-lead',
    name: 'Compliance Lead',
    category: 'compliance',
    description: 'Validates regulatory compliance (HIPAA, PCI-DSS, GDPR), performs final audit before release.',
    icon: 'Scale',
    capabilities: [
      'Regulatory requirement validation',
      'Compliance checklist verification',
      'Audit preparation and response',
      'Risk assessment documentation',
      'Release approval based on compliance criteria',
    ],
    exampleInputs: [
      'Regulation: PCI-DSS v4.0',
      'Checklist: 12 requirements, 78 sub-requirements',
      'Evidence: Security test results, encryption verification',
    ],
    exampleOutputs: [],
    phaseParticipation: ['compliance'],
    relatedAgents: ['security-lead', 'qms-lead', 'stakeholder'],
  },

  // ORCHESTRATION AGENT
  {
    id: 'product-manager',
    name: 'Product Manager (Orchestrator)',
    category: 'design',
    description: 'Orchestrates workflow across all phases, tracks progress, and makes go/no-go decisions at quality gates.',
    icon: 'GitBranch',
    capabilities: [
      'Workflow orchestration and phase transitions',
      'Quality gate evaluation and enforcement',
      'Agent task assignment and coordination',
      'Progress tracking and reporting',
      'Conflict resolution and rework management',
    ],
    exampleInputs: [
      'Workflow: E-commerce checkout feature',
      'Current phase: Implementation',
      'Quality gate: Code review approved, tests passing',
    ],
    exampleOutputs: [],
    phaseParticipation: ['discovery', 'design', 'implementation', 'qa', 'compliance'],
    relatedAgents: ['product-owner', 'tech-lead', 'qa-lead', 'qms-lead'],
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id);
}

export function getAgentsByCategory(category: string): Agent[] {
  return agents.filter((agent) => agent.category === category);
}

export function getAgentsByPhase(phaseId: string): Agent[] {
  return agents.filter((agent) => agent.phaseParticipation.includes(phaseId));
}
