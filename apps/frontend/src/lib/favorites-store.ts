'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ShowcaseProduct } from '@/landing/_content/types';

export type FavoriteProduct = {
  productId: string;
  name: string;
  price: string;
  compareAtPrice?: string;
  discountPercent?: number;
  image: string;
  imageAlt: string;
};

type FavoritesState = {
  items: FavoriteProduct[];
  isFavorite: (productId: string) => boolean;
  toggle: (product: FavoriteProduct) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export function showcaseToFavorite(product: ShowcaseProduct): FavoriteProduct {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    discountPercent: product.discountPercent,
    image: product.image,
    imageAlt: product.imageAlt,
  };
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      isFavorite: (productId) =>
        get().items.some((item) => item.productId === productId),

      toggle: (product) => {
        const exists = get().isFavorite(product.productId);
        if (exists) {
          set({
            items: get().items.filter(
              (item) => item.productId !== product.productId,
            ),
          });
          return;
        }
        set({ items: [...get().items, product] });
      },

      remove: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: 'storefront-favorites',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function selectFavoritesCount(state: FavoritesState): number {
  return state.items.length;
}
