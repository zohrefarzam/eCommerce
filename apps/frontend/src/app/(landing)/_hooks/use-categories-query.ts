'use client';

import { useQuery } from '@tanstack/react-query';
import { categoriesQueryKeys } from '@/app/(landing)/_lib/api/categories/query-keys';
import { fetchCategories } from '@/app/(landing)/_lib/api/categories/service';
import { useLocale } from '@/i18n';

export function useCategoriesQuery() {
  const { locale } = useLocale();

  return useQuery({
    queryKey: categoriesQueryKeys.list(locale),
    queryFn: fetchCategories,
  });
}
