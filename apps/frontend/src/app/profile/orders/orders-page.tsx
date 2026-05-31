'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { Tabs } from '@/components/base/tabs';
import { useLocale } from '@/i18n';
import {
  filterProfileOrders,
  useOrderTabCounts,
  useOrdersList,
} from '@/app/profile/orders/_hooks/use-orders-query';
import type { OrderStatus } from '@/app/profile/_lib/profile-orders-data';
import type { ProfileOrder } from '@/app/profile/_lib/profile-orders-data';
import { ProfileContentCard } from '../_components/profile-shell';
import { OrderCard } from './_components/order-card';

const ORDER_TABS: OrderStatus[] = [
  'current',
  'delivered',
  'returned',
  'cancelled',
];

const TAB_LABELS: Record<
  OrderStatus,
  | 'ordersTabCurrent'
  | 'ordersTabDelivered'
  | 'ordersTabReturned'
  | 'ordersTabCancelled'
> = {
  current: 'ordersTabCurrent',
  delivered: 'ordersTabDelivered',
  returned: 'ordersTabReturned',
  cancelled: 'ordersTabCancelled',
};

export function ProfileOrdersPage() {
  const { messages } = useLocale();
  const labels = messages.account;
  const [mounted, setMounted] = useState(false);
  const [selectedTab, setSelectedTab] = useState<OrderStatus>('current');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { allOrders, isLoading, isError } = useOrdersList(mounted);
  const tabCounts = useOrderTabCounts(allOrders);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ProfileContentCard
      title={labels.ordersTitle}
      headerEnd={
        searchOpen ? (
          <div className="flex min-w-0 items-center gap-1">
            <Input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={labels.ordersSearch}
              aria-label={labels.ordersSearch}
              className="min-w-[10rem] sm:min-w-[14rem]"
              startContent={
                <Icon
                  icon="lucide:search"
                  width={16}
                  height={16}
                  className="text-muted"
                  aria-hidden
                />
              }
            />
            <Button
              variant="ghost"
              size="sm"
              aria-label={labels.cancel}
              className="h-auto min-h-0 shrink-0 p-2 text-muted"
              onPress={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
            >
              <Icon icon="lucide:x" width={18} height={18} aria-hidden />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            aria-label={labels.ordersSearch}
            className="h-auto min-h-0 p-2 text-muted"
            onPress={() => {
              setSearchOpen(true);
              requestAnimationFrame(() => searchInputRef.current?.focus());
            }}
          >
            <Icon icon="lucide:search" width={20} height={20} aria-hidden />
          </Button>
        )
      }
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="max-w-sm text-sm text-muted">
            {labels.ordersLoadError}
          </p>
        </div>
      ) : (
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => {
            if (key) setSelectedTab(String(key) as OrderStatus);
          }}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label={labels.ordersTitle}>
              {ORDER_TABS.map((status) => (
                <Tabs.Tab key={status} id={status}>
                  {labels[TAB_LABELS[status]]}
                  {tabCounts[status] > 0 ? (
                    <span className="rounded-md bg-surface-secondary px-1.5 py-0.5 text-xs font-normal tabular-nums text-muted">
                      {tabCounts[status]}
                    </span>
                  ) : null}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>

          {ORDER_TABS.map((status) => (
            <Tabs.Panel key={status} id={status}>
              <OrdersPanel
                allOrders={allOrders}
                status={status}
                searchQuery={searchQuery}
              />
            </Tabs.Panel>
          ))}
        </Tabs>
      )}
    </ProfileContentCard>
  );
}

function OrdersPanel({
  allOrders,
  status,
  searchQuery,
}: {
  allOrders: ProfileOrder[];
  status: OrderStatus;
  searchQuery: string;
}) {
  const { messages, locale } = useLocale();
  const labels = messages.account;
  const orders = filterProfileOrders(allOrders, { status, searchQuery });

  if (orders.length === 0) {
    const emptyMessage = searchQuery.trim()
      ? labels.ordersSearchNoResults
      : labels.ordersEmpty;

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-surface-secondary text-muted">
          <Icon
            icon="lucide:clipboard-list"
            width={40}
            height={40}
            aria-hidden
          />
        </div>
        <p className="mt-6 max-w-sm text-sm text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderCard order={order} locale={locale} labels={labels} />
        </li>
      ))}
    </ul>
  );
}
