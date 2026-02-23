import { HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Category } from '../../types';
import { getCategoryTextClass } from '../../utils/categoryColors';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Category | 'default';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variantStyles = variant !== 'default' ? getCategoryTextClass(variant) : 'text-gray-300';

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
        'bg-white/10 border border-white/20',
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
