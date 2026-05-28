'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/i18n/config';
import {
  createDefaultAddresses,
  getDeliveryTimeSlots,
  getScheduledDateOptions,
  getShippingPrice,
  type CheckoutAddress,
  type CheckoutAddressInput,
  type PaymentMethodId,
  type ShippingMethodId,
} from '@/lib/checkout-data';

export type CheckoutStep = 1 | 2 | 3;

export type PaymentDetails = {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingSameAsShipping: boolean;
};

type CheckoutState = {
  step: CheckoutStep;
  addresses: CheckoutAddress[];
  selectedAddressId: string | null;
  shippingMethodId: ShippingMethodId;
  scheduledDeliveryDate: string | null;
  paymentMethodId: PaymentMethodId;
  payment: PaymentDetails;
  setStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelectedAddressId: (id: string) => void;
  addAddress: (input: CheckoutAddressInput) => string;
  updateAddress: (id: string, input: CheckoutAddressInput) => void;
  removeAddress: (id: string) => void;
  setShippingMethodId: (id: ShippingMethodId, locale?: Locale) => void;
  setScheduledDeliveryDate: (date: string | null) => void;
  setPaymentMethodId: (id: PaymentMethodId) => void;
  setPaymentField: <K extends keyof PaymentDetails>(
    key: K,
    value: PaymentDetails[K],
  ) => void;
  resetCheckout: () => void;
  hydrateDefaults: (locale: Locale) => void;
  syncSelectedAddress: () => void;
};

const defaultPayment: PaymentDetails = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  billingSameAsShipping: true,
};

type CheckoutProgressState = {
  addresses: CheckoutAddress[];
  selectedAddressId: string | null;
  shippingMethodId: ShippingMethodId;
  scheduledDeliveryDate: string | null;
};

export function hasValidSelectedAddress(
  state: Pick<CheckoutProgressState, 'addresses' | 'selectedAddressId'>,
): boolean {
  return (
    state.selectedAddressId != null &&
    state.addresses.some((address) => address.id === state.selectedAddressId)
  );
}

export function isAddressStepComplete(
  state: Pick<
    CheckoutProgressState,
    'addresses' | 'selectedAddressId' | 'scheduledDeliveryDate'
  >,
): boolean {
  return (
    hasValidSelectedAddress(state) &&
    (state.scheduledDeliveryDate?.includes('|') ?? false)
  );
}

export function isShippingStepComplete(
  state: Pick<CheckoutProgressState, 'shippingMethodId'>,
): boolean {
  return (
    state.shippingMethodId === 'free' || state.shippingMethodId === 'express'
  );
}

export function isCheckoutComplete(state: CheckoutProgressState): boolean {
  return isAddressStepComplete(state) && isShippingStepComplete(state);
}

export function getMaxAllowedCheckoutStep(
  state: CheckoutProgressState,
): CheckoutStep {
  if (!isAddressStepComplete(state)) return 1;
  if (!isShippingStepComplete(state)) return 2;
  return 3;
}

export function clampCheckoutStep(
  requested: CheckoutStep,
  state: CheckoutProgressState,
): CheckoutStep {
  const max = getMaxAllowedCheckoutStep(state);
  return requested > max ? max : requested;
}

export function getDefaultScheduledDeliveryDate(locale: Locale): string | null {
  const dateId = getScheduledDateOptions(locale)[0]?.id;
  const slotId = getDeliveryTimeSlots(locale)[0]?.id;
  if (!dateId || !slotId) return null;
  return `${dateId}|${slotId}`;
}

function resolveSelectedAddressId(
  addresses: CheckoutAddress[],
  selectedAddressId: string | null,
): string | null {
  if (
    selectedAddressId != null &&
    addresses.some((address) => address.id === selectedAddressId)
  ) {
    return selectedAddressId;
  }
  return addresses[0]?.id ?? null;
}

