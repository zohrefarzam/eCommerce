const DEFAULT_RETURN_URL = '/';

/**
 * Ensures a `returnUrl` is a safe, same-origin relative path before we redirect
 * to it. Rejects absolute URLs and protocol-relative paths (`//evil.com`) so a
 * crafted `?returnUrl=` value can't be used as an open redirect.
 */
export function sanitizeReturnUrl(
  value: string | null | undefined,
  fallback: string = DEFAULT_RETURN_URL,
): string {
  if (!value) return fallback;
  // Must be a path-absolute URL, but not protocol-relative (`//host`).
  if (!value.startsWith('/') || value.startsWith('//')) return fallback;
  // Reject backslash variants that some browsers normalize to `//`.
  if (value.startsWith('/\\') || value.startsWith('\\')) return fallback;
  return value;
}
