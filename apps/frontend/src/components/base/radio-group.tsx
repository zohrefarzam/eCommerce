'use client';

import {
  RadioGroup as HeroUIRadioGroup,
  type RadioGroupProps as HeroUIRadioGroupProps,
} from '@heroui/react';
import { cn } from '@/components/base/_lib/utils';

export type BaseRadioGroupProps = HeroUIRadioGroupProps;

export function RadioGroup({ className, ...props }: BaseRadioGroupProps) {
  const mergedClass =
    typeof className === 'function'
      ? className
      : cn('flex flex-col gap-3', className);

  return <HeroUIRadioGroup className={mergedClass} {...props} />;
}

RadioGroup.Root = HeroUIRadioGroup.Root;
