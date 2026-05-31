'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getLandingContent } from '@/landing/_content';

export type AdminCategory = {
  slug: string;
  label: string;
};

function buildSeedCategories(): AdminCategory[] {
  return getLandingContent('fa').browseCategories.map((category) => ({
    slug: category.slug,
    label: category.label,
  }));
}

type AdminCategoriesState = {
  categories: AdminCategory[];
  add: (input: AdminCategory) => { ok: true } | { ok: false; error: 'exists' };
  update: (
    slug: string,
    input: AdminCategory,
  ) => { ok: true } | { ok: false; error: 'exists' };
  remove: (slug: string) => void;
};

export const useAdminCategoriesStore = create<AdminCategoriesState>()(
  persist(
    (set, get) => ({
      categories: buildSeedCategories(),
      add: (input) => {
        if (get().categories.some((c) => c.slug === input.slug)) {
          return { ok: false, error: 'exists' };
        }
        set((state) => ({ categories: [...state.categories, input] }));
        return { ok: true };
      },
      update: (slug, input) => {
        if (
          input.slug !== slug &&
          get().categories.some((c) => c.slug === input.slug)
        ) {
          return { ok: false, error: 'exists' };
        }
        set((state) => ({
          categories: state.categories.map((category) =>
            category.slug === slug ? input : category,
          ),
        }));
        return { ok: true };
      },
      remove: (slug) =>
        set((state) => ({
          categories: state.categories.filter(
            (category) => category.slug !== slug,
          ),
        })),
    }),
    {
      name: 'admin-categories',
      version: 1,
      partialize: (state) => ({ categories: state.categories }),
    },
  ),
);
