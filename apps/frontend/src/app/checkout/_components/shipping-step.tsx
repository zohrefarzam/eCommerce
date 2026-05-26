'use client';

import type { Messages } from '@/i18n/messages';
import type { Locale } from '@/i18n/config';
import {
  getDeliveryTimeSlots,
  getScheduledDateOptions,
  type ShippingMethodId,
} from '@/lib/checkout-data';
import { Radio } from '@/components/base/radio';
import { RadioGroup } from '@/components/base/radio-group';
import { Select } from '@/components/base/select';
import { cn } from '@/lib/utils';
import { CheckoutNavButtons } from './checkout-nav-buttons';

type ShippingStepProps = {
  locale: Locale;
  labels: Messages['checkout'];
  shippingMethodId: ShippingMethodId;
  scheduledDeliveryDate: string | null;
  onSelectMethod: (id: ShippingMethodId) => void;
  onSelectDate: (date: string | null) => void;
  onBack: () => void;
  onNext: () => void;
};

function deliveryEta(methodId: ShippingMethodId, locale: Locale): string {
  if (locale === 'fa') {
    if (methodId === 'express') return '۱ تا ۲ روز کاری';
    if (methodId === 'scheduled') return 'طبق زمان انتخابی';
    return '۳ تا ۵ روز کاری';
  }
  if (methodId === 'express') return '1–2 business days';
  if (methodId === 'scheduled') return 'As scheduled';
  return '3–5 business days';
}

export function ShippingStep({
  locale,
  labels,
  shippingMethodId,
  scheduledDeliveryDate,
  onSelectMethod,
  onSelectDate,
  onBack,
  onNext,
}: ShippingStepProps) {
  const dateOptions = getScheduledDateOptions(locale);
  const timeSlots = getDeliveryTimeSlots(locale);

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
    {
      id: 'scheduled',
      title: labels.shippingScheduled,
      description: labels.shippingScheduledDesc,
    },
  ];

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <h2 className="text-lg font-bold text-foreground sm:text-xl">
        {labels.shipmentMethodTitle}
      </h2>

      <RadioGroup
        value={shippingMethodId}
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
              {method.id === 'scheduled' ? (
                <div
                  className="flex flex-col gap-2 sm:w-48"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <Select
                    options={dateOptions}
                    selectedKey={
                      scheduledDeliveryDate?.split('|')[0] ??
                      dateOptions[0]?.id ??
                      ''
                    }
                    onSelectionChange={(key) => {
                      const slot = scheduledDeliveryDate?.split('|')[1];
                      onSelectDate(
                        slot ? `${String(key)}|${slot}` : String(key),
                      );
                    }}
                    placeholder={labels.selectDate}
                    aria-label={labels.selectDate}
                  />
                  <Select
                    options={timeSlots}
                    selectedKey={
                      scheduledDeliveryDate?.split('|')[1] ??
                      timeSlots[0]?.id ??
                      ''
                    }
                    onSelectionChange={(key) => {
                      const date =
                        scheduledDeliveryDate?.split('|')[0] ??
                        dateOptions[0]?.id;
                      if (date) onSelectDate(`${date}|${String(key)}`);
                    }}
                    placeholder={labels.selectTimeSlot}
                    aria-label={labels.selectTimeSlot}
                  />
                </div>
              ) : (
                <p className="shrink-0 text-sm font-medium text-muted">
                  {labels.deliveryBy} {deliveryEta(method.id, locale)}
                </p>
              )}
            </div>
          </Radio>
        ))}
      </RadioGroup>

      <CheckoutNavButtons
        backLabel={labels.back}
        nextLabel={labels.next}
        onBack={onBack}
        onNext={onNext}
        nextDisabled={
          shippingMethodId === 'scheduled' &&
          !scheduledDeliveryDate?.includes('|')
        }
      />
    </section>
  );
}
