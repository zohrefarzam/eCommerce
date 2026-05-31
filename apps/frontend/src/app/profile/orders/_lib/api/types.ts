export type OrderStatus = 'current' | 'delivered' | 'returned' | 'cancelled';

export type OrderItemDto = {
  image: string;
  alt: string;
};

export type OrderDto = {
  id: string;
  status: OrderStatus;
  dateLabel: string;
  total: number;
  clubPoints?: number;
  items: OrderItemDto[];
};

export type OrdersListResponse = {
  data: OrderDto[];
};

export type OrdersListParams = {
  status?: OrderStatus;
};
