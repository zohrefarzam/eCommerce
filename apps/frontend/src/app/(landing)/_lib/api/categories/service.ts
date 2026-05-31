import { apiFetch } from '@/lib/api/client';
import type { CategoriesListResponse } from '@/app/(landing)/_lib/api/categories/types';

export function fetchCategories() {
  return apiFetch<CategoriesListResponse>('/categories');
}
