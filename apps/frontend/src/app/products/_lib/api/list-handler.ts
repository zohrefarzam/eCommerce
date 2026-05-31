import type { NextRequest } from 'next/server';
import {
  jsonInternalError,
  jsonOk,
  parseIntParam,
  parseNumberList,
  parseStringList,
} from '@/lib/api/response';
import { mockProductsList } from '@/app/products/_lib/api/mock';
import type { ProductsListResponse } from '@/app/products/_lib/api/types';
import type { ProductSortId } from '@/app/products/_lib/product-catalog';
import type { ProductTabId } from '@/landing/_content/types';
import {
  getLocaleFromRequest,
  proxyToRest,
  shouldUseRestProxy,
} from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);
    const { searchParams } = request.nextUrl;

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<ProductsListResponse>('/products', {
        locale,
        searchParams,
      });
      return jsonOk(data);
    }

    const data = mockProductsList(locale, {
      category: searchParams.get('category') ?? undefined,
      tab: (searchParams.get('tab') as ProductTabId | null) ?? undefined,
      page: parseIntParam(searchParams.get('page'), 1),
      sort: (searchParams.get('sort') as ProductSortId | null) ?? undefined,
      priceMin: parseIntParam(searchParams.get('priceMin')),
      priceMax: parseIntParam(searchParams.get('priceMax')),
      brands: parseStringList(searchParams.get('brands')),
      storage: parseNumberList(searchParams.get('storage')),
      q: searchParams.get('q') ?? undefined,
    });

    return jsonOk(data);
  } catch (error) {
    return jsonInternalError(error);
  }
}
