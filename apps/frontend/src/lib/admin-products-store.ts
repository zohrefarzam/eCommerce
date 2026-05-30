'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getLandingContent } from '@/landing/_content';
import {
  mergeUniqueProducts,
  productCatalogMetaById,
  productCategorySlugsById,
} from '@/lib/product-catalog';

export type AdminProduct = {
  id: string;
  name: string;
  price: string;
  brand: string;
  categorySlug: string;
  imageUrl: string;
};

export type AdminProductInput = Omit<AdminProduct, 'id'>;

function buildSeedProducts(): AdminProduct[] {
  const products = mergeUniqueProducts(getLandingContent('fa'));
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    brand: productCatalogMetaById[product.id]?.brand ?? '',
    categorySlug: productCategorySlugsById[product.id]?.[0] ?? '',
    imageUrl: product.image,
  }));
}

type AdminProductsState = {
  products: AdminProduct[];
  add: (input: AdminProductInput) => void;
  update: (id: string, input: AdminProductInput) => void;
  remove: (id: string) => void;
};

export const useAdminProductsStore = create<AdminProductsState>()(
  persist(
    (set) => ({
      products: buildSeedProducts(),
      add: (input) =>
        set((state) => ({
          products: [{ id: crypto.randomUUID(), ...input }, ...state.products],
        })),
      update: (id, input) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...input } : product,
          ),
        })),
      remove: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
    }),
    {
      name: 'admin-products',
      version: 2,
      partialize: (state) => ({ products: state.products }),
      migrate: (persistedState, version) => {
        if (version < 2) {
          const state = persistedState as { products: AdminProduct[] };
          const seedById = new Map(
            buildSeedProducts().map((product) => [product.id, product]),
          );
          return {
            products: state.products.map((product) => ({
              ...product,
              imageUrl:
                product.imageUrl ?? seedById.get(product.id)?.imageUrl ?? '',
            })),
          };
        }
        return persistedState as { products: AdminProduct[] };
      },
    },
  ),
);
