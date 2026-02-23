import { Workflow } from '../types';
import { artifacts } from './artifacts';

export const workflows: Workflow[] = [
  {
    id: 'ecommerce-checkout',
    name: 'E-commerce Checkout Enhancement',
    industry: 'E-commerce / Retail',
    complexity: 'medium',
    description:
      'Add saved payment methods to checkout flow, improving conversion by reducing friction for returning customers.',
    steps: [
      {
        id: 'step-1',
        phase: 'discovery',
        activeAgents: ['product-owner', 'ux-researcher'],
        inputArtifacts: [],
        agentReasoning:
          'Product Owner translates business goal (15% conversion increase) into user stories. UX Researcher validates with user feedback showing 45% cart abandonment at payment step.',
        outputArtifacts: [artifacts[0]!],
        qualityCheck: {
          passed: true,
          criteria: [
            'User stories have clear acceptance criteria',
            'Success metrics defined (15% conversion increase)',
          ],
          feedback: 'Ready to proceed to design phase.',
        },
      },
      {
        id: 'step-2',
        phase: 'design',
        activeAgents: ['tech-lead', 'qa-lead'],
        inputArtifacts: [artifacts[0]!],
        agentReasoning:
          'Tech Lead designs architecture using Stripe for PCI compliance. QA Lead defines test strategy covering security and edge cases.',
        outputArtifacts: [artifacts[1]!],
        qualityCheck: {
          passed: true,
          criteria: ['Architecture reviewed', 'PCI compliance addressed', 'Test strategy complete'],
          feedback: 'Architecture and test plan approved.',
        },
      },
      {
        id: 'step-3',
        phase: 'implementation',
        activeAgents: ['developer', 'sdet-automation'],
        inputArtifacts: [artifacts[1]!],
        agentReasoning:
          'Developer implements PaymentMethodService with Stripe integration. SDET creates unit and integration tests achieving 85% coverage.',
        outputArtifacts: [artifacts[2]!, artifacts[3]!],
        qualityCheck: {
          passed: false,
          criteria: [
            'Code coverage ≥80%',
            'All tests passing',
            'Security scan passing',
            'Code review approved',
          ],
          feedback:
            'FAILED: Security scan found SQL injection vulnerability in user input validation. Developer must fix before proceeding to QA.',
        },
      },
      {
        id: 'step-4',
        phase: 'implementation',
        activeAgents: ['developer'],
        inputArtifacts: [artifacts[2]!],
        agentReasoning:
          'Developer fixes SQL injection by adding parameterized queries and input validation. Re-runs security scan.',
        outputArtifacts: [artifacts[2]!],
        qualityCheck: {
          passed: true,
          criteria: ['Security scan passing', 'Code review re-approved'],
          feedback: 'Security issue resolved. Ready for QA phase.',
        },
      },
      {
        id: 'step-5',
        phase: 'qa',
        activeAgents: ['qa-tester', 'security-lead'],
        inputArtifacts: [artifacts[2]!, artifacts[3]!],
        agentReasoning:
          'QA Tester executes manual tests across browsers. Security Lead runs penetration tests and OWASP Top 10 checks.',
        outputArtifacts: [],
        qualityCheck: {
          passed: true,
          criteria: [
            'Test pass rate ≥95%',
            'No critical security vulnerabilities',
            'Cross-browser compatible',
          ],
          feedback: 'All tests passed. No security issues found. Ready for compliance review.',
        },
      },
      {
        id: 'step-6',
        phase: 'compliance',
        activeAgents: ['qms-lead', 'compliance-lead'],
        inputArtifacts: [artifacts[0]!, artifacts[1]!, artifacts[2]!, artifacts[3]!],
        agentReasoning:
          'QMS Lead creates traceability matrix linking requirements to code and tests. Compliance Lead validates PCI-DSS SAQ-A compliance.',
        outputArtifacts: [],
        qualityCheck: {
          passed: true,
          criteria: [
            'Traceability matrix complete',
            'PCI-DSS compliance verified',
            'Release documentation complete',
          ],
          feedback:
            'Feature approved for production release. All compliance criteria met.',
        },
      },
    ],
  },
];

export function getWorkflowById(id: string): Workflow | undefined {
  return workflows.find((workflow) => workflow.id === id);
}
