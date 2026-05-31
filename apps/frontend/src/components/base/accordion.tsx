'use client';

import {
  Accordion as HeroUIAccordion,
  type AccordionProps as HeroUIAccordionProps,
} from '@heroui/react';
import { type Key, type ReactNode } from 'react';
import { cn } from '@/components/base/_lib/utils';

export type BaseAccordionProps = Omit<
  HeroUIAccordionProps,
  'children' | 'className'
> & {
  className?: string;
  children: ReactNode;
};

const rootClass = 'flex w-full flex-col gap-0';

const itemClass =
  'border-b border-muted/15 pb-0 last:border-b-0 [&::after]:!hidden';

const triggerClass =
  'flex w-full items-center justify-between gap-2 !px-0 !py-1 !text-start !text-sm !font-semibold !text-foreground ' +
  'hover:!bg-transparent data-[hovered]:!bg-transparent data-[expanded]:!bg-transparent';

const indicatorClass =
  '!m-0 !size-4 shrink-0 !text-muted data-[expanded=true]:!-rotate-180';

/* Keep vertical clip for height animation; allow horizontal overflow for slider thumbs. */
const panelClass = '!overflow-x-visible !overflow-y-clip !px-0';

const bodyClass = '!px-0 !pb-4 !pt-3 !text-foreground';

export function Accordion({
  className,
  children,
  ...props
}: BaseAccordionProps) {
  return (
    <HeroUIAccordion
      {...props}
      hideSeparator
      className={cn(rootClass, className)}
    >
      {children}
    </HeroUIAccordion>
  );
}

export type AccordionSectionProps = {
  id: Key;
  title: string;
  children: ReactNode;
  className?: string;
};

export function AccordionSection({
  id,
  title,
  children,
  className,
}: AccordionSectionProps) {
  return (
    <HeroUIAccordion.Item id={id} className={cn(itemClass, className)}>
      <HeroUIAccordion.Heading className="w-full">
        <HeroUIAccordion.Trigger className={triggerClass}>
          <span className="min-w-0 flex-1">{title}</span>
          <HeroUIAccordion.Indicator className={indicatorClass} />
        </HeroUIAccordion.Trigger>
      </HeroUIAccordion.Heading>
      <HeroUIAccordion.Panel className={panelClass}>
        <HeroUIAccordion.Body className={bodyClass}>
          {children}
        </HeroUIAccordion.Body>
      </HeroUIAccordion.Panel>
    </HeroUIAccordion.Item>
  );
}

Accordion.displayName = 'Accordion';
AccordionSection.displayName = 'AccordionSection';
