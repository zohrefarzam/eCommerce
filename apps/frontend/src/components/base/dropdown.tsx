'use client';

import {
  Dropdown as HeroUIDropdown,
  type DropdownProps as HeroUIDropdownProps,
  type DropdownPopoverProps,
  type DropdownTriggerProps,
} from '@heroui/react';
import { cn } from '@/components/base/_lib/utils';

export type BaseDropdownProps = HeroUIDropdownProps;

export function Dropdown({ className, ...props }: BaseDropdownProps) {
  return <HeroUIDropdown className={cn(className)} {...props} />;
}

export type BaseDropdownTriggerProps = DropdownTriggerProps;
export type BaseDropdownPopoverProps = DropdownPopoverProps;

Dropdown.Root = HeroUIDropdown.Root;
Dropdown.Trigger = HeroUIDropdown.Trigger;
Dropdown.Popover = HeroUIDropdown.Popover;
Dropdown.Menu = HeroUIDropdown.Menu;
Dropdown.Section = HeroUIDropdown.Section;
Dropdown.Item = HeroUIDropdown.Item;
