'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helpText, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-fg">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'px-3 py-2 text-base rounded-md border border-border',
          'bg-bg-alt text-fg placeholder:text-fg-muted',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-0 focus:border-brand-accent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
      {helpText && <span className="text-xs text-fg-muted">{helpText}</span>}
    </div>
  )
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helpText, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-fg">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          'px-3 py-2 text-base rounded-md border border-border',
          'bg-bg-alt text-fg placeholder:text-fg-muted',
          'transition-colors duration-200 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-0 focus:border-brand-accent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
      {helpText && <span className="text-xs text-fg-muted">{helpText}</span>}
    </div>
  )
);
Textarea.displayName = 'Textarea';
