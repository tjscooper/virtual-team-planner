import { describe, it, expect } from 'vitest';
import { workflows, getWorkflowById } from '../workflows';
import { agents } from '../agents';
import { phases } from '../phases';

describe('workflows data', () => {
  describe('data integrity', () => {
    it('should have at least 1 workflow', () => {
      expect(workflows.length).toBeGreaterThanOrEqual(1);
    });

    it('should have all required fields for each workflow', () => {
      workflows.forEach((workflow) => {
        expect(workflow).toHaveProperty('id');
        expect(workflow).toHaveProperty('name');
        expect(workflow).toHaveProperty('industry');
        expect(workflow).toHaveProperty('complexity');
        expect(workflow).toHaveProperty('description');
        expect(workflow).toHaveProperty('steps');

        // Validate types
        expect(typeof workflow.id).toBe('string');
        expect(typeof workflow.name).toBe('string');
        expect(typeof workflow.industry).toBe('string');
        expect(typeof workflow.complexity).toBe('string');
        expect(typeof workflow.description).toBe('string');
        expect(Array.isArray(workflow.steps)).toBe(true);
      });
    });

    it('should have valid complexity values', () => {
      const validComplexities = ['simple', 'medium', 'complex'];
      workflows.forEach((workflow) => {
        expect(validComplexities).toContain(workflow.complexity);
      });
    });

    it('should have steps for each workflow', () => {
      workflows.forEach((workflow) => {
        expect(workflow.steps.length).toBeGreaterThan(0);
      });
    });
  });

  describe('workflow steps', () => {
    it('should have all required fields for each step', () => {
      workflows.forEach((workflow) => {
        workflow.steps.forEach((step) => {
          expect(step).toHaveProperty('id');
          expect(step).toHaveProperty('phase');
          expect(step).toHaveProperty('activeAgents');
          expect(step).toHaveProperty('inputArtifacts');
          expect(step).toHaveProperty('agentReasoning');
          expect(step).toHaveProperty('outputArtifacts');
          expect(step).toHaveProperty('qualityCheck');

          expect(typeof step.id).toBe('string');
          expect(typeof step.phase).toBe('string');
          expect(Array.isArray(step.activeAgents)).toBe(true);
          expect(Array.isArray(step.inputArtifacts)).toBe(true);
          expect(typeof step.agentReasoning).toBe('string');
          expect(Array.isArray(step.outputArtifacts)).toBe(true);
        });
      });
    });

    it('should have valid phase references in steps', () => {
      const validPhaseIds = phases.map((p) => p.id);
      workflows.forEach((workflow) => {
        workflow.steps.forEach((step) => {
          expect(validPhaseIds).toContain(step.phase);
        });
      });
    });

    it('should have valid agent references in steps', () => {
      const validAgentIds = agents.map((a) => a.id);
      workflows.forEach((workflow) => {
        workflow.steps.forEach((step) => {
          step.activeAgents.forEach((agentId) => {
            expect(validAgentIds).toContain(agentId);
          });
        });
      });
    });

    it('should have quality check with required fields', () => {
      workflows.forEach((workflow) => {
        workflow.steps.forEach((step) => {
          expect(step.qualityCheck).toHaveProperty('passed');
          expect(step.qualityCheck).toHaveProperty('criteria');
          expect(step.qualityCheck).toHaveProperty('feedback');

          expect(typeof step.qualityCheck.passed).toBe('boolean');
          expect(Array.isArray(step.qualityCheck.criteria)).toBe(true);
          expect(typeof step.qualityCheck.feedback).toBe('string');
        });
      });
    });

    it('should have at least one failed quality check (showing rework loop)', () => {
      let hasFailedCheck = false;
      workflows.forEach((workflow) => {
        workflow.steps.forEach((step) => {
          if (!step.qualityCheck.passed) {
            hasFailedCheck = true;
          }
        });
      });
      expect(hasFailedCheck).toBe(true);
    });
  });

  describe('getWorkflowById', () => {
    it('should return workflow by valid ID', () => {
      const workflow = getWorkflowById('ecommerce-checkout');
      expect(workflow).toBeDefined();
      expect(workflow?.name).toBe('E-commerce Checkout Enhancement');
    });

    it('should return undefined for invalid ID', () => {
      const workflow = getWorkflowById('non-existent-workflow');
      expect(workflow).toBeUndefined();
    });

    it('should find all workflows by their IDs', () => {
      workflows.forEach((expectedWorkflow) => {
        const foundWorkflow = getWorkflowById(expectedWorkflow.id);
        expect(foundWorkflow).toBeDefined();
        expect(foundWorkflow?.id).toBe(expectedWorkflow.id);
      });
    });
  });

  describe('cross-references', () => {
    it('should have agents that exist in the agents data', () => {
      const validAgentIds = new Set(agents.map((a) => a.id));
      workflows.forEach((workflow) => {
        workflow.steps.forEach((step) => {
          step.activeAgents.forEach((agentId) => {
            expect(validAgentIds.has(agentId)).toBe(true);
          });
        });
      });
    });

    it('should have phases that exist in the phases data', () => {
      const validPhaseIds = new Set(phases.map((p) => p.id));
      workflows.forEach((workflow) => {
        workflow.steps.forEach((step) => {
          expect(validPhaseIds.has(step.phase)).toBe(true);
        });
      });
    });
  });
});
