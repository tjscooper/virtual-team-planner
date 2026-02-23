import { describe, it, expect } from 'vitest';
import { cn } from '../cn';

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toBe('text-red-500 bg-blue-500');
  });

  it('should handle conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
    expect(result).toContain('base-class');
    expect(result).toContain('conditional-class');
    expect(result).not.toContain('hidden-class');
  });

  it('should merge conflicting Tailwind classes correctly', () => {
    const result = cn('px-4 py-2', 'px-6');
    expect(result).toContain('px-6');
    expect(result).not.toContain('px-4');
    expect(result).toContain('py-2');
  });

  it('should handle undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'another-class');
    expect(result).toBe('base-class another-class');
  });

  it('should handle empty strings', () => {
    const result = cn('base-class', '', 'another-class');
    expect(result).toBe('base-class another-class');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['class-1', 'class-2'], 'class-3');
    expect(result).toContain('class-1');
    expect(result).toContain('class-2');
    expect(result).toContain('class-3');
  });

  it('should handle objects with boolean values', () => {
    const result = cn({
      'active-class': true,
      'inactive-class': false,
      'another-active': true,
    });
    expect(result).toContain('active-class');
    expect(result).toContain('another-active');
    expect(result).not.toContain('inactive-class');
  });

  it('should return empty string for no arguments', () => {
    const result = cn();
    expect(result).toBe('');
  });
});
