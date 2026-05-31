'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from '@/i18n';
import { productsQueryKeys } from '@/app/products/_lib/api/query-keys';
import { fetchProduct, fetchProducts } from '@/app/products/_lib/api/service';
import type { ProductsListParams } from '@/app/products/_lib/api/types';

export function useProductsQuery(params: ProductsListParams = {}) {
  const { locale } = useLocale();

  return useQuery({
    queryKey: productsQueryKeys.list({ locale, ...params }),
    queryFn: () => fetchProducts(params),
  });
}

export function useProductQuery(id: string) {
  const { locale } = useLocale();

  return useQuery({
    queryKey: productsQueryKeys.detail(id, locale),
    queryFn: () => fetchProduct(id),
    enabled: Boolean(id),
  });
}
