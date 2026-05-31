'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCheckoutOrdersStore } from '@/app/checkout/_lib/checkout-orders-store';
import {
  orderMatchesSearchQuery,
  type OrderStatus,
  type ProfileOrder,
} from '@/app/profile/_lib/profile-orders-data';
import { toProfileOrder } from '@/app/profile/orders/_lib/api/mappers';
import { ordersQueryKeys } from '@/app/profile/orders/_lib/api/query-keys';
import { fetchOrders } from '@/app/profile/orders/_lib/api/service';
import { useLocale } from '@/i18n';

/** Single fetch for all orders — filter by status/search on the client. */
export function useOrdersList(includePlacedOrders = true) {
  const { locale } = useLocale();
  const placedOrders = useCheckoutOrdersStore((s) => s.orders);

  const query = useQuery({
    queryKey: ordersQueryKeys.list(locale),
    queryFn: () => fetchOrders(),
  });

  const allOrders = useMemo(() => {
    const apiOrders = (query.data?.data ?? []).map(toProfileOrder);
    return includePlacedOrders
      ? mergePlacedOrders(apiOrders, placedOrders)
      : apiOrders;
  }, [query.data, placedOrders, includePlacedOrders]);

  return {
    ...query,
    allOrders,
  };
}

export function useOrderTabCounts(allOrders: ProfileOrder[]) {
  return useMemo(
    () => ({
      current: allOrders.filter((o) => o.status === 'current').length,
      delivered: allOrders.filter((o) => o.status === 'delivered').length,
      returned: allOrders.filter((o) => o.status === 'returned').length,
      cancelled: allOrders.filter((o) => o.status === 'cancelled').length,
    }),
    [allOrders],
  );
}

export function filterProfileOrders(
  allOrders: ProfileOrder[],
  options?: {
    status?: OrderStatus;
    searchQuery?: string;
  },
): ProfileOrder[] {
  const byStatus = options?.status
    ? allOrders.filter((order) => order.status === options.status)
    : allOrders;

  return byStatus.filter((order) =>
    orderMatchesSearchQuery(order, options?.searchQuery),
  );
}

function mergePlacedOrders(
  apiOrders: ProfileOrder[],
  placedOrders: ProfileOrder[],
): ProfileOrder[] {
  const seen = new Set(apiOrders.map((order) => order.id));
  const extra = placedOrders.filter((order) => !seen.has(order.id));
  return [...extra, ...apiOrders];
}
