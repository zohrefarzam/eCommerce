'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Button } from '@/components/base/button';
import { Popover } from '@/components/base/popover';
import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import {
  formatAddressOneLine,
  type CheckoutAddress,
} from '@/app/checkout/_lib/checkout-data';
import { cn } from '@/components/base/_lib/utils';

type AddressCardProps = {
  address: CheckoutAddress;
  locale: Locale;
  labels: Messages['account'];
  checkoutLabels: Messages['checkout'];
  onEdit: (address: CheckoutAddress) => void;
  onDelete: (id: string) => void;
};

export function AddressCard({
  address,
  locale,
  labels,
  checkoutLabels,
  onEdit,
  onDelete,
}: AddressCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const showLocationHint =
    address.latitude == null || address.longitude == null;

  const closeMenu = () => setMenuOpen(false);

  return (
    <article className="overflow-hidden rounded-xl border border-muted/20 bg-surface">
      <div className="relative px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <Icon
            icon="lucide:map-pin"
            width={20}
            height={20}
            className="shrink-0 text-muted"
            aria-hidden
          />

          <Popover isOpen={menuOpen} onOpenChange={setMenuOpen}>
            <Popover.Trigger
              aria-label={checkoutLabels.editAddress}
              className={cn(
                'rounded-lg p-1.5 text-muted transition outline-none',
                'hover:bg-surface-secondary hover:text-foreground',
                'focus:outline-none focus-visible:!ring-0',
              )}
            >
              <Icon
                icon="lucide:ellipsis-vertical"
                width={18}
                height={18}
                aria-hidden
              />
            </Popover.Trigger>
            <Popover.Content
              placement="bottom start"
              offset={4}
              className="min-w-36 overflow-hidden rounded-xl border border-muted/20 bg-surface p-1 shadow-lg"
            >
              <Popover.Dialog className="outline-none">
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onEdit(address);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground transition hover:bg-surface-secondary"
                >
                  <Icon
                    icon="lucide:pencil"
                    width={16}
                    height={16}
                    className="shrink-0 text-muted"
                    aria-hidden
                  />
                  {checkoutLabels.editAddress}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onDelete(address.id);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground transition hover:bg-surface-secondary"
                >
                  <Icon
                    icon="lucide:trash-2"
                    width={16}
                    height={16}
                    className="shrink-0 text-muted"
                    aria-hidden
                  />
                  {checkoutLabels.deleteAddress}
                </button>
              </Popover.Dialog>
            </Popover.Content>
          </Popover>
        </div>

        <div className="mt-3 space-y-2">
          <p className="text-sm font-semibold leading-relaxed text-foreground">
            {formatAddressOneLine(address, locale)}
          </p>
          <p className="text-sm text-muted">
            <span>{labels.postalCodeLabel}</span>{' '}
            <span className="text-foreground">{address.postalCode}</span>
          </p>
          <p className="text-sm text-muted">
            <span>{labels.recipientLabel}</span>{' '}
            <span className="text-foreground">
              {address.recipientName} | {address.phone}
            </span>
          </p>
        </div>
      </div>

      {showLocationHint ? (
        <div className="flex items-center justify-between gap-3 border-t border-muted/15 bg-surface-secondary/60 px-4 py-3 sm:px-5">
          <p className="flex min-w-0 items-start gap-2 text-xs leading-relaxed text-muted">
            <Icon
              icon="lucide:info"
              width={16}
              height={16}
              className="mt-0.5 shrink-0 text-foreground"
              aria-hidden
            />
            {labels.locationMismatchHint}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto min-h-0 shrink-0 px-2 py-1 text-xs font-semibold text-foreground"
            onPress={() => onEdit(address)}
          >
            {labels.editLocation}
          </Button>
        </div>
      ) : null}
    </article>
  );
}
