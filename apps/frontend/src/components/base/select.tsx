'use client';

import {
  ListBox,
  ListBoxItem,
  Select as HeroUISelect,
  type SelectProps as HeroUISelectProps,
} from '@heroui/react';
import { type Key, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type SelectOption<K extends Key = string> = {
  id: K;
  label: string;
  disabled?: boolean;
};

export type BaseSelectProps<K extends Key = string> = Omit<
  HeroUISelectProps,
  'children' | 'className' | 'selectedKey' | 'onSelectionChange'
> & {
  options: ReadonlyArray<SelectOption<K>>;
  selectedKey: K;
  onSelectionChange: (key: K) => void;
  placeholder?: string;
  /** Classes merged onto the trigger button. */
  className?: string;
  /** Classes merged onto the popover surface. */
  popoverClassName?: string;
  startContent?: ReactNode;
};

const triggerClass =
  'group flex w-full min-h-9 items-center justify-between gap-2 rounded-lg border border-muted/20 bg-input-bg ps-3 pe-3 py-2 text-sm font-medium text-foreground shadow-none transition ' +
  'hover:bg-input-bg-hover hover:border-muted/30 ' +
  'focus:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-foreground/12 ' +
  'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50';

const valueClass =
  'min-w-0 flex-1 truncate text-start text-sm font-medium text-foreground';

/* Override HeroUI's absolute-positioned indicator so it flows inline (RTL-friendly). */
const indicatorClass =
  '!static !inset-auto size-4 shrink-0 text-muted transition-transform data-[open=true]:rotate-180';

const popoverClass =
  'z-50 min-w-[var(--trigger-width)] overflow-hidden rounded-lg border border-muted/15 bg-surface p-1 shadow-lg';

const itemClass =
  'flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-foreground outline-none transition ' +
  'data-[hovered]:bg-foreground/5 data-[focused]:bg-foreground/5 ' +
  'data-[selected]:font-semibold data-[selected]:bg-foreground/8 ' +
  'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50';

export function Select<K extends Key = string>({
  options,
  selectedKey,
  onSelectionChange,
  placeholder,
  className,
  popoverClassName,
  startContent,
  ...props
}: BaseSelectProps<K>) {
  const selected = options.find((opt) => opt.id === selectedKey);

  return (
    <HeroUISelect
      {...props}
      selectedKey={selectedKey}
      onSelectionChange={(key) => onSelectionChange(key as K)}
      className="inline-flex w-full"
    >
      <HeroUISelect.Trigger className={cn(triggerClass, className)}>
        {startContent ? (
          <span className="flex shrink-0 items-center text-muted">
            {startContent}
          </span>
        ) : null}
        <HeroUISelect.Value className={valueClass}>
          {selected?.label ?? placeholder ?? ''}
        </HeroUISelect.Value>
        <HeroUISelect.Indicator className={indicatorClass} />
      </HeroUISelect.Trigger>
      <HeroUISelect.Popover className={cn(popoverClass, popoverClassName)}>
        <ListBox className="flex max-h-60 flex-col gap-0.5 overflow-y-auto outline-none">
          {options.map((opt) => (
            <ListBoxItem
              key={String(opt.id)}
              id={opt.id}
              textValue={opt.label}
              isDisabled={opt.disabled}
              className={itemClass}
            >
              {opt.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </HeroUISelect.Popover>
    </HeroUISelect>
  );
}

Select.displayName = 'Select';
