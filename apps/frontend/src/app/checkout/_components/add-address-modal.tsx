'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { Modal } from '@/components/base/modal';
import { Select } from '@/components/base/select';
import type { Messages } from '@/i18n/messages';
import type {
  AddressTag,
  CheckoutAddress,
  CheckoutAddressInput,
} from '@/lib/checkout-data';

type AddAddressModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  labels: Messages['checkout'];
  initial?: CheckoutAddress | null;
  onSave: (input: CheckoutAddressInput) => void;
};

const emptyForm: CheckoutAddressInput = {
  label: '',
  tag: 'home',
  recipientName: '',
  province: '',
  city: '',
  street: '',
  postalCode: '',
  phone: '',
};

export function AddAddressModal({
  isOpen,
  onOpenChange,
  labels,
  initial,
  onSave,
}: AddAddressModalProps) {
  const [form, setForm] = useState<CheckoutAddressInput>(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setForm(
        initial
          ? {
              label: initial.label,
              tag: initial.tag,
              recipientName: initial.recipientName,
              province: initial.province,
              city: initial.city,
              street: initial.street,
              postalCode: initial.postalCode,
              phone: initial.phone,
            }
          : emptyForm,
      );
    }
  }, [isOpen, initial]);

  const tagOptions = [
    { id: 'home', label: labels.addressTagHome },
    { id: 'office', label: labels.addressTagOffice },
    { id: 'other', label: labels.addressTagOther },
  ];

  const update = <K extends keyof CheckoutAddressInput>(
    key: K,
    value: CheckoutAddressInput[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!form.label.trim() || !form.street.trim() || !form.phone.trim()) return;
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={initial ? labels.editAddress : labels.addAddressModalTitle}
      placement="center"
    >
      <div className="flex flex-col gap-4">
        <Input
          value={form.label}
          onChange={(e) => update('label', e.target.value)}
          placeholder={labels.addressLabel}
          aria-label={labels.addressLabel}
        />
        <Select
          options={tagOptions}
          selectedKey={form.tag}
          onSelectionChange={(key) => update('tag', key as AddressTag)}
          aria-label={labels.addressLabel}
        />
        <Input
          value={form.recipientName}
          onChange={(e) => update('recipientName', e.target.value)}
          placeholder={labels.recipientName}
          aria-label={labels.recipientName}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={form.province}
            onChange={(e) => update('province', e.target.value)}
            placeholder={labels.province}
            aria-label={labels.province}
          />
          <Input
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
            placeholder={labels.city}
            aria-label={labels.city}
          />
        </div>
        <Input
          value={form.street}
          onChange={(e) => update('street', e.target.value)}
          placeholder={labels.street}
          aria-label={labels.street}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={form.postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
            placeholder={labels.postalCode}
            aria-label={labels.postalCode}
          />
          <Input
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder={labels.phone}
            aria-label={labels.phone}
            type="tel"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            fullWidth
            className="h-11 rounded-xl"
            onPress={() => onOpenChange(false)}
          >
            {labels.cancel}
          </Button>
          <Button
            variant="primary"
            fullWidth
            className="h-11 rounded-xl !bg-foreground !text-background font-semibold"
            onPress={handleSave}
          >
            {labels.saveAddress}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
