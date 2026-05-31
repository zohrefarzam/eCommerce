'use client';

import {
  Checkbox as HeroUICheckbox,
  type CheckboxProps as HeroUICheckboxProps,
} from '@heroui/react';
import { type ReactNode } from 'react';
import { cn } from '@/components/base/_lib/utils';

export type BaseCheckboxProps = Omit<
  HeroUICheckboxProps,
  'children' | 'className'
> & {
  children?: ReactNode;
  /** Classes merged onto the outer label (root). */
  className?: string;
  /** Classes merged onto the visual control box. */
  controlClassName?: string;
  /** Classes merged onto the indicator (checkmark). */
  indicatorClassName?: string;
  /** Classes merged onto the text content slot. */
  contentClassName?: string;
};

const rootClass =
  'group inline-flex cursor-pointer items-center gap-2.5 rounded-lg text-sm text-foreground transition ' +
  'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50';

const controlClass =
  'flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-muted/40 bg-background transition ' +
  'before:!bg-foreground before:!rounded-[3px] ' +
  'group-data-[hovered]:border-muted/60 ' +
  'group-data-[selected]:border-foreground group-data-[selected]:bg-foreground ' +
  'group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-foreground/20';

const indicatorClass = 'size-3 text-background';

const contentClass = 'min-w-0 flex-1';

export function Checkbox({
  className,
  controlClassName,
  indicatorClassName,
  contentClassName,
  children,
  ...props
}: BaseCheckboxProps) {
  return (
    <HeroUICheckbox {...props} className={cn(rootClass, className)}>
      <HeroUICheckbox.Control className={cn(controlClass, controlClassName)}>
        <HeroUICheckbox.Indicator
          className={cn(indicatorClass, indicatorClassName)}
        />
      </HeroUICheckbox.Control>
      {children !== undefined ? (
        <HeroUICheckbox.Content className={cn(contentClass, contentClassName)}>
          {children}
        </HeroUICheckbox.Content>
      ) : null}
    </HeroUICheckbox>
  );
}

Checkbox.displayName = 'Checkbox';
