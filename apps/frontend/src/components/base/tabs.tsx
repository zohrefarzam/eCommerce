'use client';

import {
  Tabs as HeroUITabs,
  type TabsRootProps as HeroUITabsRootProps,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
} from '@heroui/react';
import { cn } from '@/lib/utils';

export type BaseTabsProps = HeroUITabsRootProps;

const rootClass = 'flex w-full flex-col';

const listContainerClass =
  'w-full overflow-x-auto border-b border-muted/15 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

const listClass =
  'flex w-max min-w-full flex-row flex-nowrap items-end gap-6 !bg-transparent !p-0 !shadow-none';

const tabClass =
  'relative inline-flex w-auto shrink-0 flex-none flex-row items-center gap-2 !rounded-none !border-0 !bg-transparent !px-0 !pb-3 !pt-0 !text-sm !font-normal !text-muted !shadow-none ' +
  'whitespace-nowrap transition hover:!text-foreground data-[selected]:!font-semibold data-[selected]:!text-foreground ' +
  'data-[hovered]:!bg-transparent data-[focus-visible]:!outline-none ' +
  'after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-foreground after:opacity-0 after:content-[""] ' +
  'data-[selected]:after:opacity-100';

const panelClass = '!px-0 !pt-6';

export function Tabs({ className, children, ...props }: BaseTabsProps) {
  return (
    <HeroUITabs
      orientation="horizontal"
      className={cn(rootClass, className)}
      {...props}
    >
      {children}
    </HeroUITabs>
  );
}

function TabsListContainer({
  className,
  children,
  ...props
}: React.ComponentProps<typeof HeroUITabs.ListContainer>) {
  return (
    <HeroUITabs.ListContainer
      className={cn(listContainerClass, className)}
      {...props}
    >
      {children}
    </HeroUITabs.ListContainer>
  );
}

function TabsList({ className, children, ...props }: TabListProps) {
  return (
    <HeroUITabs.List className={cn(listClass, className)} {...props}>
      {children}
    </HeroUITabs.List>
  );
}

function TabsTab({ className, children, ...props }: TabProps) {
  return (
    <HeroUITabs.Tab className={cn(tabClass, className)} {...props}>
      {children}
    </HeroUITabs.Tab>
  );
}

function TabsPanel({ className, children, ...props }: TabPanelProps) {
  return (
    <HeroUITabs.Panel className={cn(panelClass, className)} {...props}>
      {children}
    </HeroUITabs.Panel>
  );
}

Tabs.ListContainer = TabsListContainer;
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.Indicator = HeroUITabs.Indicator;
Tabs.Separator = HeroUITabs.Separator;
