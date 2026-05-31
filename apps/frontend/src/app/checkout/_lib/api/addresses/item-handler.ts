import type { NextRequest } from 'next/server';
import {
  jsonBadRequest,
  jsonInternalError,
  jsonNoContent,
  jsonNotFound,
  jsonOk,
} from '@/lib/api/response';
import {
  deleteMockAddress,
  findMockAddress,
  updateMockAddress,
} from '@/app/checkout/_lib/api/addresses/mock-store';
import type {
  AddressDto,
  AddressInputDto,
} from '@/app/checkout/_lib/api/addresses/types';
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
      const data = await proxyToRest<AddressDto>(`/addresses/${id}`, {
        locale,
      });
      return jsonOk(data);
    }

    const address = findMockAddress(locale, id);
    if (!address) {
      return jsonNotFound(`Address ${id} not found`);
    }
    return jsonOk(address);
  } catch (error) {
    return jsonInternalError(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const locale = getLocaleFromRequest(request);
    const body = (await request.json()) as Partial<AddressInputDto>;

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<AddressDto>(`/addresses/${id}`, {
        method: 'PATCH',
        locale,
        body,
      });
      return jsonOk(data);
    }

    const updated = updateMockAddress(locale, id, body);
    if (!updated) {
      return jsonNotFound(`Address ${id} not found`);
    }

    return jsonOk(updated);
  } catch (error) {
    return jsonInternalError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const locale = getLocaleFromRequest(request);

    if (shouldUseRestProxy()) {
      await proxyToRest<void>(`/addresses/${id}`, {
        method: 'DELETE',
        locale,
      });
      return jsonNoContent();
    }

    if (!deleteMockAddress(locale, id)) {
      return jsonNotFound(`Address ${id} not found`);
    }

    return jsonNoContent();
  } catch (error) {
    return jsonInternalError(error);
  }
}

export async function POST() {
  return jsonBadRequest('Use POST /profile/addresses/api to create an address');
}
