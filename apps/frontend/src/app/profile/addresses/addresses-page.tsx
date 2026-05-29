'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { AddAddressModal } from '@/app/checkout/_components/add-address-modal';
import { Button } from '@/components/base/button';
import { useLocale } from '@/i18n';
import type { CheckoutAddress } from '@/lib/checkout-data';
import { useCheckoutStore } from '@/lib/checkout-store';
import { ProfileContentCard } from '../_components/profile-shell';
import { AddressCard } from './_components/address-card';

export function ProfileAddressesPage() {
  const { messages, locale } = useLocale();
  const labels = messages.account;
  const checkoutLabels = messages.checkout;

  const addresses = useCheckoutStore((s) => s.addresses);
  const hydrateDefaults = useCheckoutStore((s) => s.hydrateDefaults);
  const addAddress = useCheckoutStore((s) => s.addAddress);
  const updateAddress = useCheckoutStore((s) => s.updateAddress);
  const removeAddress = useCheckoutStore((s) => s.removeAddress);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CheckoutAddress | null>(null);

  useEffect(() => {
    hydrateDefaults(locale);
  }, [hydrateDefaults, locale]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (address: CheckoutAddress) => {
    setEditing(address);
    setModalOpen(true);
  };

  return (
    <>
      <ProfileContentCard
        title={labels.addresses}
        headerEnd={
          <Button
            variant="ghost"
            size="sm"
            className="h-auto min-h-0 gap-1 px-2 py-1 text-sm font-semibold text-foreground"
            onPress={openAdd}
          >
            <Icon icon="lucide:plus" width={18} height={18} aria-hidden />
            {labels.addNewAddress}
          </Button>
        }
      >
        <div className="flex flex-col gap-6">
          <Button
            variant="outline"
            fullWidth
            className="h-12 justify-center gap-2 rounded-xl border-muted/25 bg-background text-sm font-normal text-foreground"
            onPress={openAdd}
          >
            <Icon
              icon="lucide:map"
              width={20}
              height={20}
              className="text-muted"
              aria-hidden
            />
            {labels.selectLocationOnMap}
          </Button>

          <div>
            <h2 className="text-base font-bold text-foreground">
              {labels.myAddressesSection}
            </h2>

            {addresses.length === 0 ? (
              <p className="mt-6 text-center text-sm text-muted">
                {labels.addressesEmpty}
              </p>
            ) : (
              <ul className="mt-4 flex flex-col gap-4">
                {addresses.map((address) => (
                  <li key={address.id}>
                    <AddressCard
                      address={address}
                      locale={locale}
                      labels={labels}
                      checkoutLabels={checkoutLabels}
                      onEdit={openEdit}
                      onDelete={removeAddress}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </ProfileContentCard>

      <AddAddressModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        locale={locale}
        labels={checkoutLabels}
        initial={editing}
        onSave={(input) => {
          if (editing) {
            updateAddress(editing.id, input);
          } else {
            addAddress(input);
          }
        }}
      />
    </>
  );
}