function createInitialState(locale: Locale = 'fa') {
  const addresses = createDefaultAddresses(locale);
  return {
    step: 1 as CheckoutStep,
    addresses,
    selectedAddressId: addresses[0]?.id ?? null,
    shippingMethodId: 'scheduled' as ShippingMethodId,
    scheduledDeliveryDate: null as string | null,
    paymentMethodId: (locale === 'fa' ? 'online' : 'card') as PaymentMethodId,
    payment: { ...defaultPayment },
  };
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      ...createInitialState('fa'),

      setStep: (step) => set({ step }),

      nextStep: () => {
        const { step } = get();
        if (step < 3) set({ step: (step + 1) as CheckoutStep });
      },

      prevStep: () => {
        const { step } = get();
        if (step > 1) set({ step: (step - 1) as CheckoutStep });
      },

      setSelectedAddressId: (id) => set({ selectedAddressId: id }),

      addAddress: (input) => {
        const id = `addr-${Date.now()}`;
        const next: CheckoutAddress = { id, ...input };
        set({
          addresses: [...get().addresses, next],
          selectedAddressId: id,
        });
        return id;
      },

      updateAddress: (id, input) => {
        set({
          addresses: get().addresses.map((a) =>
            a.id === id ? { ...a, ...input, id } : a,
          ),
        });
      },

      removeAddress: (id) => {
        const remaining = get().addresses.filter((a) => a.id !== id);
        const selected =
          get().selectedAddressId === id
            ? (remaining[0]?.id ?? null)
            : get().selectedAddressId;
        set({
          addresses: remaining,
          selectedAddressId: resolveSelectedAddressId(remaining, selected),
        });
      },

      setShippingMethodId: (id, _locale?: Locale) => {
        set({ shippingMethodId: id });
      },

      setScheduledDeliveryDate: (date) => set({ scheduledDeliveryDate: date }),

      setPaymentMethodId: (id) => set({ paymentMethodId: id }),

      setPaymentField: (key, value) => {
        set({ payment: { ...get().payment, [key]: value } });
      },

      resetCheckout: () => set(createInitialState('fa')),

      hydrateDefaults: (locale) => {
        const current = get();
        if (current.addresses.length > 0) return;
        const addresses = createDefaultAddresses(locale);
        set({
          addresses,
          selectedAddressId: resolveSelectedAddressId(
            addresses,
            addresses[0]?.id ?? null,
          ),
          paymentMethodId: locale === 'fa' ? 'online' : 'card',
        });
      },

      syncSelectedAddress: () => {
        const { addresses, selectedAddressId } = get();
        const resolved = resolveSelectedAddressId(addresses, selectedAddressId);
        if (resolved !== selectedAddressId) {
          set({ selectedAddressId: resolved });
        }
      },
    }),
    {
      name: 'storefront-checkout',
      partialize: (state) => ({
        step: state.step,
        addresses: state.addresses,
        selectedAddressId: state.selectedAddressId,
        shippingMethodId: state.shippingMethodId,
        scheduledDeliveryDate: state.scheduledDeliveryDate,
        paymentMethodId: state.paymentMethodId,
        billingSameAsShipping: state.payment.billingSameAsShipping,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<CheckoutState> & {
          billingSameAsShipping?: boolean;
        };
        const {
          billingSameAsShipping,
          payment: _payment,
          ...checkoutFields
        } = saved;
        return {
          ...current,
          ...checkoutFields,
          payment: {
            ...defaultPayment,
            billingSameAsShipping:
              billingSameAsShipping ?? current.payment.billingSameAsShipping,
          },
        };
      },
    },
  ),
);

export function selectSelectedAddress(
  state: CheckoutState,
): CheckoutAddress | null {
  return state.addresses.find((a) => a.id === state.selectedAddressId) ?? null;
}

export function getCheckoutShippingCost(
  shippingMethodId: ShippingMethodId,
  locale: Locale,
): number {
  return getShippingPrice(shippingMethodId, locale);
}
