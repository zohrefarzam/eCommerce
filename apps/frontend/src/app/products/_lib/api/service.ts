import { apiFetch } from '@/lib/api/client';
import type {
  ProductDetailDto,
  ProductsListParams,
  ProductsListResponse,
} from '@/app/products/_lib/api/types';

export function fetchProducts(params: ProductsListParams = {}) {
  return apiFetch<ProductsListResponse>('/products/api', {
    params: {
      category: params.category,
      tab: params.tab,
      page: params.page,
      sort: params.sort,
      priceMin: params.priceMin,
      priceMax: params.priceMax,
      brands: params.brands?.join(','),
      storage: params.storage?.join(','),
      q: params.q,
    },
  });
}

export function fetchProduct(id: string) {
  return apiFetch<ProductDetailDto>(`/products/api/${id}`);
}
