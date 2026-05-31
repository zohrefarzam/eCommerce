import type { OrderStatus } from '@/app/profile/orders/_lib/api/types';
import type { Locale } from '@/i18n/config';

export const ordersQueryKeys = {
  all: ['orders'] as const,
  lists: () => [...ordersQueryKeys.all, 'list'] as const,
  list: (locale: Locale, status?: OrderStatus) =>
    [...ordersQueryKeys.lists(), { locale, status }] as const,
};
