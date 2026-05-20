import NextImage from 'next/image';
import {
  capSizesToIntrinsicWidth,
  isRemoteImageUrl,
  type ImageSource,
} from '@/lib/image-source';

export type { ImageSource } from '@/lib/image-source';

export type ImageFit = 'cover' | 'contain';

/** `fill` = parent box; `responsive` = intrinsic ratio, `w-full h-auto` (hero banners). */
export type ImageLayout = 'fill' | 'responsive';

export type BaseImageProps = {
  src: ImageSource;
  alt: string;
  /** Responsive layout hint — required for `fill` images. */
  sizes: string;
  layout?: ImageLayout;
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
function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Image({
  src,
  alt,
  sizes,
  layout = 'fill',
  fit = 'contain',
  quality = 100,
  priority = false,
  className,
}: BaseImageProps) {
  const remote = isRemoteImageUrl(src);
  const fitClass = fitClasses[fit];
  const resolvedSizes = capSizesToIntrinsicWidth(sizes, src);

  if (layout === 'responsive') {
    const responsiveClassName = cx('h-auto w-full max-w-full', className);

    if (remote) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- encapsulated; do not use <img> elsewhere
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={responsiveClassName}
        />
      );
    }

    if (typeof src === 'object' && 'width' in src && 'height' in src) {
      return (
        <NextImage
          src={src}
          alt={alt}
          width={src.width}
          height={src.height}
          sizes={resolvedSizes}
          quality={quality}
          priority={priority}
          className={responsiveClassName}
        />
      );
    }
  }

  const mergedClassName = cx(fitClass, className);

  if (remote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- encapsulated; do not use <img> elsewhere
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cx('absolute inset-0 size-full', mergedClassName)}
      />
    );
  }

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
