'use client';

import { useState, type ReactNode } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export type ProductCardProps = {
  name: string;
  price: string;
  compareAtPrice?: string;
  discountPercent?: number;
  image: string;
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
  buyLabel = 'افزودن به سبد',
  viewLabel = 'مشاهده محصول',
  defaultFavorite = false,
  onFavoriteChange,
  onBuy,
  onView,
  className,
}: ProductCardProps) {
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
        'group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface-secondary',
        'shadow-sm transition-shadow duration-300 ease-out',
        'hover:shadow-md',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-surface-tertiary/50">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={imageAlt ?? name}
            className="size-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="size-full bg-surface-tertiary" aria-hidden />
        )}

        {hasDiscount ? (
          <span
            className="absolute start-3 top-3 z-10 inline-flex min-w-11 items-center justify-center rounded-sm bg-red-500 px-2 py-1 text-[11px] font-bold leading-none text-white shadow-sm ring-1 ring-black/5"
            aria-label={`${discountPercent}٪ تخفیف`}
          >
            <span dir="ltr">-{discountPercent}%</span>
          </span>
        ) : null}

        <div className="absolute end-3 top-3 z-10 flex flex-col items-center gap-1.5">
          <IconButton
            label={favorite ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی'}
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
              width={18}
              height={18}
              className={favorite ? '[&_path]:fill-current' : ''}
              aria-hidden
            />
          </IconButton>
          <IconButton
            label={viewLabel}
            onClick={onView}
            className="translate-y-0 opacity-100 transition-all duration-300 sm:opacity-0 sm:-translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
          >
            <Icon icon="lucide:eye" width={18} height={18} aria-hidden />
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
              'rounded-none bg-foreground py-3 text-sm font-semibold text-background',
              'transition-colors duration-300',
              'hover:bg-foreground/90 active:bg-foreground/80',
            ].join(' ')}
          >
            {buyLabel}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-foreground">
          {name}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <p
            className={[
              'text-base font-bold tabular-nums',
              onSale ? 'text-red-500' : 'text-foreground',
            ].join(' ')}
          >
            {price}
          </p>
          {compareAtPrice ? (
            <p className="text-sm font-medium text-muted line-through decoration-muted/80 tabular-nums">
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
        'flex size-9 items-center justify-center rounded-full',
        'bg-white/90 text-muted shadow-sm backdrop-blur-sm',
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
