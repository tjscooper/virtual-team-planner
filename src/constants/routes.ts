export const ROUTES = {
  HOME: '/',
  AGENTS: '/agents',
  AGENT_DETAIL: '/agents/:agentId',
  LIFECYCLE: '/lifecycle',
  PHASE_DETAIL: '/lifecycle/:phaseId',
  EXAMPLES: '/examples',
  WORKFLOW_DETAIL: '/examples/:workflowId',
  WORKFLOW_STEP: '/examples/:workflowId/step/:stepNumber',
  INTERACTIVE: '/interactive',
  RESOURCES: '/resources',
  GLOSSARY: '/resources/glossary',
} as const;

export function getAgentDetailRoute(agentId: string): string {
  return `/agents/${agentId}`;
}

export function getPhaseDetailRoute(phaseId: string): string {
  return `/lifecycle/${phaseId}`;
}

export function getWorkflowDetailRoute(workflowId: string): string {
  return `/examples/${workflowId}`;
}

export function getWorkflowStepRoute(workflowId: string, stepNumber: number): string {
  return `/examples/${workflowId}/step/${stepNumber}`;
}
