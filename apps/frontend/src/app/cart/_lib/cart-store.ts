'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ShowcaseProduct } from '@/landing/_content/types';
import type { ImageSource } from '@/components/base/_lib/image-source';

export type CartLineItem = {
  lineId: string;
  productId: string;
  name: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  imageAlt: string;
  quantity: number;
  colorId?: string;
  colorLabel?: string;
  storageGb?: number;
  storageLabel?: string;
};

export type AddToCartInput = {
  productId: string;
  name: string;
  price: string;
  compareAtPrice?: string;
  image: ImageSource;
  imageAlt: string;
  quantity?: number;
  colorId?: string;
  colorLabel?: string;
  storageGb?: number;
  storageLabel?: string;
};

type CartState = {
  items: CartLineItem[];
  addItem: (input: AddToCartInput) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
};

export function buildCartLineId(params: {
  productId: string;
  colorId?: string;
  storageGb?: number;
}): string {
  const parts = [params.productId];
  if (params.colorId) parts.push(`c:${params.colorId}`);
  if (params.storageGb != null) parts.push(`s:${params.storageGb}`);
  return parts.join('|');
}

function imageSourceToPersistable(src: ImageSource): string {
  return typeof src === 'string' ? src : src.src;
}

export function addShowcaseProductToCart(
  product: ShowcaseProduct,
  options?: {
    name?: string;
    quantity?: number;
    colorId?: string;
    colorLabel?: string;
    storageGb?: number;
    storageLabel?: string;
  },
) {
  useCartStore.getState().addItem({
    productId: product.id,
    name: options?.name ?? product.name,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    image: product.image,
    imageAlt: product.imageAlt,
    quantity: options?.quantity ?? 1,
    colorId: options?.colorId,
    colorLabel: options?.colorLabel,
    storageGb: options?.storageGb,
    storageLabel: options?.storageLabel,
  });
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (input) => {
        const quantity = Math.max(1, input.quantity ?? 1);
        const lineId = buildCartLineId({
          productId: input.productId,
          colorId: input.colorId,
          storageGb: input.storageGb,
        });
        const nextItem: CartLineItem = {
          lineId,
          productId: input.productId,
          name: input.name,
          price: input.price,
          compareAtPrice: input.compareAtPrice,
          image: imageSourceToPersistable(input.image),
          imageAlt: input.imageAlt,
          quantity,
          colorId: input.colorId,
          colorLabel: input.colorLabel,
          storageGb: input.storageGb,
          storageLabel: input.storageLabel,
        };

        const existing = get().items.find((item) => item.lineId === lineId);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.lineId === lineId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
          return;
        }

        set({ items: [...get().items, nextItem] });
      },

      removeItem: (lineId) => {
        set({ items: get().items.filter((item) => item.lineId !== lineId) });
      },

      setQuantity: (lineId, quantity) => {
        if (quantity < 1) {
          get().removeItem(lineId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.lineId === lineId ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'storefront-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function selectCartTotalQuantity(state: CartState): number {
  return state.items.reduce((total, item) => total + item.quantity, 0);
}

export function selectCartLineCount(state: CartState): number {
  return state.items.length;
}
