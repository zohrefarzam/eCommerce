'use client';

import { Button } from '@/components/base/button';
import { Image } from '@/components/base/image';
import { cn } from '@/lib/utils';
import type { ProductGalleryImage } from '@/lib/product-detail';

const MAIN_IMAGE_SIZES = '(max-width: 1024px) 100vw, 720px';
const THUMB_IMAGE_SIZES = '80px';

type ProductGalleryProps = {
  images: readonly ProductGalleryImage[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  className?: string;
};

export function ProductGallery({
  images,
  activeIndex,
  onActiveIndexChange,
  className,
}: ProductGalleryProps) {
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  const showThumbnails = images.length > 1;

  return (
    <div
      className={cn(
        'flex w-full min-w-0 gap-3 sm:gap-4',
        showThumbnails ? 'flex-col sm:flex-row sm:items-stretch' : 'flex-col',
        className,
      )}
    >
      {showThumbnails ? (
        <ul
          className={cn(
            'flex shrink-0 gap-2',
            'flex-row sm:flex-col sm:order-1',
          )}
          aria-label="Product views"
        >
          {images.map((image, index) => {
            const selected = index === activeIndex;
            return (
              <li key={`thumb-${index}`}>
                <Button
                  variant="ghost"
                  aria-label={image.alt}
                  aria-pressed={selected}
                  onPress={() => onActiveIndexChange(index)}
                  className={cn(
                    '!h-[72px] !min-h-[72px] !w-[72px] !min-w-[72px] !p-0',
                    'overflow-hidden rounded-xl border-2 bg-surface',
                    'transition-colors',
                    selected
                      ? 'border-foreground'
                      : 'border-muted/20 hover:border-muted/40',
                    'sm:!h-20 sm:!min-h-20 sm:!w-20 sm:!min-w-20',
                  )}
                >
                  <span className="flex size-full items-center justify-center p-1.5">
                    <Image
                      src={image.src}
                      alt=""
                      layout="responsive"
                      sizes={THUMB_IMAGE_SIZES}
                      quality={90}
                      fit="contain"
                      className="max-h-full max-w-full"
                    />
                  </span>
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div
        className={cn(
          'flex min-w-0 flex-1 items-center justify-center sm:order-2',
          'aspect-square w-full overflow-hidden rounded-2xl',
          'bg-surface-secondary',
        )}
      >
        <Image
          key={activeIndex}
          src={active.src}
          alt={active.alt}
          layout="responsive"
          sizes={MAIN_IMAGE_SIZES}
          quality={90}
          fit="contain"
          priority
          className="max-h-full w-full px-6 py-8 sm:px-10 sm:py-12"
        />
      </div>
    </div>
  );
}
