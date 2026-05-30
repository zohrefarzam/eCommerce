'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderStatus } from '@/lib/profile-orders-data';

type AdminOrdersState = {
  statusById: Record<string, OrderStatus>;
  setStatus: (orderId: string, status: OrderStatus) => void;
};

export const useAdminOrdersStore = create<AdminOrdersState>()(
  persist(
    (set) => ({
      statusById: {},
      setStatus: (orderId, status) =>
        set((state) => ({
          statusById: { ...state.statusById, [orderId]: status },
        })),
    }),
    {
      name: 'admin-orders',
      version: 1,
      partialize: (state) => ({ statusById: state.statusById }),
    },
  ),
);
