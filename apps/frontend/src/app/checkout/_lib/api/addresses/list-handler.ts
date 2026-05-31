import type { NextRequest } from 'next/server';
import {
  jsonBadRequest,
  jsonCreated,
  jsonInternalError,
  jsonOk,
} from '@/lib/api/response';
import { mockAddressesList } from '@/app/checkout/_lib/api/addresses/mock';
import { createMockAddress } from '@/app/checkout/_lib/api/addresses/mock-store';
import type {
  AddressDto,
  AddressInputDto,
  AddressesListResponse,
} from '@/app/checkout/_lib/api/addresses/types';
import {
  getLocaleFromRequest,
  proxyToRest,
  shouldUseRestProxy,
} from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<AddressesListResponse>('/addresses', {
        locale,
      });
      return jsonOk(data);
    }

    return jsonOk(mockAddressesList(locale));
  } catch (error) {
    return jsonInternalError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);
    const body = (await request.json()) as AddressInputDto;

    if (!body.recipientName || !body.street) {
      return jsonBadRequest('recipientName and street are required');
    }

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<AddressDto>('/addresses', {
        method: 'POST',
        locale,
        body,
      });
      return jsonCreated(data);
    }

    const created = createMockAddress(locale, body);
    return jsonCreated(created);
  } catch (error) {
    return jsonInternalError(error);
  }
}
