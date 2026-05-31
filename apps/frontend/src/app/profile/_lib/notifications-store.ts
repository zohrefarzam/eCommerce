'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderStatus } from '@/app/profile/_lib/profile-orders-data';

export type Notification =
  | {
      id: string;
      type: 'order_placed';
      orderId: string;
      read: boolean;
      createdAt: number;
    }
  | {
      id: string;
      type: 'order_status';
      orderId: string;
      status: OrderStatus;
      read: boolean;
      createdAt: number;
    };

type AddNotificationInput =
  | { type: 'order_placed'; orderId: string }
  | { type: 'order_status'; orderId: string; status: OrderStatus };

type NotificationsState = {
  items: Notification[];
  addNotification: (input: AddNotificationInput) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
};

function generateNotificationId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      items: [],

      addNotification: (input) => {
        const notification: Notification = {
          id: generateNotificationId(),
          read: false,
          createdAt: Date.now(),
          ...input,
        } as Notification;

        set({ items: [notification, ...get().items] });
      },

      markAsRead: (id) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, read: true } : item,
          ),
        });
      },

      markAllAsRead: () => {
        set({
          items: get().items.map((item) => ({ ...item, read: true })),
        });
      },

      removeNotification: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
    }),
    {
      name: 'storefront-notifications',
      version: 1,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function selectUnreadCount(state: NotificationsState): number {
  return state.items.filter((item) => !item.read).length;
}
