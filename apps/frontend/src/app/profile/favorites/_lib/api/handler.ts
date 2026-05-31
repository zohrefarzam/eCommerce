import type { NextRequest } from 'next/server';
import { jsonInternalError, jsonOk } from '@/lib/api/response';
import type { FavoritesListResponse } from '@/app/profile/favorites/_lib/api/types';
import {
  getLocaleFromRequest,
  proxyToRest,
  shouldUseRestProxy,
} from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<FavoritesListResponse>('/favorites', {
        locale,
        headers: request.headers,
      });
      return jsonOk(data);
    }

    return jsonOk({ data: [] } satisfies FavoritesListResponse);
  } catch (error) {
    return jsonInternalError(error);
  }
}
