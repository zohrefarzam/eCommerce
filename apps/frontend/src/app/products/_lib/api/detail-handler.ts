import type { NextRequest } from 'next/server';
import { jsonInternalError, jsonNotFound, jsonOk } from '@/lib/api/response';
import { mockProductDetail } from '@/app/products/_lib/api/mock';
import type { ProductDetailDto } from '@/app/products/_lib/api/types';
import {
  getLocaleFromRequest,
  proxyToRest,
  shouldUseRestProxy,
} from '@/lib/api/server-proxy';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const locale = getLocaleFromRequest(request);

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<ProductDetailDto>(`/products/${id}`, {
        locale,
      });
      return jsonOk(data);
    }

    const data = mockProductDetail(locale, id);
    if (!data) {
      return jsonNotFound(`Product ${id} not found`);
    }

    return jsonOk(data);
  } catch (error) {
    return jsonInternalError(error);
  }
}
