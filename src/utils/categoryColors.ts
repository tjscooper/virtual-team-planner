import { Category } from '../types';

export const categoryColors: Record<Category, string> = {
  discovery: 'areas',
  design: 'projects',
  implementation: 'resources',
  qa: 'qa',
  compliance: 'compliance',
};

export function getCategoryColor(category: Category): string {
  return categoryColors[category];
}

export function getCategoryBorderClass(category: Category): string {
  const colorMap: Record<Category, string> = {
    discovery: 'border-areas',
    design: 'border-projects',
    implementation: 'border-resources',
    qa: 'border-qa',
    compliance: 'border-compliance',
  };
  return colorMap[category];
}

export function getCategoryTextClass(category: Category): string {
  const colorMap: Record<Category, string> = {
    discovery: 'text-areas',
    design: 'text-projects',
    implementation: 'text-resources',
    qa: 'text-qa',
    compliance: 'text-compliance',
  };
  return colorMap[category];
}
