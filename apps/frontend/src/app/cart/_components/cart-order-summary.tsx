'use client';

import { useState } from 'react';
import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { CheckoutAuthButton } from '@/components/ui/checkout-auth-button';
import type { Locale } from '@/i18n/config';
import { formatCartMoney, getCartOrderSummary } from '@/lib/cart-utils';
import type { CartLineItem } from '@/lib/cart-store';
import { cn } from '@/lib/utils';

type CartOrderSummaryCardProps = {
  items: readonly CartLineItem[];
  locale: Locale;
  labels: {
    title: string;
    discountCodeLabel: string;
    bonusCardLabel: string;
    bonusCardApply: string;
    subtotalLabel: string;
    taxLabel: string;
    shippingLabel: string;
    totalLabel: string;
    checkout: string;
  };
  className?: string;
};

export function CartOrderSummaryCard({
  items,
  locale,
  labels,
  className,
}: CartOrderSummaryCardProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [bonusCard, setBonusCard] = useState('');
  const summary = getCartOrderSummary(items, locale);

  return (
    <aside
      className={cn(
        'rounded-2xl border border-muted/20 bg-surface p-5 sm:p-6 lg:sticky lg:top-24',
        className,
      )}
    >
      <h2 className="text-lg font-bold text-foreground sm:text-xl">
        {labels.title}
      </h2>

      <div className="mt-5 flex flex-col gap-4">
        <Input
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder={labels.discountCodeLabel}
          aria-label={labels.discountCodeLabel}
        />

        <Input
          value={bonusCard}
          onChange={(e) => setBonusCard(e.target.value)}
          placeholder={labels.bonusCardLabel}
          aria-label={labels.bonusCardLabel}
          endContent={
            <Button
              variant="ghost"
              size="sm"
              className="h-auto min-h-0 px-2 py-1 text-xs font-semibold text-foreground"
            >
              {labels.bonusCardApply}
            </Button>
          }
        />
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <SummaryRow
          label={labels.subtotalLabel}
          value={summary.subtotal}
          locale={locale}
        />
        <SummaryRow
          label={labels.taxLabel}
          value={summary.tax}
          locale={locale}
        />
        <SummaryRow
          label={labels.shippingLabel}
          value={summary.shipping}
          locale={locale}
        />
      </dl>

      <div className="mt-5 flex items-baseline justify-between border-t border-muted/20 pt-5">
        <dt className="text-base font-bold text-foreground">
          {labels.totalLabel}
        </dt>
        <dd className="text-xl font-bold tabular-nums text-foreground sm:text-2xl">
          {formatCartMoney(summary.total, locale)}
        </dd>
      </div>

      <CheckoutAuthButton
        label={labels.checkout}
        disabled={items.length === 0}
        className="mt-6 h-12 rounded-xl !bg-foreground !text-background text-base font-semibold hover:!bg-foreground/90"
      />
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  locale,
}: {
  label: string;
  value: number;
  locale: Locale;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium tabular-nums text-foreground">
        {formatCartMoney(value, locale)}
      </dd>
    </div>
  );
}
