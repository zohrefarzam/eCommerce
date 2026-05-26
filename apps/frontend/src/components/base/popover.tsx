'use client';

import {
  Popover as HeroUIPopover,
  type PopoverProps as HeroUIPopoverProps,
  type PopoverContentProps,
  type PopoverTriggerProps,
} from '@heroui/react';
export type BasePopoverProps = HeroUIPopoverProps;

export function Popover(props: BasePopoverProps) {
  return <HeroUIPopover {...props} />;
}

export type BasePopoverTriggerProps = PopoverTriggerProps;
export type BasePopoverContentProps = PopoverContentProps;

Popover.Root = HeroUIPopover.Root;
Popover.Trigger = HeroUIPopover.Trigger;
Popover.Content = HeroUIPopover.Content;
Popover.Dialog = HeroUIPopover.Dialog;
Popover.Arrow = HeroUIPopover.Arrow;
Popover.Heading = HeroUIPopover.Heading;
