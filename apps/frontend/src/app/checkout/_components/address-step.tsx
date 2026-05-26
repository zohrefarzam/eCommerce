'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { Radio } from '@/components/base/radio';
import { RadioGroup } from '@/components/base/radio-group';
import type { Messages } from '@/i18n/messages';
import type { CheckoutAddress } from '@/lib/checkout-data';
import type { AddressTag } from '@/lib/checkout-data';
import { formatAddressOneLine } from '@/lib/checkout-data';
import { hasValidSelectedAddress } from '@/lib/checkout-store';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { AddAddressModal } from './add-address-modal';
import { CheckoutNavButtons } from './checkout-nav-buttons';

type AddressStepProps = {
  locale: Locale;
  labels: Messages['checkout'];
  addresses: CheckoutAddress[];
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
  onAdd: (input: Omit<CheckoutAddress, 'id'>) => void;
  onUpdate: (id: string, input: Omit<CheckoutAddress, 'id'>) => void;
  onRemove: (id: string) => void;
  onNext: () => void;
};

function tagLabel(tag: AddressTag, labels: Messages['checkout']) {
  if (tag === 'home') return labels.addressTagHome;
  if (tag === 'office') return labels.addressTagOffice;
  return labels.addressTagOther;
}

export function AddressStep({
  locale,
  labels,
  addresses,
  selectedAddressId,
  onSelect,
  onAdd,
  onUpdate,
  onRemove,
  onNext,
}: AddressStepProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CheckoutAddress | null>(null);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (address: CheckoutAddress) => {
    setEditing(address);
    setModalOpen(true);
  };

  const canProceed = hasValidSelectedAddress({ addresses, selectedAddressId });

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <h2 className="text-lg font-bold text-foreground sm:text-xl">
        {labels.selectAddressTitle}
      </h2>

      <RadioGroup
        value={selectedAddressId ?? undefined}
        onChange={(value) => onSelect(String(value))}
        aria-label={labels.selectAddressTitle}
        className="gap-4"
      >
        {addresses.map((address) => (
          <Radio key={address.id} value={address.id} className="!items-stretch">
            <div
              className={cn(
                'flex w-full flex-col gap-2 rounded-xl border-2 bg-surface-secondary px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4',
                selectedAddressId === address.id
                  ? 'border-foreground'
                  : 'border-transparent',
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {address.label}
                  </span>
                  <span className="rounded-md bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-background">
                    {tagLabel(address.tag, labels)}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted">
                  {formatAddressOneLine(address, locale)}
                </p>
                <p className="mt-1 text-sm text-muted" dir="ltr">
                  {address.phone}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1 self-end sm:self-center">
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  aria-label={labels.editAddress}
                  className="size-9 text-muted"
                  onPress={() => openEdit(address)}
                >
                  <Icon
                    icon="lucide:pencil"
                    width={16}
                    height={16}
                    aria-hidden
                  />
                </Button>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  aria-label={labels.deleteAddress}
                  className="size-9 text-muted"
                  onPress={() => onRemove(address.id)}
                >
                  <Icon icon="lucide:x" width={16} height={16} aria-hidden />
                </Button>
              </div>
            </div>
          </Radio>
        ))}
      </RadioGroup>

      <button
        type="button"
        onClick={openAdd}
        className="mx-auto flex flex-col items-center gap-2 rounded-xl py-4 text-sm font-medium text-muted transition hover:text-foreground"
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
        labels={labels}
        initial={editing}
        onSave={(input) => {
          if (editing) onUpdate(editing.id, input);
          else onAdd(input);
        }}
      />
    </section>
  );
}
