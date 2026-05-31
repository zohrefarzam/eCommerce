import type { NextRequest } from 'next/server';
import { jsonInternalError, jsonOk } from '@/lib/api/response';
import { mockCategoriesList } from '@/app/(landing)/_lib/api/categories/mock';
import type { CategoriesListResponse } from '@/app/(landing)/_lib/api/categories/types';
import {
  getLocaleFromRequest,
  proxyToRest,
  shouldUseRestProxy,
} from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<CategoriesListResponse>(
        '/admin/categories',
        {
          locale,
          headers: request.headers,
        },
      );
      return jsonOk(data);
    }

    return jsonOk(mockCategoriesList(locale));
  } catch (error) {
    return jsonInternalError(error);
  }
}
