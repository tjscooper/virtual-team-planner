import { describe, it, expect } from 'vitest';
import {
  phases,
  getPhaseById,
  getPhaseByOrder,
  getNextPhase,
  getPreviousPhase,
} from '../phases';

describe('phases data', () => {
  describe('data integrity', () => {
    it('should have exactly 5 phases', () => {
      expect(phases).toHaveLength(5);
    });

    it('should have all required fields for each phase', () => {
      phases.forEach((phase) => {
        expect(phase).toHaveProperty('id');
        expect(phase).toHaveProperty('name');
        expect(phase).toHaveProperty('order');
        expect(phase).toHaveProperty('durationEstimate');
        expect(phase).toHaveProperty('objectives');
        expect(phase).toHaveProperty('participatingAgents');
        expect(phase).toHaveProperty('deliverables');
        expect(phase).toHaveProperty('qualityGateCriteria');
        expect(phase).toHaveProperty('exampleArtifacts');
        expect(phase).toHaveProperty('color');

        // Validate types
        expect(typeof phase.id).toBe('string');
        expect(typeof phase.name).toBe('string');
        expect(typeof phase.order).toBe('number');
        expect(typeof phase.durationEstimate).toBe('string');
        expect(Array.isArray(phase.objectives)).toBe(true);
        expect(Array.isArray(phase.participatingAgents)).toBe(true);
        expect(Array.isArray(phase.deliverables)).toBe(true);
        expect(Array.isArray(phase.qualityGateCriteria)).toBe(true);
      });
    });

    it('should have unique IDs for all phases', () => {
      const ids = phases.map((phase) => phase.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(phases.length);
    });

    it('should have sequential order numbers 1-5', () => {
      const orders = phases.map((phase) => phase.order).sort();
      expect(orders).toEqual([1, 2, 3, 4, 5]);
    });

    it('should have correct phase IDs in order', () => {
      expect(getPhaseByOrder(1)?.id).toBe('discovery');
      expect(getPhaseByOrder(2)?.id).toBe('design');
      expect(getPhaseByOrder(3)?.id).toBe('implementation');
      expect(getPhaseByOrder(4)?.id).toBe('qa');
      expect(getPhaseByOrder(5)?.id).toBe('compliance');
    });

    it('should have at least 3 objectives per phase', () => {
      phases.forEach((phase) => {
        expect(phase.objectives.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have at least 3 deliverables per phase', () => {
      phases.forEach((phase) => {
        expect(phase.deliverables.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have at least 3 quality gate criteria per phase', () => {
      phases.forEach((phase) => {
        expect(phase.qualityGateCriteria.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have participating agents for each phase', () => {
      phases.forEach((phase) => {
        expect(phase.participatingAgents.length).toBeGreaterThan(0);
      });
    });

    it('should have valid color assignments', () => {
      const validColors = ['areas', 'projects', 'resources', 'qa', 'compliance'];
      phases.forEach((phase) => {
        expect(validColors).toContain(phase.color);
      });
    });
  });

  describe('getPhaseById', () => {
    it('should return phase by valid ID', () => {
      const phase = getPhaseById('discovery');
      expect(phase).toBeDefined();
      expect(phase?.name).toBe('Discovery');
      expect(phase?.order).toBe(1);
    });

    it('should return undefined for invalid ID', () => {
      const phase = getPhaseById('non-existent-phase');
      expect(phase).toBeUndefined();
    });

    it('should find all phases by their IDs', () => {
      const phaseIds = ['discovery', 'design', 'implementation', 'qa', 'compliance'];
      phaseIds.forEach((id) => {
        const phase = getPhaseById(id);
        expect(phase).toBeDefined();
        expect(phase?.id).toBe(id);
      });
    });
  });

  describe('getPhaseByOrder', () => {
    it('should return phase by order number', () => {
      const phase = getPhaseByOrder(1);
      expect(phase).toBeDefined();
      expect(phase?.id).toBe('discovery');
    });

    it('should return undefined for invalid order', () => {
      expect(getPhaseByOrder(0)).toBeUndefined();
      expect(getPhaseByOrder(6)).toBeUndefined();
    });

    it('should return all phases by order 1-5', () => {
      for (let i = 1; i <= 5; i++) {
        const phase = getPhaseByOrder(i);
        expect(phase).toBeDefined();
        expect(phase?.order).toBe(i);
      }
    });
  });

  describe('getNextPhase', () => {
    it('should return next phase in sequence', () => {
      const nextPhase = getNextPhase('discovery');
      expect(nextPhase).toBeDefined();
      expect(nextPhase?.id).toBe('design');
      expect(nextPhase?.order).toBe(2);
    });

    it('should return undefined for last phase', () => {
      const nextPhase = getNextPhase('compliance');
      expect(nextPhase).toBeUndefined();
    });

    it('should navigate through all phases correctly', () => {
      expect(getNextPhase('discovery')?.id).toBe('design');
      expect(getNextPhase('design')?.id).toBe('implementation');
      expect(getNextPhase('implementation')?.id).toBe('qa');
      expect(getNextPhase('qa')?.id).toBe('compliance');
      expect(getNextPhase('compliance')).toBeUndefined();
    });

    it('should return undefined for invalid phase ID', () => {
      const nextPhase = getNextPhase('invalid-phase');
      expect(nextPhase).toBeUndefined();
    });
  });

  describe('getPreviousPhase', () => {
    it('should return previous phase in sequence', () => {
      const prevPhase = getPreviousPhase('design');
      expect(prevPhase).toBeDefined();
      expect(prevPhase?.id).toBe('discovery');
      expect(prevPhase?.order).toBe(1);
    });

    it('should return undefined for first phase', () => {
      const prevPhase = getPreviousPhase('discovery');
      expect(prevPhase).toBeUndefined();
    });

    it('should navigate backward through all phases correctly', () => {
      expect(getPreviousPhase('compliance')?.id).toBe('qa');
      expect(getPreviousPhase('qa')?.id).toBe('implementation');
      expect(getPreviousPhase('implementation')?.id).toBe('design');
      expect(getPreviousPhase('design')?.id).toBe('discovery');
      expect(getPreviousPhase('discovery')).toBeUndefined();
    });

    it('should return undefined for invalid phase ID', () => {
      const prevPhase = getPreviousPhase('invalid-phase');
      expect(prevPhase).toBeUndefined();
    });
  });
});
