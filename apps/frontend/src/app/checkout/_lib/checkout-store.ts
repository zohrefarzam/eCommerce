'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/i18n/config';
import {
  getDeliveryTimeSlots,
  getScheduledDateOptions,
  getShippingPrice,
  type CheckoutAddress,
  type PaymentMethodId,
  type ShippingMethodId,
} from '@/app/checkout/_lib/checkout-data';

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
  selectedAddressId: string | null;
  shippingMethodId: ShippingMethodId;
  scheduledDeliveryDate: string | null;
  paymentMethodId: PaymentMethodId;
  payment: PaymentDetails;
  setStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelectedAddressId: (id: string | null) => void;
  setShippingMethodId: (id: ShippingMethodId, locale?: Locale) => void;
  setScheduledDeliveryDate: (date: string | null) => void;
  setPaymentMethodId: (id: PaymentMethodId) => void;
  setPaymentField: <K extends keyof PaymentDetails>(
    key: K,
    value: PaymentDetails[K],
  ) => void;
  resetCheckout: (locale?: Locale) => void;
  applyLocaleDefaults: (locale: Locale) => void;
};

const defaultPayment: PaymentDetails = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  billingSameAsShipping: true,
};

export type CheckoutProgressState = {
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

export function resolveSelectedAddressId(
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

export function getSelectedAddress(
  addresses: CheckoutAddress[],
  selectedAddressId: string | null,
): CheckoutAddress | null {
  return addresses.find((a) => a.id === selectedAddressId) ?? null;
}

function createInitialState(locale: Locale = 'fa') {
  return {
    step: 1 as CheckoutStep,
    selectedAddressId: null as string | null,
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

      setShippingMethodId: (id, _locale?: Locale) => {
        set({ shippingMethodId: id });
      },

      setScheduledDeliveryDate: (date) => set({ scheduledDeliveryDate: date }),

      setPaymentMethodId: (id) => set({ paymentMethodId: id }),

      setPaymentField: (key, value) => {
        set({ payment: { ...get().payment, [key]: value } });
      },

      resetCheckout: (locale = 'fa') => set(createInitialState(locale)),

      applyLocaleDefaults: (locale) => {
        set({ paymentMethodId: locale === 'fa' ? 'online' : 'card' });
      },
    }),
    {
      name: 'storefront-checkout',
      version: 1,
      partialize: (state) => ({
        step: state.step,
        selectedAddressId: state.selectedAddressId,
        shippingMethodId: state.shippingMethodId,
        scheduledDeliveryDate: state.scheduledDeliveryDate,
        paymentMethodId: state.paymentMethodId,
        billingSameAsShipping: state.payment.billingSameAsShipping,
      }),
      migrate: (persisted) => {
        const saved = persisted as Partial<CheckoutState> & {
          addresses?: unknown;
        };
        const { addresses: _addresses, ...rest } = saved;
        return { ...createInitialState('fa'), ...rest };
      },
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

export function getCheckoutShippingCost(
  shippingMethodId: ShippingMethodId,
  locale: Locale,
): number {
  return getShippingPrice(shippingMethodId, locale);
}
