import {
  getProfileOrders,
  type ProfileOrder,
} from '@/app/profile/_lib/profile-orders-data';
import { serializeImageSource } from '@/lib/api/serialize';
import type {
  OrderDto,
  OrdersListParams,
  OrdersListResponse,
} from '@/app/profile/orders/_lib/api/types';
import type { Locale } from '@/i18n/config';

function toOrderDto(order: ProfileOrder): OrderDto {
  return {
    id: order.id,
    status: order.status,
    dateLabel: order.dateLabel,
    total: order.total,
    clubPoints: order.clubPoints,
    items: order.items.map((item) => ({
      alt: item.alt,
      image: serializeImageSource(item.image),
    })),
  };
}

export function mockOrdersList(
  locale: Locale,
  params: OrdersListParams = {},
): OrdersListResponse {
  const orders = getProfileOrders(locale);
  const filtered = params.status
    ? orders.filter((order) => order.status === params.status)
    : orders;

  return {
    data: filtered.map(toOrderDto),
  };
}
