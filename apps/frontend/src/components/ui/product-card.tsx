'use client';

import { useState, type ReactNode } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Image } from '@/components/base/image';
import { useLocale } from '@/i18n';
import type { ImageSource } from '@/lib/image-source';

export type ProductCardProps = {
  name: string;
  price: string;
  compareAtPrice?: string;
  discountPercent?: number;
  image: ImageSource;
  imageAlt?: string;
  buyLabel?: string;
  viewLabel?: string;
  defaultFavorite?: boolean;
  onFavoriteChange?: (favorite: boolean) => void;
  onBuy?: () => void;
  onView?: () => void;
  className?: string;
};

export function ProductCard({
  name,
  price,
  compareAtPrice,
  discountPercent,
  image,
  imageAlt,
  buyLabel,
  viewLabel,
  defaultFavorite = false,
  onFavoriteChange,
  onBuy,
  onView,
  className,
}: ProductCardProps) {
  const { messages } = useLocale();
  const { productCard } = messages;
  const resolvedBuyLabel = buyLabel ?? productCard.buy;
  const resolvedViewLabel = viewLabel ?? productCard.view;
  const [favorite, setFavorite] = useState(defaultFavorite);
  const hasDiscount =
    discountPercent != null &&
    Number.isFinite(discountPercent) &&
    discountPercent > 0;
  const onSale = hasDiscount || Boolean(compareAtPrice);

  const toggleFavorite = () => {
    setFavorite((prev) => {
      const next = !prev;
      onFavoriteChange?.(next);
      return next;
    });
  };

  return (
    <article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface-secondary sm:rounded-2xl',
        'shadow-sm transition-shadow duration-300 ease-out',
        'hover:shadow-md',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-gradient-to-b from-surface-secondary via-surface-secondary to-surface-tertiary/[0.08]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? name}
            sizes="(max-width: 640px) 50vw, 320px"
            fit="contain"
            className="p-3 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-5 lg:p-6"
          />
        ) : (
          <div
            className="size-full bg-gradient-to-b from-surface-secondary to-surface-tertiary/[0.08]"
            aria-hidden
          />
        )}

        <div
          className={[
            'pointer-events-none absolute inset-0 z-[1]',
            'bg-gradient-to-t from-black/50 via-black/10 to-transparent',
            'opacity-0 transition-opacity duration-300',
            'sm:opacity-70 sm:group-hover:opacity-90',
          ].join(' ')}
          aria-hidden
        />

        {hasDiscount ? (
          <span
            className="absolute start-2 top-2 z-10 inline-flex min-w-9 items-center justify-center rounded-sm bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white shadow-sm ring-1 ring-black/5 sm:start-3 sm:top-3 sm:min-w-11 sm:px-2 sm:py-1 sm:text-[11px]"
            aria-label={productCard.discountLabel(discountPercent)}
          >
            <span dir="ltr">-{discountPercent}%</span>
          </span>
        ) : null}

        <div className="absolute end-2 top-2 z-10 flex flex-col items-center gap-1 sm:end-3 sm:top-3 sm:gap-1.5">
          <IconButton
            label={
              favorite
                ? productCard.removeFromWishlist
                : productCard.addToWishlist
            }
            onClick={toggleFavorite}
            pressed={favorite}
            className={[
              'transition-all duration-300',
              favorite
                ? 'text-red-500 opacity-100 translate-y-0'
                : 'translate-y-0 opacity-100 sm:opacity-0 sm:-translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0',
            ].join(' ')}
          >
            <Icon
              icon="lucide:heart"
              width={16}
              height={16}
              className={[
                'sm:h-[18px] sm:w-[18px]',
                favorite ? '[&_path]:fill-current' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden
            />
          </IconButton>
          <IconButton
            label={resolvedViewLabel}
            onClick={onView}
            className="translate-y-0 opacity-100 transition-all duration-300 sm:opacity-0 sm:-translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
          >
            <Icon
              icon="lucide:eye"
              width={16}
              height={16}
              className="sm:h-[18px] sm:w-[18px]"
              aria-hidden
            />
          </IconButton>
        </div>

        <div
          className={[
            'absolute inset-x-0 bottom-0 z-20',
            'translate-y-0 opacity-100',
            'transition-all duration-300 ease-out',
            'sm:pointer-events-none sm:translate-y-full sm:opacity-0',
            'sm:group-hover:pointer-events-auto sm:group-hover:translate-y-0 sm:group-hover:opacity-100',
          ].join(' ')}
        >
          <Button
            variant="primary"
            fullWidth
            onPress={onBuy}
            className={[
              'rounded-none bg-foreground sm:py-2 lg:py-6 text-xs font-semibold text-background sm:text-sm',
              'shadow-none transition-[background-color,box-shadow] duration-300',
              'hover:bg-foreground/90 active:bg-foreground/80',
              'sm:bg-foreground/95 sm:shadow-lg sm:shadow-black/40 sm:ring-1 sm:ring-white/15 sm:backdrop-blur-sm',
              'sm:hover:bg-foreground sm:hover:shadow-xl sm:hover:shadow-black/50',
            ].join(' ')}
          >
            {resolvedBuyLabel}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3 pb-3 pt-2 sm:gap-2 sm:px-4 sm:pb-4 sm:pt-3">
        <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-foreground sm:min-h-[2.5rem] sm:text-sm">
          {name}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <p
            className={[
              'text-sm font-bold tabular-nums sm:text-base',
              onSale ? 'text-red-500' : 'text-foreground',
            ].join(' ')}
          >
            {price}
          </p>
          {compareAtPrice ? (
            <p className="text-xs font-medium text-muted line-through decoration-muted/80 tabular-nums sm:text-sm">
              {compareAtPrice}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

type IconButtonProps = {
  label: string;
  onClick?: () => void;
  pressed?: boolean;
  className?: string;
  children: ReactNode;
};

function IconButton({
  label,
  onClick,
  pressed,
  className,
  children,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={[
        'flex size-7 items-center justify-center rounded-full sm:size-9',
        'bg-white/95 text-muted shadow-sm ring-1 ring-black/5 backdrop-blur-sm',
        'transition-[color,background-color,transform] duration-200',
        'hover:scale-110 hover:bg-white hover:text-foreground',
        'active:scale-95',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}
