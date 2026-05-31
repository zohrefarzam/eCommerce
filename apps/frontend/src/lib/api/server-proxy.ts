import { getRestApiBaseUrl, getServerApiMode } from '@/lib/api/config';
import type { Locale } from '@/i18n/config';
import { LOCALE_COOKIE } from '@/i18n/config';

type ProxyOptions = {
  method?: string;
  locale?: Locale;
  searchParams?: URLSearchParams;
  body?: unknown;
  headers?: HeadersInit;
};

export function shouldUseRestProxy(): boolean {
  return getServerApiMode() === 'rest';
}

export async function proxyToRest<T>(
  path: string,
  options: ProxyOptions = {},
): Promise<T> {
  const base = getRestApiBaseUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${base}${normalized}`);

  if (options.searchParams) {
    options.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      ...(options.locale ? { 'Accept-Language': options.locale } : {}),
      ...(options.body !== undefined
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `REST proxy failed (${response.status}) ${path}: ${text.slice(0, 200)}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getLocaleFromRequest(request: Request): Locale {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const match = cookieHeader.match(new RegExp(`${LOCALE_COOKIE}=([^;]+)`));
  const value = match?.[1];
  return value === 'en' ? 'en' : 'fa';
}
