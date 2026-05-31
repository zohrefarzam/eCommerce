import { ApiClientError } from '@/lib/api/errors';
import type { ApiErrorBody } from '@/lib/api/types';

type ApiFetchOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
};

function buildUrl(path: string, params?: ApiFetchOptions['params']): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(normalized, window.location.origin);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue;
      url.searchParams.set(key, String(value));
    }
  }

  return url.pathname + url.search;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { params, body, headers, ...init } = options;
  const url = buildUrl(path, params);

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorBody: ApiErrorBody = {
      error: response.statusText || 'Request failed',
    };
    try {
      errorBody = (await response.json()) as ApiErrorBody;
    } catch {
      // keep default message
    }
    throw new ApiClientError(response.status, errorBody);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
