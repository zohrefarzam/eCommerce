'use client';

import {
  Radio as HeroUIRadio,
  type RadioProps as HeroUIRadioProps,
} from '@heroui/react';
import { type ReactNode } from 'react';
import { cn } from '@/components/base/_lib/utils';

export type BaseRadioProps = Omit<
  HeroUIRadioProps,
  'children' | 'className'
> & {
  children?: ReactNode;
  className?: string;
  controlClassName?: string;
};

const rootClass =
  'group/radio inline-flex w-full cursor-pointer items-start gap-3 text-foreground transition ' +
  'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50';

/** Override HeroUI field styles — use a true circle, not rounded-lg square. */
const controlClass =
  '!mt-0.5 !inline-flex !size-[18px] !min-h-[18px] !min-w-[18px] !shrink-0 !items-center !justify-center ' +
  '!rounded-full !border-2 !border-muted/40 !bg-background !shadow-none ' +
  'group-data-[selected]/radio:!border-foreground group-data-[selected]/radio:!bg-foreground ' +
  'group-data-[focus-visible]/radio:ring-2 group-data-[focus-visible]/radio:ring-foreground/15';

/** Disable HeroUI’s full-bleed ::before dot (causes half-moon glitch in RTL). */
const indicatorClass =
  '!relative !inset-auto flex !size-full !items-center !justify-center ' +
  '[&::before]:!hidden [&::before]:!content-none';

const dotClass =
  'block size-2 shrink-0 rounded-full bg-background scale-0 transition-transform duration-200 ' +
  'group-data-[selected]/radio:scale-100';

export function Radio({
  className,
  controlClassName,
  children,
  ...props
}: BaseRadioProps) {
  return (
    <HeroUIRadio {...props} className={cn(rootClass, className)}>
      <HeroUIRadio.Control className={cn(controlClass, controlClassName)}>
        <HeroUIRadio.Indicator className={indicatorClass}>
          <span className={dotClass} aria-hidden />
        </HeroUIRadio.Indicator>
      </HeroUIRadio.Control>
      {children !== undefined ? (
        <HeroUIRadio.Content className="min-w-0 flex-1">
          {children}
        </HeroUIRadio.Content>
      ) : null}
    </HeroUIRadio>
  );
}

Radio.displayName = 'Radio';
