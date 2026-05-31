import type { NextRequest } from 'next/server';
import { jsonInternalError, jsonOk } from '@/lib/api/response';
import { mockOrdersList } from '@/app/profile/orders/_lib/api/mock';
import type { OrdersListResponse } from '@/app/profile/orders/_lib/api/types';
import {
  getLocaleFromRequest,
  proxyToRest,
  shouldUseRestProxy,
} from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<OrdersListResponse>('/admin/orders', {
        locale,
        headers: request.headers,
        searchParams: request.nextUrl.searchParams,
      });
      return jsonOk(data);
    }

    return jsonOk(mockOrdersList(locale));
  } catch (error) {
    return jsonInternalError(error);
  }
}
