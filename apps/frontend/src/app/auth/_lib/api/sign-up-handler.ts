import type { NextRequest } from 'next/server';
import {
  jsonBadRequest,
  jsonCreated,
  jsonInternalError,
} from '@/lib/api/response';
import type {
  AuthActionResponse,
  SignUpRequest,
} from '@/app/auth/_lib/api/types';
import { proxyToRest, shouldUseRestProxy } from '@/lib/api/server-proxy';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignUpRequest;

    if (!body.name || !body.email || !body.password) {
      return jsonBadRequest('name, email, and password are required');
    }

    if (shouldUseRestProxy()) {
      const data = await proxyToRest<AuthActionResponse>('/auth/sign-up', {
        method: 'POST',
        body,
        headers: request.headers,
      });
      return jsonCreated(data);
    }

    return jsonBadRequest('Sign-up API is not connected yet');
  } catch (error) {
    return jsonInternalError(error);
  }
}
