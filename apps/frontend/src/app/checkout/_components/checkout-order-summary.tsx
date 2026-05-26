'use client';

import { Image } from '@/components/base/image';
import type { Messages } from '@/i18n/messages';
import type { Locale } from '@/i18n/config';
import type { CartLineItem } from '@/lib/cart-store';
import type { CheckoutAddress } from '@/lib/checkout-data';
import type { ShippingMethodId } from '@/lib/checkout-data';
import {
  cartLineTitle,
  cartLineUnitAmount,
  formatCartMoney,
  getCartOrderSummary,
} from '@/lib/cart-utils';
import { formatAddressOneLine } from '@/lib/checkout-data';
import { cn } from '@/lib/utils';

type CheckoutOrderSummaryProps = {
  items: readonly CartLineItem[];
  locale: Locale;
  labels: Messages['checkout'];
  shippingMethodId: ShippingMethodId;
  address?: CheckoutAddress | null;
  shippingLabel?: string;
  showReview?: boolean;
  className?: string;
};

export function CheckoutOrderSummary({
  items,
  locale,
  labels,
  shippingMethodId,
  address,
  shippingLabel,
  showReview,
  className,
}: CheckoutOrderSummaryProps) {
  const summary = getCartOrderSummary(items, locale, { shippingMethodId });

  return (
    <aside
      className={cn(
        'rounded-2xl border border-muted/20 bg-surface p-5 sm:p-6 lg:sticky lg:top-24',
        className,
      )}
    >
      <h2 className="text-lg font-bold text-foreground">
        {labels.orderSummaryTitle}
      </h2>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.lineId} className="flex gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
              <Image
                src={item.image}
                alt={item.imageAlt}
                sizes="56px"
                fit="contain"
                className="p-1.5"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-foreground">
                {cartLineTitle(item)}
              </p>
              <p className="mt-0.5 text-sm font-bold tabular-nums text-foreground">
                {formatCartMoney(
                  cartLineUnitAmount(item) * item.quantity,
                  locale,
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {showReview && address ? (
        <dl className="mt-5 space-y-3 border-t border-muted/15 pt-5 text-sm">
          <div>
            <dt className="font-semibold text-foreground">
              {labels.addressReview}
            </dt>
            <dd className="mt-1 text-muted">
              {formatAddressOneLine(address, locale)}
            </dd>
          </div>
          {shippingLabel ? (
            <div>
              <dt className="font-semibold text-foreground">
                {labels.shipmentReview}
              </dt>
              <dd className="mt-1 text-muted">{shippingLabel}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <dl className="mt-5 space-y-2 border-t border-muted/15 pt-5 text-sm">
        <Row
          label={labels.subtotalLabel}
          value={summary.subtotal}
          locale={locale}
        />
        <Row label={labels.taxLabel} value={summary.tax} locale={locale} />
        <Row
          label={labels.shippingLabel}
          value={summary.shipping}
          locale={locale}
        />
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-muted/20 pt-4">
        <span className="font-bold text-foreground">{labels.totalLabel}</span>
        <span className="text-xl font-bold tabular-nums text-foreground">
          {formatCartMoney(summary.total, locale)}
        </span>
      </div>
    </aside>
  );
}

function Row({
  label,
  value,
  locale,
}: {
  label: string;
  value: number;
  locale: Locale;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium tabular-nums text-foreground">
        {formatCartMoney(value, locale)}
      </dd>
    </div>
  );
}
