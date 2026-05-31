import type { ImageSource } from '@/components/base/_lib/image-source';

export function serializeImageSource(src: ImageSource): string {
  return typeof src === 'string' ? src : src.src;
}
