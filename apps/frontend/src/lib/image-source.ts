import type { StaticImageData } from 'next/image';

/** Static import or absolute URL from your API/CDN. */
export type ImageSource = string | StaticImageData;

export function isRemoteImageUrl(src: ImageSource): src is string {
  return typeof src === 'string' && /^https?:\/\//i.test(src);
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
