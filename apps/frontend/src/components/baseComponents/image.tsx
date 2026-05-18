import NextImage from 'next/image';
import {
  capSizesToIntrinsicWidth,
  isRemoteImageUrl,
  type ImageSource,
} from '@/lib/image-source';

export type { ImageSource } from '@/lib/image-source';

export type ImageFit = 'cover' | 'contain';

export type BaseImageProps = {
  src: ImageSource;
  alt: string;
  /** Responsive layout hint — required for `fill` images. */
  sizes: string;
  fit?: ImageFit;
  quality?: number;
  priority?: boolean;
  className?: string;
};

const fitClasses: Record<ImageFit, string> = {
  cover: 'object-cover object-center',
  contain: 'object-contain object-center',
};

/**
 * Project image primitive — the only allowed way to render images.
 * Wraps `next/image` for local assets; uses a native `<img>` only for remote/CDN URLs.
 */
export function Image({
  src,
  alt,
  sizes,
  fit = 'contain',
  quality = 100,
  priority = false,
  className,
}: BaseImageProps) {
  const remote = isRemoteImageUrl(src);
  const fitClass = fitClasses[fit];
  const mergedClassName = [fitClass, className].filter(Boolean).join(' ');

  if (remote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- encapsulated; do not use <img> elsewhere
      <img
        src={src as any}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute inset-0 size-full ${mergedClassName}`}
      />
    );
  }

  const resolvedSizes = capSizesToIntrinsicWidth(sizes, src);

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      sizes={resolvedSizes}
      quality={quality}
      priority={priority}
      className={mergedClassName}
    />
  );
}
