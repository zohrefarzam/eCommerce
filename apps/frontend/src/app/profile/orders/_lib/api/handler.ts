import type { NextRequest } from 'next/server';
import { jsonInternalError, jsonOk } from '@/lib/api/response';
import { mockOrdersList } from '@/app/profile/orders/_lib/api/mock';
import type {
  OrderStatus,
  OrdersListResponse,
} from '@/app/profile/orders/_lib/api/types';
import {
  getLocaleFromRequest,
  proxyToRest,
  shouldUseRestProxy,
} from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);
    const status = request.nextUrl.searchParams.get(
      'status',
    ) as OrderStatus | null;

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<OrdersListResponse>('/orders', {
        locale,
        searchParams: request.nextUrl.searchParams,
      });
      return jsonOk(data);
    }

    const data = mockOrdersList(locale, {
      status: status ?? undefined,
    });
    return jsonOk(data);
  } catch (error) {
    return jsonInternalError(error);
  }
}
