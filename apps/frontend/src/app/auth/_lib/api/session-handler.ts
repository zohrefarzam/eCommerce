import type { NextRequest } from 'next/server';
import { jsonBadRequest, jsonInternalError, jsonOk } from '@/lib/api/response';
import type { AuthSessionResponse } from '@/app/auth/_lib/api/types';
import { proxyToRest, shouldUseRestProxy } from '@/lib/api/server-proxy';

export async function GET(request: NextRequest) {
  try {
    if (shouldUseRestProxy()) {
      const data = await proxyToRest<AuthSessionResponse>('/auth/session', {
        headers: request.headers,
      });
      return jsonOk(data);
    }

    return jsonOk({ user: null } satisfies AuthSessionResponse);
  } catch (error) {
    return jsonInternalError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (shouldUseRestProxy()) {
      await proxyToRest<void>('/auth/session', {
        method: 'DELETE',
        headers: request.headers,
      });
      return new Response(null, { status: 204 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return jsonInternalError(error);
  }
}

export async function POST() {
  return jsonBadRequest('Use POST /auth/login or /auth/sign-up');
}
