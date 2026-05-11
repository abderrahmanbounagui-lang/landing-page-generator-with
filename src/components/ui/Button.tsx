'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const getButtonClasses = (variant: ButtonVariant, size: ButtonSize) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent';

  const variantClasses = {
    primary: 'bg-brand-accent text-white hover:opacity-90 active:opacity-80',
    secondary: 'border border-border text-fg hover:bg-border-light active:bg-border',
    ghost: 'text-fg hover:text-brand-accent hover:underline',
    destructive: 'bg-red-600 text-white hover:opacity-90 active:opacity-80',
  }[variant];

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-base',
  }[size];

  return cn(baseClasses, variantClasses, sizeClasses);
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props },
    ref
  ) => (
    <button
      className={cn(getButtonClasses(variant, size), className)}
      disabled={isLoading || disabled}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
);
Button.displayName = 'Button';

// Spinner component
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  return (
    <div className={cn('animate-spin-subtle', sizeClass, className)}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};
