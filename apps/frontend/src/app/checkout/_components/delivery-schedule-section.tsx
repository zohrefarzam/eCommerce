'use client';

import { Icon } from '@iconify/react';
import { Radio } from '@/components/base/radio';
import { RadioGroup } from '@/components/base/radio-group';
import { Image } from '@/components/base/image';
import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import type { CheckoutAddress } from '@/lib/checkout-data';
import {
  formatAddressOneLine,
  getDeliveryTimeSlots,
  getScheduledDateOptions,
} from '@/lib/checkout-data';
import type { CartLineItem } from '@/lib/cart-store';
import { cartLineTitle, formatCartMoney } from '@/lib/cart-utils';
import { cn } from '@/lib/utils';

type DeliveryScheduleSectionProps = {
  locale: Locale;
  labels: Messages['checkout'];
  address: CheckoutAddress | null;
  items: readonly CartLineItem[];
  scheduledDeliveryDate: string | null;
  onChangeAddress: () => void;
  onSelectDate: (value: string | null) => void;
};

export function DeliveryScheduleSection({
  locale,
  labels,
  address,
  items,
  scheduledDeliveryDate,
  onChangeAddress,
  onSelectDate,
}: DeliveryScheduleSectionProps) {
  const dateOptions = getScheduledDateOptions(locale);
  const timeSlots = getDeliveryTimeSlots(locale);
  const hasStoredSelection = Boolean(scheduledDeliveryDate?.includes('|'));
  const selectedDateId = hasStoredSelection
    ? (scheduledDeliveryDate?.split('|')[0] ?? '')
    : '';
  const selectedSlotId = hasStoredSelection
    ? (scheduledDeliveryDate?.split('|')[1] ?? '')
    : '';
  const selectedDate = dateOptions.find((d) => d.id === selectedDateId);
  const selectedSlot = timeSlots.find((s) => s.id === selectedSlotId);

  const handleSelectDate = (dateId: string) => {
    const slot = scheduledDeliveryDate?.split('|')[1] ?? timeSlots[0]?.id;
    if (slot) onSelectDate(`${dateId}|${slot}`);
  };

  const handleSelectSlot = (slotId: string) => {
    const date = scheduledDeliveryDate?.split('|')[0] ?? dateOptions[0]?.id;
    if (date) onSelectDate(`${date}|${slotId}`);
  };

  const firstItem = items[0];
  const sellerShippingFee =
    locale === 'fa' ? '۲۰۰,۰۰۰ تومان' : formatCartMoney(5, locale);

  return (
    <div
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      className="overflow-hidden rounded-xl border border-[#e0e0e2] bg-white"
    >
      <div className="border-b border-[#c8e9f5] bg-[#e8f4f8] px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-2.5">
            <Icon
              icon="lucide:truck"
              width={18}
              height={18}
              className="mt-0.5 shrink-0 text-[#19bfd3]"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#3f4064]">
                {labels.deliveryToSelectedAddress}
              </p>
              {address ? (
                <p className="mt-1.5 text-sm leading-relaxed text-[#3f4064]">
                  {formatAddressOneLine(address, locale)}
                </p>
              ) : (
                <p className="mt-1.5 text-sm text-[#81858b]">
                  {labels.addAddress}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onChangeAddress}
            className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-[#19bfd3] transition hover:opacity-80"
          >
            {labels.changeAddress}
            <Icon
              icon={
                locale === 'fa' ? 'lucide:chevron-left' : 'lucide:chevron-right'
              }
              width={14}
              height={14}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {firstItem ? (
        <div className="border-b border-[#f0f0f1] px-4 py-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#f0f0f1]">
              <Icon
                icon="lucide:user"
                width={16}
                height={16}
                className="text-[#81858b]"
              />
            </span>
            <span className="text-sm font-bold text-[#3f4064]">
              {labels.sellerShipment}
            </span>
            <span className="rounded-md bg-[#f0f0f1] px-1.5 py-0.5 text-[11px] font-bold text-[#81858b]">
              {items.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-[#f0f0f1] bg-white">
              <Image
                src={firstItem.image}
                alt={firstItem.imageAlt}
                sizes="64px"
                fit="contain"
                className="p-1"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm text-[#3f4064]">
                {cartLineTitle(firstItem)}
              </p>
              <p className="mt-1 text-xs text-[#81858b]">
                {labels.quantityShort}: {firstItem.quantity}
              </p>
            </div>
            <div className="shrink-0 text-end">
              <p className="text-xs text-[#81858b] line-through">
                {locale === 'fa' ? '۲۵۰,۰۰۰' : '$8'}
              </p>
              <p className="text-sm font-bold text-[#ef4056]">
                {sellerShippingFee}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="px-4 pt-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#3f4064]">
          <Icon
            icon="lucide:clock-3"
            width={18}
            height={18}
            className="text-[#81858b]"
          />
          {hasStoredSelection && selectedDate && selectedSlot ? (
            <span>
              {selectedDate.dayLabel} {selectedDate.dateLabel} ·{' '}
              {selectedSlot.label}
            </span>
          ) : (
            <span className="font-medium text-[#81858b]">
              {labels.deliveryNotSelected}
            </span>
          )}
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {dateOptions.map((date) => {
            const isSelected = hasStoredSelection && selectedDateId === date.id;
            return (
              <button
                key={date.id}
                type="button"
                onClick={() => handleSelectDate(date.id)}
                className={cn(
                  'flex min-w-[5.5rem] shrink-0 flex-col items-center overflow-hidden rounded-lg bg-white transition',
                  isSelected
                    ? 'border-2 border-[#424750] shadow-sm'
                    : 'border border-[#e0e0e2] hover:border-[#c0c2c5]',
                )}
              >
                <span className="pt-2.5 text-[11px] text-[#81858b]">
                  {date.dayLabel}
                </span>
                <span className="mt-0.5 text-sm font-bold text-[#3f4064]">
                  {date.dateLabel}
                </span>
                <span
                  className={cn(
                    'mt-2 w-full py-1.5 text-center text-[10px] font-medium',
                    isSelected
                      ? 'bg-[#f0f0f1] text-[#3f4064]'
                      : 'bg-[#f5f5f6] text-[#81858b]',
                  )}
                >
                  {date.feeLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <RadioGroup
        value={hasStoredSelection ? selectedSlotId : undefined}
        onChange={(value) => handleSelectSlot(String(value))}
        aria-label={labels.selectTimeSlot}
        className="mt-1 gap-0"
      >
        {timeSlots.map((slot) => (
          <Radio
            key={slot.id}
            value={slot.id}
            className="!items-center border-t border-[#f0f0f1] px-4 py-3.5"
          >
            <span className="text-sm text-[#3f4064]">{slot.label}</span>
          </Radio>
        ))}
      </RadioGroup>

      <p className="flex items-start gap-2 border-t border-[#f0f0f1] px-4 py-3 text-[11px] leading-relaxed text-[#81858b]">
        <Icon
          icon="lucide:info"
          width={14}
          height={14}
          className="mt-0.5 shrink-0"
          aria-hidden
        />
        {labels.sellerShipmentNote}
      </p>
    </div>
  );
}
