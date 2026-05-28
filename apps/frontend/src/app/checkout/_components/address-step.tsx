'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { Radio } from '@/components/base/radio';
import { RadioGroup } from '@/components/base/radio-group';
import type { Messages } from '@/i18n/messages';
import type { CheckoutAddress } from '@/lib/checkout-data';
import { isAddressStepComplete } from '@/lib/checkout-store';
import type { Locale } from '@/i18n/config';
import { useCartStore } from '@/lib/cart-store';
import { formatAddressOneLine } from '@/lib/checkout-data';
import { cn } from '@/lib/utils';
import { AddAddressModal } from './add-address-modal';
import { CheckoutNavButtons } from './checkout-nav-buttons';
import { DeliveryScheduleSection } from './delivery-schedule-section';

type AddressStepProps = {
  locale: Locale;
  labels: Messages['checkout'];
  addresses: CheckoutAddress[];
  selectedAddressId: string | null;
  scheduledDeliveryDate: string | null;
  onSelect: (id: string) => void;
  onAdd: (input: Omit<CheckoutAddress, 'id'>) => void;
  onUpdate: (id: string, input: Omit<CheckoutAddress, 'id'>) => void;
  onRemove: (id: string) => void;
  onSelectDate: (date: string | null) => void;
  onNext: () => void;
};

export function AddressStep({
  locale,
  labels,
  addresses,
  selectedAddressId,
  scheduledDeliveryDate,
  onSelect,
  onAdd,
  onUpdate,
  onRemove,
  onSelectDate,
  onNext,
}: AddressStepProps) {
  const cartItems = useCartStore((s) => s.items);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [editing, setEditing] = useState<CheckoutAddress | null>(null);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (address: CheckoutAddress) => {
    setEditing(address);
    setModalOpen(true);
  };

  const canProceed = isAddressStepComplete({
    addresses,
    selectedAddressId,
    scheduledDeliveryDate,
  });
  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ?? null;

  useEffect(() => {
    if (!selectorOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectorOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectorOpen]);

  return (
    <section className="flex flex-col gap-5 sm:gap-6">
      <DeliveryScheduleSection
        locale={locale}
        labels={labels}
        address={selectedAddress}
        items={cartItems}
        scheduledDeliveryDate={scheduledDeliveryDate}
        onChangeAddress={() => setSelectorOpen(true)}
        onSelectDate={onSelectDate}
      />

      <button
        type="button"
        onClick={openAdd}
        className="mx-auto flex flex-col items-center gap-2 rounded-xl py-2 text-sm font-medium text-muted transition hover:text-foreground"
      >
        <span className="flex size-10 items-center justify-center rounded-full border-2 border-dashed border-muted/40">
          <Icon icon="lucide:plus" width={20} height={20} aria-hidden />
        </span>
        {labels.addAddress}
      </button>

      <CheckoutNavButtons
        backLabel={labels.back}
        nextLabel={labels.next}
        showBack={false}
        onNext={onNext}
        nextDisabled={!canProceed}
      />

      <AddAddressModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        locale={locale}
        labels={labels}
        initial={editing}
        onSave={(input) => {
          if (editing) onUpdate(editing.id, input);
          else onAdd(input);
          setSelectorOpen(true);
        }}
      />

      <section
        className={cn(
          'fixed inset-0 z-40 bg-foreground/35 transition',
          selectorOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!selectorOpen}
        onClick={() => setSelectorOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="address-selector-title"
          className={cn(
            'mx-auto mt-14 w-[min(92vw,680px)] rounded-2xl bg-surface p-4 shadow-xl transition sm:mt-16',
            selectorOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0',
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3
              id="address-selector-title"
              className="text-base font-bold text-foreground"
            >
              {labels.selectAddressModalTitle}
            </h3>
            <button
              type="button"
              onClick={() => setSelectorOpen(false)}
              className="text-muted transition hover:text-foreground"
              aria-label={labels.cancel}
            >
              <Icon icon="lucide:x" width={18} height={18} />
            </button>
          </div>
          <RadioGroup
            value={selectedAddressId ?? undefined}
            onChange={(value) => {
              onSelect(String(value));
              setSelectorOpen(false);
            }}
            aria-label={labels.selectAddressTitle}
            className="max-h-[52vh] gap-3 overflow-y-auto pe-1"
          >
            {addresses.map((address) => (
              <Radio
                key={address.id}
                value={address.id}
                className="!items-stretch"
              >
                <div
                  className={cn(
                    'w-full rounded-xl border px-3 py-3',
                    selectedAddressId === address.id
                      ? 'border-[#19bfd3] bg-[#19bfd3]/5'
                      : 'border-muted/20',
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {address.label}
                    </p>
                    <div className="flex items-center gap-1">
                      <Button
                        isIconOnly
                        variant="ghost"
                        size="sm"
                        aria-label={labels.editAddress}
                        className="size-8 text-muted"
                        onPress={() => {
                          setSelectorOpen(false);
                          openEdit(address);
                        }}
                      >
                        <Icon
                          icon="lucide:pencil"
                          width={14}
                          height={14}
                          aria-hidden
                        />
                      </Button>
                      <Button
                        isIconOnly
                        variant="ghost"
                        size="sm"
                        aria-label={labels.deleteAddress}
                        className="size-8 text-muted"
                        onPress={() => onRemove(address.id)}
                      >
                        <Icon
                          icon="lucide:trash-2"
                          width={14}
                          height={14}
                          aria-hidden
                        />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted">
                    {formatAddressOneLine(address, locale)}
                  </p>
                  <p className="mt-1 text-xs text-muted" dir="ltr">
                    {address.phone}
                  </p>
                </div>
              </Radio>
            ))}
          </RadioGroup>
          <div className="mt-4 border-t border-muted/15 pt-3">
            <Button
              variant="ghost"
              fullWidth
              className="justify-center text-sm font-semibold text-[#ef4056]"
              onPress={() => {
                setSelectorOpen(false);
                openAdd();
              }}
            >
              <Icon icon="lucide:plus" width={16} height={16} />
              {labels.addAddress}
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
