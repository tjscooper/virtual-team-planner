import { describe, it, expect } from 'vitest';
import { agents, getAgentById, getAgentsByCategory, getAgentsByPhase } from '../agents';

describe('agents data', () => {
  describe('data integrity', () => {
    it('should have exactly 12 agents (11 + 1 orchestrator)', () => {
      expect(agents).toHaveLength(12);
    });

    it('should have all required fields for each agent', () => {
      agents.forEach((agent) => {
        expect(agent).toHaveProperty('id');
        expect(agent).toHaveProperty('name');
        expect(agent).toHaveProperty('category');
        expect(agent).toHaveProperty('description');
        expect(agent).toHaveProperty('icon');
        expect(agent).toHaveProperty('capabilities');
        expect(agent).toHaveProperty('exampleInputs');
        expect(agent).toHaveProperty('exampleOutputs');
        expect(agent).toHaveProperty('phaseParticipation');
        expect(agent).toHaveProperty('relatedAgents');

        // Validate types
        expect(typeof agent.id).toBe('string');
        expect(typeof agent.name).toBe('string');
        expect(typeof agent.category).toBe('string');
        expect(typeof agent.description).toBe('string');
        expect(Array.isArray(agent.capabilities)).toBe(true);
        expect(Array.isArray(agent.exampleInputs)).toBe(true);
        expect(Array.isArray(agent.phaseParticipation)).toBe(true);
        expect(Array.isArray(agent.relatedAgents)).toBe(true);
      });
    });

    it('should have unique IDs for all agents', () => {
      const ids = agents.map((agent) => agent.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(agents.length);
    });

    it('should have valid category values', () => {
      const validCategories = ['discovery', 'design', 'implementation', 'qa', 'compliance'];
      agents.forEach((agent) => {
        expect(validCategories).toContain(agent.category);
      });
    });

    it('should have correct category distribution', () => {
      const categoryCount = {
        discovery: 0,
        design: 0,
        implementation: 0,
        qa: 0,
        compliance: 0,
      };

      agents.forEach((agent) => {
        categoryCount[agent.category]++;
      });

      expect(categoryCount.discovery).toBe(3);
      expect(categoryCount.design).toBe(3); // Tech Lead, QA Lead, Product Manager
      expect(categoryCount.implementation).toBe(2);
      expect(categoryCount.qa).toBe(2);
      expect(categoryCount.compliance).toBe(2);
    });

    it('should have at least 3 capabilities per agent', () => {
      agents.forEach((agent) => {
        expect(agent.capabilities.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have valid phase participation', () => {
      const validPhases = ['discovery', 'design', 'implementation', 'qa', 'compliance'];
      agents.forEach((agent) => {
        expect(agent.phaseParticipation.length).toBeGreaterThan(0);
        agent.phaseParticipation.forEach((phase) => {
          expect(validPhases).toContain(phase);
        });
      });
    });
  });

  describe('getAgentById', () => {
    it('should return agent by valid ID', () => {
      const agent = getAgentById('product-owner');
      expect(agent).toBeDefined();
      expect(agent?.name).toBe('Product Owner');
    });

    it('should return undefined for invalid ID', () => {
      const agent = getAgentById('non-existent-agent');
      expect(agent).toBeUndefined();
    });

    it('should find all agents by their IDs', () => {
      agents.forEach((expectedAgent) => {
        const foundAgent = getAgentById(expectedAgent.id);
        expect(foundAgent).toBeDefined();
        expect(foundAgent?.id).toBe(expectedAgent.id);
      });
    });
  });

  describe('getAgentsByCategory', () => {
    it('should return 3 discovery agents', () => {
      const discoveryAgents = getAgentsByCategory('discovery');
      expect(discoveryAgents).toHaveLength(3);
      discoveryAgents.forEach((agent) => {
        expect(agent.category).toBe('discovery');
      });
    });

    it('should return 3 design agents', () => {
      const designAgents = getAgentsByCategory('design');
      expect(designAgents).toHaveLength(3); // Tech Lead, QA Lead, Product Manager
      designAgents.forEach((agent) => {
        expect(agent.category).toBe('design');
      });
    });

    it('should return empty array for invalid category', () => {
      const result = getAgentsByCategory('invalid-category');
      expect(result).toEqual([]);
    });
  });

  describe('getAgentsByPhase', () => {
    it('should return agents for discovery phase', () => {
      const phaseAgents = getAgentsByPhase('discovery');
      expect(phaseAgents.length).toBeGreaterThan(0);
      phaseAgents.forEach((agent) => {
        expect(agent.phaseParticipation).toContain('discovery');
      });
    });

    it('should return agents for all phases', () => {
      const phases = ['discovery', 'design', 'implementation', 'qa', 'compliance'];
      phases.forEach((phase) => {
        const phaseAgents = getAgentsByPhase(phase);
        expect(phaseAgents.length).toBeGreaterThan(0);
      });
    });

    it('should return product-manager in all phases', () => {
      const phases = ['discovery', 'design', 'implementation', 'qa', 'compliance'];
      phases.forEach((phase) => {
        const phaseAgents = getAgentsByPhase(phase);
        const pmAgent = phaseAgents.find((a) => a.id === 'product-manager');
        expect(pmAgent).toBeDefined();
      });
    });
  });
});
