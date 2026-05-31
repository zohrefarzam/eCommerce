import type { ProductSortId } from '@/app/products/_lib/product-catalog';
import type { Locale } from '@/i18n/config';

export type ProductsListQueryKey = {
  locale: Locale;
  category?: string;
  tab?: string;
  page?: number;
  sort?: ProductSortId;
  priceMin?: number;
  priceMax?: number;
  brands?: string[];
  storage?: number[];
  q?: string;
};

export const productsQueryKeys = {
  all: ['products'] as const,
  lists: () => [...productsQueryKeys.all, 'list'] as const,
  list: (filters: ProductsListQueryKey) =>
    [...productsQueryKeys.lists(), filters] as const,
  details: () => [...productsQueryKeys.all, 'detail'] as const,
  detail: (id: string, locale: Locale) =>
    [...productsQueryKeys.details(), id, locale] as const,
};
