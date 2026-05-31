'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/i18n/config';
import type { CartLineItem } from '@/app/cart/_lib/cart-store';
import type { ProfileOrder } from '@/app/profile/_lib/profile-orders-data';
import { useNotificationsStore } from '@/app/profile/_lib/notifications-store';

type PlaceOrderInput = {
  items: readonly CartLineItem[];
  locale: Locale;
  total: number;
};

type CheckoutOrdersState = {
  orders: ProfileOrder[];
  placeOrder: (input: PlaceOrderInput) => string;
  getOrderById: (id: string) => ProfileOrder | undefined;
};

function formatOrderDateLabel(locale: Locale): string {
  const date = new Date();
  if (locale === 'fa') {
    return date.toLocaleDateString('fa-IR');
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function generateOrderId(): string {
  return String(Date.now()).slice(-9);
}

export const useCheckoutOrdersStore = create<CheckoutOrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: ({ items, locale, total }) => {
        const id = generateOrderId();
        const order: ProfileOrder = {
          id,
          status: 'current',
          dateLabel: formatOrderDateLabel(locale),
          total,
          items: items.map((item) => ({
            image: item.image,
            alt: item.imageAlt,
          })),
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        useNotificationsStore.getState().addNotification({
          type: 'order_placed',
          orderId: id,
        });
        return id;
      },

      getOrderById: (id) => get().orders.find((order) => order.id === id),
    }),
    {
      name: 'storefront-checkout-orders',
      version: 1,
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);
