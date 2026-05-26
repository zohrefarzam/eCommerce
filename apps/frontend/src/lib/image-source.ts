import type { StaticImageData } from 'next/image';

/** Static import or absolute URL from your API/CDN. */
export type ImageSource = string | StaticImageData;

export function isRemoteImageUrl(src: ImageSource): src is string {
  return typeof src === 'string' && /^https?:\/\//i.test(src);
}

/** Request a sharp CDN asset for large PDP / hero displays (`fill` layout path). */
export function sharpenRemoteImageUrl(src: string, width = 1200): string {
  return hiResRemoteImageUrl(src, width, 90);
}

/** Bump Unsplash (or similar) query params for sharper PDP / hero delivery. */
export function hiResRemoteImageUrl(
  url: string,
  width = 1200,
  quality = 90,
): string {
  if (!/^https?:\/\//i.test(url)) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('w', String(width));
    parsed.searchParams.set('q', String(quality));
    if (!parsed.searchParams.has('auto')) {
      parsed.searchParams.set('auto', 'format');
    }
    if (!parsed.searchParams.has('fit')) {
      parsed.searchParams.set('fit', 'crop');
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/** Responsive srcset for remote URLs (native `<img>` path in `Image`). */
export function buildRemoteSrcSet(
  url: string,
  widths: readonly number[] = [480, 720, 960, 1200, 1600],
  quality = 90,
): string {
  return widths
    .map((w) => `${hiResRemoteImageUrl(url, w, quality)} ${w}w`)
    .join(', ');
}

/**
 * When a static asset is smaller than the card, cap the `sizes` hint so Next.js
 * does not upscale past intrinsic width (major cause of blur on retina).
 */
export function capSizesToIntrinsicWidth(
  sizes: string,
  src: ImageSource,
  maxPx = 1920,
): string {
  if (typeof src !== 'object' || !('width' in src) || !src.width) {
    return sizes;
  }
  const cap = Math.min(src.width, maxPx);
  if (cap >= 640) return sizes;
  return `(max-width: 640px) 100vw, ${cap}px`;
}

/** Minimum widths your API should return for cover cards (documented contract). */
export const COVER_IMAGE_MIN_WIDTH = {
  featured: 800,
  wide: 720,
  compact: 480,
} as const;
