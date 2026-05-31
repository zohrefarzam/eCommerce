import type { NextRequest } from 'next/server';
import { jsonInternalError, jsonOk } from '@/lib/api/response';
import type { CartResponse } from '@/app/cart/_lib/api/types';
import { proxyToRest, shouldUseRestProxy } from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    if (shouldUseRestProxy()) {
      const data = await proxyToRest<CartResponse>('/cart', {
        headers: request.headers,
      });
      return jsonOk(data);
    }

    return jsonOk({ items: [] } satisfies CartResponse);
  } catch (error) {
    return jsonInternalError(error);
  }
}
