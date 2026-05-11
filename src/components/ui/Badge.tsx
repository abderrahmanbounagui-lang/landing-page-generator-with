'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const getBadgeClasses = (variant: BadgeVariant) => {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium';

  const variantClasses = {
    default: 'bg-border-light text-fg',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  }[variant];

  return cn(baseClasses, variantClasses);
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(getBadgeClasses(variant), className)}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';
