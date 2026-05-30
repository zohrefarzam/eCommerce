'use client';

import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { Select } from '@/components/base/select';
import { useLocale } from '@/i18n';
import { useCheckoutOrdersStore } from '@/lib/checkout-orders-store';
import { useAdminOrdersStore } from '@/lib/admin-orders-store';
import { getProfileOrders, type OrderStatus } from '@/lib/profile-orders-data';
import { AdminContentCard } from '../_components/admin-shell';

const ORDER_STATUSES: OrderStatus[] = [
  'current',
  'delivered',
  'returned',
  'cancelled',
];

const STATUS_LABEL_KEYS: Record<
  OrderStatus,
  | 'orderStatusCurrent'
  | 'orderStatusDelivered'
  | 'orderStatusReturned'
  | 'orderStatusCancelled'
> = {
  current: 'orderStatusCurrent',
  delivered: 'orderStatusDelivered',
  returned: 'orderStatusReturned',
  cancelled: 'orderStatusCancelled',
};

export function AdminOrdersPage() {
  const { messages, locale, config } = useLocale();
  const labels = messages.admin;
  const accountLabels = messages.account;
  const statusById = useAdminOrdersStore((s) => s.statusById);
  const setStatus = useAdminOrdersStore((s) => s.setStatus);
  const placedOrders = useCheckoutOrdersStore((s) => s.orders);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const orders = useMemo(() => {
    const merged = getProfileOrders(locale, mounted ? placedOrders : []);
    return merged.map((order) => ({
      ...order,
      status: statusById[order.id] ?? order.status,
    }));
  }, [locale, mounted, placedOrders, statusById]);
  const numberFormatter = new Intl.NumberFormat(config.herouiLocale);

  const statusOptions = ORDER_STATUSES.map((status) => ({
    id: status,
    label: accountLabels[STATUS_LABEL_KEYS[status]],
  }));

  return (
    <AdminContentCard title={labels.ordersTitle}>
      {!mounted ? (
        <div className="flex justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-surface-secondary text-muted">
            <Icon
              icon="lucide:clipboard-list"
              width={40}
              height={40}
              aria-hidden
            />
          </div>
          <p className="mt-6 max-w-sm text-sm text-muted">
            {labels.emptyOrders}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-muted/15 text-xs font-semibold uppercase text-muted">
                <th className="px-3 py-3 text-start">{labels.orderColId}</th>
                <th className="px-3 py-3 text-start">{labels.orderColDate}</th>
                <th className="px-3 py-3 text-start">{labels.orderColTotal}</th>
                <th className="px-3 py-3 text-start">
                  {labels.orderColStatus}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const currentStatus = statusById[order.id] ?? order.status;
                return (
                  <tr
                    key={order.id}
                    className="border-b border-muted/10 last:border-0"
                  >
                    <td className="px-3 py-3 font-medium text-foreground tabular-nums">
                      {order.id}
                    </td>
                    <td className="px-3 py-3 text-muted">{order.dateLabel}</td>
                    <td className="px-3 py-3 text-foreground tabular-nums">
                      {numberFormatter.format(order.total)}
                    </td>
                    <td className="px-3 py-3">
                      <div className="max-w-[12rem]">
                        <Select
                          options={statusOptions}
                          selectedKey={currentStatus}
                          onSelectionChange={(status) =>
                            setStatus(order.id, status)
                          }
                          aria-label={labels.orderColStatus}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminContentCard>
  );
}
