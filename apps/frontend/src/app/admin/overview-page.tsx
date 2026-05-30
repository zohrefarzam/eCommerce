'use client';

import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocale } from '@/i18n';
import { useAdminProductsStore } from '@/lib/admin-products-store';
import { useAdminCategoriesStore } from '@/lib/admin-categories-store';
import { useAuthStore } from '@/lib/auth-store';
import { useCheckoutOrdersStore } from '@/lib/checkout-orders-store';
import { getProfileOrders } from '@/lib/profile-orders-data';
import { AdminContentCard } from './_components/admin-shell';

type StatCard = {
  icon: string;
  label: string;
  value: string;
};

export function AdminOverviewPage() {
  const { messages, locale, config } = useLocale();
  const labels = messages.admin;
  const products = useAdminProductsStore((s) => s.products);
  const categories = useAdminCategoriesStore((s) => s.categories);
  const accounts = useAuthStore((s) => s.accounts);
  const placedOrders = useCheckoutOrdersStore((s) => s.orders);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const orders = useMemo(
    () => getProfileOrders(locale, mounted ? placedOrders : []),
    [locale, mounted, placedOrders],
  );
  const revenue = useMemo(
    () => orders.reduce((sum, order) => sum + order.total, 0),
    [orders],
  );
  const usersCount = Object.keys(accounts).length;

  const numberFormatter = new Intl.NumberFormat(config.herouiLocale);

  const cards: StatCard[] = [
    {
      icon: 'lucide:package',
      label: labels.statProducts,
      value: numberFormatter.format(products.length),
    },
    {
      icon: 'lucide:shopping-bag',
      label: labels.statOrders,
      value: numberFormatter.format(orders.length),
    },
    {
      icon: 'lucide:wallet',
      label: labels.statRevenue,
      value: numberFormatter.format(revenue),
    },
    {
      icon: 'lucide:users',
      label: labels.statUsers,
      value: numberFormatter.format(usersCount),
    },
  ];

  return (
    <AdminContentCard title={labels.overviewTitle}>
      {!mounted ? (
        <div className="flex justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-4 rounded-2xl border border-muted/20 bg-surface-secondary/40 px-5 py-5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-foreground">
                <Icon icon={card.icon} width={24} height={24} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-muted">{card.label}</p>
                <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminContentCard>
  );
}
