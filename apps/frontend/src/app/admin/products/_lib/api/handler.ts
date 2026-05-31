import type { NextRequest } from 'next/server';
import { jsonInternalError, jsonOk } from '@/lib/api/response';
import { mockProductsList } from '@/app/products/_lib/api/mock';
import type { ProductsListResponse } from '@/app/products/_lib/api/types';
import {
  getLocaleFromRequest,
  proxyToRest,
  shouldUseRestProxy,
} from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<ProductsListResponse>('/admin/products', {
        locale,
        headers: request.headers,
      });
      return jsonOk(data);
    }

    return jsonOk(mockProductsList(locale, { page: 1 }));
  } catch (error) {
    return jsonInternalError(error);
  }
}
