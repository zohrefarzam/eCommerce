'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { Image } from '@/components/base/image';
import type { CartLineItem } from '@/lib/cart-store';
import {
  cartLineSku,
  cartLineTitle,
  cartLineUnitAmount,
  formatCartMoney,
} from '@/lib/cart-utils';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

export type CartLineItemLabels = {
  removeItem: string;
  decreaseQuantity: string;
  increaseQuantity: string;
  quantityLabel: string;
};

type CartLineItemRowProps = {
  item: CartLineItem;
  locale: Locale;
  labels: CartLineItemLabels;
  variant?: 'dropdown' | 'page';
  onRemove: (lineId: string) => void;
  onQuantityChange?: (lineId: string, quantity: number) => void;
};

export function CartLineItemRow({
  item,
  locale,
  labels,
  variant = 'page',
  onRemove,
  onQuantityChange,
}: CartLineItemRowProps) {
  const isDropdown = variant === 'dropdown';
  const unitPrice = formatCartMoney(cartLineUnitAmount(item), locale);

  if (isDropdown) {
    return (
      <article className="flex items-center gap-3.5 border-b border-muted/15 py-4 last:border-b-0">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
          <Image
            src={item.image}
            alt={item.imageAlt}
            sizes="64px"
            fit="contain"
            className="p-2"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {cartLineTitle(item)}
          </h3>
          <p className="text-[11px] text-muted">{cartLineSku(item)}</p>
          <div className="mt-0.5 flex items-center justify-between gap-3">
            <span className="text-xs text-muted">
              {labels.quantityLabel}: {item.quantity}
            </span>
            <p className="shrink-0 text-sm font-bold tabular-nums text-foreground">
              {unitPrice}
            </p>
          </div>
        </div>

        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          aria-label={labels.removeItem}
          className="size-9 min-w-9 shrink-0 text-muted hover:text-foreground"
          onPress={() => onRemove(item.lineId)}
        >
          <Icon icon="lucide:trash-2" width={18} height={18} aria-hidden />
        </Button>
      </article>
    );
  }

  return (
    <article className="flex gap-3 border-b border-muted/20 py-5 last:border-b-0 sm:gap-4 sm:py-6">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-surface-secondary sm:size-24">
        <Image
          src={item.image}
          alt={item.imageAlt}
          sizes="96px"
          fit="contain"
          className="p-1.5 sm:p-2"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
              {cartLineTitle(item)}
            </h3>
            <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
              {cartLineSku(item)}
            </p>
          </div>

          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label={labels.removeItem}
            className="size-8 min-w-8 shrink-0 text-muted hover:text-foreground"
            onPress={() => onRemove(item.lineId)}
          >
            <Icon icon="lucide:trash-2" width={18} height={18} aria-hidden />
          </Button>
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          {onQuantityChange ? (
            <QuantityStepper
              quantity={item.quantity}
              labels={labels}
              onDecrease={() =>
                onQuantityChange(item.lineId, item.quantity - 1)
              }
              onIncrease={() =>
                onQuantityChange(item.lineId, item.quantity + 1)
              }
            />
          ) : (
            <span className="text-xs text-muted">
              {labels.quantityLabel}: {item.quantity}
            </span>
          )}

          <p className="shrink-0 text-base font-bold tabular-nums text-foreground sm:text-lg">
            {unitPrice}
          </p>
        </div>
      </div>
    </article>
  );
}

type QuantityStepperProps = {
  quantity: number;
  labels: CartLineItemLabels;
  onDecrease: () => void;
  onIncrease: () => void;
  compact?: boolean;
};

function QuantityStepper({
  quantity,
  labels,
  onDecrease,
  onIncrease,
  compact,
}: QuantityStepperProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border border-muted/25 bg-surface',
        compact ? 'h-8' : 'h-9 sm:h-10',
      )}
      role="group"
      aria-label={labels.quantityLabel}
    >
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        aria-label={labels.decreaseQuantity}
        className={cn(
          'rounded-s-lg',
          compact ? 'size-8 min-w-8' : 'size-9 min-w-9',
        )}
        onPress={onDecrease}
      >
        <Icon icon="lucide:minus" width={14} height={14} aria-hidden />
      </Button>
      <span
        className={cn(
          'min-w-8 text-center font-semibold tabular-nums text-foreground',
          compact ? 'px-1 text-xs' : 'px-2 text-sm',
        )}
      >
        {quantity}
      </span>
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        aria-label={labels.increaseQuantity}
        className={cn(
          'rounded-e-lg',
          compact ? 'size-8 min-w-8' : 'size-9 min-w-9',
        )}
        onPress={onIncrease}
      >
        <Icon icon="lucide:plus" width={14} height={14} aria-hidden />
      </Button>
    </div>
  );
}
