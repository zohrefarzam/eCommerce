import type { ProfileOrder } from '@/app/profile/_lib/profile-orders-data';
import type { OrderDto } from '@/app/profile/orders/_lib/api/types';

export function toProfileOrder(order: OrderDto): ProfileOrder {
  return {
    id: order.id,
    status: order.status,
    dateLabel: order.dateLabel,
    total: order.total,
    clubPoints: order.clubPoints,
    items: order.items.map((item) => ({
      alt: item.alt,
      image: item.image,
    })),
  };
}
