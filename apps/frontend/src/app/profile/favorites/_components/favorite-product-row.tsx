'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from '@/components/base/button';
import { Image } from '@/components/base/image';
import type { Messages } from '@/i18n/messages';
import type { FavoriteProduct } from '@/app/profile/_lib/favorites-store';
import { useFavoritesStore } from '@/app/profile/_lib/favorites-store';
import { productDetailHref } from '@/app/products/_lib/product-detail';
import { cn } from '@/components/base/_lib/utils';

type FavoriteProductRowProps = {
  item: FavoriteProduct;
  productCardLabels: Messages['productCard'];
  onAddToCart: () => void;
};

export function FavoriteProductRow({
  item,
  productCardLabels,
  onAddToCart,
}: FavoriteProductRowProps) {
  const remove = useFavoritesStore((s) => s.remove);
  const hasDiscount =
    item.discountPercent != null &&
    Number.isFinite(item.discountPercent) &&
    item.discountPercent > 0;
  const onSale = hasDiscount || Boolean(item.compareAtPrice);

  return (
    <article className="overflow-hidden rounded-xl border border-muted/20 bg-background">
      <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
        <Link
          href={productDetailHref(item.productId)}
          prefetch={false}
          className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-surface-secondary sm:size-24"
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            sizes="96px"
            fit="contain"
            className="p-2"
          />
          {hasDiscount ? (
            <span
              className="absolute start-1 top-1 rounded-sm bg-foreground px-1 py-0.5 text-[10px] font-bold leading-none text-background"
              dir="ltr"
            >
              -{item.discountPercent}%
            </span>
          ) : null}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link
                href={productDetailHref(item.productId)}
                prefetch={false}
                className="line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:underline sm:text-base"
              >
                {item.name}
              </Link>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <p
                  className={cn(
                    'text-base font-bold tabular-nums sm:text-lg',
                    onSale ? 'text-foreground' : 'text-foreground',
                  )}
                >
                  {item.price}
                </p>
                {item.compareAtPrice ? (
                  <p className="text-sm font-medium text-muted line-through tabular-nums">
                    {item.compareAtPrice}
                  </p>
                ) : null}
              </div>
            </div>

            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              aria-label={productCardLabels.removeFromWishlist}
              className="size-9 min-w-9 shrink-0 text-muted hover:text-foreground"
              onPress={() => remove(item.productId)}
            >
              <Icon
                icon="lucide:heart"
                width={18}
                height={18}
                className="[&_path]:fill-current"
                aria-hidden
              />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              className="h-9 rounded-lg !bg-foreground !text-background px-4 text-xs font-semibold hover:!bg-foreground/90 sm:text-sm"
              onPress={onAddToCart}
            >
              {productCardLabels.buy}
            </Button>
            <Button
              variant="outline"
              size="sm"
              href={productDetailHref(item.productId)}
              className="h-9 rounded-lg border-muted/25 px-4 text-xs font-semibold sm:text-sm"
            >
              {productCardLabels.view}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
