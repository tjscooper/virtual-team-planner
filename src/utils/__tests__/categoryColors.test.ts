import { describe, it, expect } from 'vitest';
import { getCategoryColor, getCategoryBorderClass, getCategoryTextClass } from '../categoryColors';
import { Category } from '../../types';

describe('categoryColors utility', () => {
  const allCategories: Category[] = ['discovery', 'design', 'implementation', 'qa', 'compliance'];

  describe('getCategoryColor', () => {
    it('should return color for discovery category', () => {
      expect(getCategoryColor('discovery')).toBe('areas');
    });

    it('should return color for design category', () => {
      expect(getCategoryColor('design')).toBe('projects');
    });

    it('should return color for implementation category', () => {
      expect(getCategoryColor('implementation')).toBe('resources');
    });

    it('should return color for qa category', () => {
      expect(getCategoryColor('qa')).toBe('qa');
    });

    it('should return color for compliance category', () => {
      expect(getCategoryColor('compliance')).toBe('compliance');
    });

    it('should return valid color for all categories', () => {
      allCategories.forEach((category) => {
        const color = getCategoryColor(category);
        expect(color).toBeTruthy();
        expect(typeof color).toBe('string');
      });
    });
  });

  describe('getCategoryBorderClass', () => {
    it('should return correct border class for discovery', () => {
      expect(getCategoryBorderClass('discovery')).toBe('border-areas');
    });

    it('should return correct border class for design', () => {
      expect(getCategoryBorderClass('design')).toBe('border-projects');
    });

    it('should return correct border class for implementation', () => {
      expect(getCategoryBorderClass('implementation')).toBe('border-resources');
    });

    it('should return correct border class for qa', () => {
      expect(getCategoryBorderClass('qa')).toBe('border-qa');
    });

    it('should return correct border class for compliance', () => {
      expect(getCategoryBorderClass('compliance')).toBe('border-compliance');
    });

    it('should return valid Tailwind border class for all categories', () => {
      allCategories.forEach((category) => {
        const borderClass = getCategoryBorderClass(category);
        expect(borderClass).toMatch(/^border-/);
      });
    });
  });

  describe('getCategoryTextClass', () => {
    it('should return correct text class for discovery', () => {
      expect(getCategoryTextClass('discovery')).toBe('text-areas');
    });

    it('should return correct text class for design', () => {
      expect(getCategoryTextClass('design')).toBe('text-projects');
    });

    it('should return correct text class for implementation', () => {
      expect(getCategoryTextClass('implementation')).toBe('text-resources');
    });

    it('should return correct text class for qa', () => {
      expect(getCategoryTextClass('qa')).toBe('text-qa');
    });

    it('should return correct text class for compliance', () => {
      expect(getCategoryTextClass('compliance')).toBe('text-compliance');
    });

    it('should return valid Tailwind text class for all categories', () => {
      allCategories.forEach((category) => {
        const textClass = getCategoryTextClass(category);
        expect(textClass).toMatch(/^text-/);
      });
    });
  });
});
