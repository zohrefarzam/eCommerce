'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/components/base/_lib/utils';

export type BaseTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, BaseTextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full min-h-[7.5rem] resize-y rounded-lg border border-muted/25 bg-input-bg px-4 py-3',
        'text-sm text-foreground outline-none transition',
        'placeholder:text-muted',
        'focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10',
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
