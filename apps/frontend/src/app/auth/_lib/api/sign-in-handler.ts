import type { NextRequest } from 'next/server';
import {
  jsonBadRequest,
  jsonInternalError,
  jsonOk,
  jsonUnauthorized,
} from '@/lib/api/response';
import type {
  AuthActionResponse,
  SignInRequest,
} from '@/app/auth/_lib/api/types';
import { proxyToRest, shouldUseRestProxy } from '@/lib/api/server-proxy';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignInRequest;

    if (!body.email || !body.password) {
      return jsonBadRequest('email and password are required');
    }

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<AuthActionResponse>('/auth/sign-in', {
        method: 'POST',
        body,
        headers: request.headers,
      });
      return jsonOk(data);
    }

    return jsonUnauthorized('Sign-in API is not connected yet');
  } catch (error) {
    return jsonInternalError(error);
  }
}
