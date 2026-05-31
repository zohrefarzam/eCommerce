'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderStatus } from '@/app/profile/_lib/profile-orders-data';
import { useNotificationsStore } from '@/app/profile/_lib/notifications-store';

type AdminOrdersState = {
  statusById: Record<string, OrderStatus>;
  setStatus: (orderId: string, status: OrderStatus) => void;
};

export const useAdminOrdersStore = create<AdminOrdersState>()(
  persist(
    (set) => ({
      statusById: {},
      setStatus: (orderId, status) => {
        set((state) => ({
          statusById: { ...state.statusById, [orderId]: status },
        }));
        useNotificationsStore.getState().addNotification({
          type: 'order_status',
          orderId,
          status,
        });
      },
    }),
    {
      name: 'admin-orders',
      version: 1,
      partialize: (state) => ({ statusById: state.statusById }),
    },
  ),
);
