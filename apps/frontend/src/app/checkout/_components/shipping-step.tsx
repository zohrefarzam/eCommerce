'use client';

import type { Messages } from '@/i18n/messages';
import type { Locale } from '@/i18n/config';
import { type ShippingMethodId } from '@/lib/checkout-data';
import { Radio } from '@/components/base/radio';
import { RadioGroup } from '@/components/base/radio-group';
import { cn } from '@/lib/utils';
import { CheckoutNavButtons } from './checkout-nav-buttons';

type ShippingStepProps = {
  locale: Locale;
  labels: Messages['checkout'];
  shippingMethodId: ShippingMethodId;
  onSelectMethod: (id: ShippingMethodId) => void;
  onBack: () => void;
  onNext: () => void;
};

function deliveryEta(methodId: ShippingMethodId, locale: Locale): string {
  if (locale === 'fa') {
    if (methodId === 'express') return '۱ تا ۲ روز کاری';
    return '۳ تا ۵ روز کاری';
  }
  if (methodId === 'express') return '1–2 business days';
  return '3–5 business days';
}

export function ShippingStep({
  locale,
  labels,
  shippingMethodId,
  onSelectMethod,
  onBack,
  onNext,
}: ShippingStepProps) {
  const methods: {
    id: ShippingMethodId;
    title: string;
    description: string;
  }[] = [
    {
      id: 'free',
      title: labels.shippingFree,
      description: labels.shippingFreeDesc,
    },
    {
      id: 'express',
      title: labels.shippingExpress,
      description: labels.shippingExpressDesc,
    },
  ];

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <h2 className="text-lg font-bold text-foreground sm:text-xl">
        {labels.shipmentMethodTitle}
      </h2>

      <RadioGroup
        value={
          shippingMethodId === 'free' || shippingMethodId === 'express'
            ? shippingMethodId
            : 'free'
        }
        onChange={(value) => onSelectMethod(value as ShippingMethodId)}
        aria-label={labels.shipmentMethodTitle}
        className="gap-4"
      >
        {methods.map((method) => (
          <Radio key={method.id} value={method.id} className="!items-stretch">
            <div
              className={cn(
                'flex w-full flex-col gap-3 rounded-xl border-2 bg-surface-secondary px-4 py-4 sm:flex-row sm:items-center sm:justify-between',
                shippingMethodId === method.id
                  ? 'border-foreground'
                  : 'border-transparent',
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{method.title}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {method.description}
                </p>
              </div>
              <p className="shrink-0 text-sm font-medium text-muted">
                {labels.deliveryBy} {deliveryEta(method.id, locale)}
              </p>
            </div>
          </Radio>
        ))}
      </RadioGroup>

      <CheckoutNavButtons
        backLabel={labels.back}
        nextLabel={labels.next}
        onBack={onBack}
        onNext={onNext}
      />
    </section>
  );
}
