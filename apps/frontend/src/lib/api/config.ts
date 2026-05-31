export type ApiMode = 'mock' | 'rest';

/** Client-visible mode (mirrors server `API_MODE`). */
export function getClientApiMode(): ApiMode {
  const mode = process.env.NEXT_PUBLIC_API_MODE;
  return mode === 'rest' ? 'rest' : 'mock';
}

/** Server-side mode for Next.js route handlers. */
export function getServerApiMode(): ApiMode {
  const mode = process.env.API_MODE ?? process.env.NEXT_PUBLIC_API_MODE;
  return mode === 'rest' ? 'rest' : 'mock';
}

/** Upstream REST base URL (no trailing slash). Used when `API_MODE=rest`. */
export function getRestApiBaseUrl(): string {
  const base = process.env.REST_API_BASE_URL?.replace(/\/$/, '');
  if (!base) {
    throw new Error('REST_API_BASE_URL is not configured');
  }
  return base;
}
