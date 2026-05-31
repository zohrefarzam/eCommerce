import { apiFetch } from '@/lib/api/client';
import type {
  OrdersListParams,
  OrdersListResponse,
} from '@/app/profile/orders/_lib/api/types';

export function fetchOrders(params: OrdersListParams = {}) {
  return apiFetch<OrdersListResponse>('/profile/orders/api', {
    params: {
      status: params.status,
    },
  });
}

export type { OrderStatus } from '@/app/profile/orders/_lib/api/types';
