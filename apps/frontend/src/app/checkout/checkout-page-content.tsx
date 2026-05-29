'use client';

import { useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MarketingHeader } from '@/components/ui/marketing-header';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { SiteShell } from '@/landing/_components/layout/site-shell';
import { useLocale } from '@/i18n';
import { useCartStore } from '@/lib/cart-store';
import { useAuth } from '@/providers/auth-provider';
import {
  getDeliveryTimeSlots,
  getScheduledDateLabel,
  getScheduledDateOptions,
} from '@/lib/checkout-data';
import {
  clampCheckoutStep,
  isCheckoutComplete,
  selectSelectedAddress,
  useCheckoutStore,
  type CheckoutStep,
} from '@/lib/checkout-store';
import { AddressStep } from './_components/address-step';
import { CheckoutStepper } from './_components/checkout-stepper';
import { PaymentStep } from './_components/payment-step';
import { ShippingStep } from './_components/shipping-step';

function parseStep(value: string | null): CheckoutStep {
  if (value === 'shipping' || value === '2') return 2;
  if (value === 'payment' || value === '3') return 3;
  return 1;
}

function stepToParam(step: CheckoutStep): string {
  if (step === 2) return 'shipping';
  if (step === 3) return 'payment';
  return 'address';
}

export function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { messages, locale } = useLocale();
  const { isAuthenticated, isReady } = useAuth();
  const labels = messages.checkout;
  const cartItems = useCartStore((s) => s.items);

  const step = useCheckoutStore((s) => s.step);
  const setStep = useCheckoutStore((s) => s.setStep);
  const hydrateDefaults = useCheckoutStore((s) => s.hydrateDefaults);
  const syncSelectedAddress = useCheckoutStore((s) => s.syncSelectedAddress);
  const addresses = useCheckoutStore((s) => s.addresses);
  const selectedAddressId = useCheckoutStore((s) => s.selectedAddressId);
  const setSelectedAddressId = useCheckoutStore((s) => s.setSelectedAddressId);
  const addAddress = useCheckoutStore((s) => s.addAddress);
  const updateAddress = useCheckoutStore((s) => s.updateAddress);
  const removeAddress = useCheckoutStore((s) => s.removeAddress);
  const shippingMethodId = useCheckoutStore((s) => s.shippingMethodId);
  const scheduledDeliveryDate = useCheckoutStore(
    (s) => s.scheduledDeliveryDate,
  );
  const setShippingMethodId = useCheckoutStore((s) => s.setShippingMethodId);
  const setScheduledDeliveryDate = useCheckoutStore(
    (s) => s.setScheduledDeliveryDate,
  );
  const paymentMethodId = useCheckoutStore((s) => s.paymentMethodId);
  const payment = useCheckoutStore((s) => s.payment);
  const setPaymentMethodId = useCheckoutStore((s) => s.setPaymentMethodId);
  const setPaymentField = useCheckoutStore((s) => s.setPaymentField);
  const clearCart = useCartStore((s) => s.clearCart);

  const selectedAddress = useCheckoutStore(selectSelectedAddress);

  const progressState = useMemo(
    () => ({
      addresses,
      selectedAddressId,
      shippingMethodId,
      scheduledDeliveryDate,
    }),
    [addresses, selectedAddressId, shippingMethodId, scheduledDeliveryDate],
  );

  const returnUrl = useMemo(() => {
    const query = searchParams.toString();
    return query ? `/checkout?${query}` : '/checkout';
  }, [searchParams]);

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      router.replace(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
  }, [isReady, isAuthenticated, returnUrl, router]);

  useEffect(() => {
    hydrateDefaults(locale);
    syncSelectedAddress();
  }, [hydrateDefaults, locale, syncSelectedAddress]);

  useEffect(() => {
    syncSelectedAddress();
  }, [addresses, syncSelectedAddress]);

  useEffect(() => {
    if (!scheduledDeliveryDate?.includes('|')) return;
    const [dateId, slotId] = scheduledDeliveryDate.split('|');
    const dateValid = getScheduledDateOptions(locale).some(
      (d) => d.id === dateId,
    );
    const slotValid = getDeliveryTimeSlots(locale).some((s) => s.id === slotId);
    if (!dateValid || !slotValid) {
      setScheduledDeliveryDate(null);
    }
  }, [locale, scheduledDeliveryDate, setScheduledDeliveryDate]);

  useEffect(() => {
    if (step === 2 && shippingMethodId === 'scheduled') {
      setShippingMethodId('free', locale);
    }
  }, [step, shippingMethodId, locale, setShippingMethodId]);

  useEffect(() => {
    if (!isReady || !isAuthenticated) return;
    const requested = parseStep(searchParams.get('step'));
    const clamped = clampCheckoutStep(requested, progressState);
    setStep(clamped);
    if (parseStep(searchParams.get('step')) !== clamped) {
      router.replace(`/checkout?step=${stepToParam(clamped)}`, {
        scroll: false,
      });
    }
  }, [isReady, isAuthenticated, searchParams, progressState, router, setStep]);

  const goToStep = useCallback(
    (next: CheckoutStep) => {
      const clamped = clampCheckoutStep(next, progressState);
      setStep(clamped);
      router.replace(`/checkout?step=${stepToParam(clamped)}`, {
        scroll: false,
      });
    },
    [progressState, router, setStep],
  );

  const handleSelectShippingMethod = useCallback(
    (id: typeof shippingMethodId) => {
      setShippingMethodId(id, locale);
    },
    [locale, setShippingMethodId],
  );

  const shippingLabel = useMemo(() => {
    const methodLabel =
      shippingMethodId === 'express'
        ? labels.shippingExpress
        : labels.shippingFree;
    if (!scheduledDeliveryDate?.includes('|')) return methodLabel;
    const [dateId, slotId] = scheduledDeliveryDate.split('|');
    const dateLabel = dateId
      ? getScheduledDateLabel(locale, dateId)
      : undefined;
    const slotLabel = getDeliveryTimeSlots(locale).find(
      (s) => s.id === slotId,
    )?.label;
    return [methodLabel, dateLabel, slotLabel].filter(Boolean).join(' · ');
  }, [shippingMethodId, scheduledDeliveryDate, labels, locale]);

  const canCompleteCheckout = isCheckoutComplete(progressState);

  const handlePay = () => {
    if (!canCompleteCheckout || !selectedAddress) return;
    clearCart();
    router.push('/products');
  };

  const stepperSteps = [
    {
      id: 1 as CheckoutStep,
      label: labels.stepAddress,
      icon: 'lucide:map-pin',
    },
    { id: 2 as CheckoutStep, label: labels.stepShipping, icon: 'lucide:truck' },
    {
      id: 3 as CheckoutStep,
      label: labels.stepPayment,
      icon: 'lucide:credit-card',
    },
  ];

  if (!isReady || !isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <MarketingHeader />
        <CategoryNavBar />
        <SiteShell className="!pt-8">
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
          </div>
        </SiteShell>
        <SiteFooter />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <MarketingHeader />
        <CategoryNavBar />
        <SiteShell className="!pt-8">
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-lg font-semibold text-foreground">
              {labels.emptyCartTitle}
            </p>
            <p className="max-w-md text-sm text-muted">
              {labels.emptyCartDescription}
            </p>
            <Link
              href="/products"
              prefetch={false}
              className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {labels.continueShopping}
            </Link>
          </div>
        </SiteShell>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <CategoryNavBar />

      <SiteShell className="!pt-8 sm:!pt-10 lg:!pt-12">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 sm:gap-10 lg:max-w-5xl">
          <CheckoutStepper currentStep={step} steps={stepperSteps} />

          {step === 1 ? (
            <AddressStep
              locale={locale}
              labels={labels}
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelect={setSelectedAddressId}
              onAdd={addAddress}
              onUpdate={updateAddress}
              onRemove={removeAddress}
              scheduledDeliveryDate={scheduledDeliveryDate}
              onSelectDate={setScheduledDeliveryDate}
              onNext={() => goToStep(2)}
            />
          ) : null}

          {step === 2 ? (
            <ShippingStep
              locale={locale}
              labels={labels}
              shippingMethodId={shippingMethodId}
              onSelectMethod={handleSelectShippingMethod}
              onBack={() => {
                setShippingMethodId('scheduled', locale);
                goToStep(1);
              }}
              onNext={() => goToStep(3)}
            />
          ) : null}

          {step === 3 ? (
            <PaymentStep
              locale={locale}
              labels={labels}
              items={cartItems}
              address={selectedAddress}
              shippingMethodId={shippingMethodId}
              shippingLabel={shippingLabel}
              paymentMethodId={paymentMethodId}
              payment={payment}
              onPaymentMethodChange={setPaymentMethodId}
              onPaymentFieldChange={setPaymentField}
              onBack={() => goToStep(2)}
              onPay={handlePay}
              payDisabled={!canCompleteCheckout}
            />
          ) : null}
        </div>
      </SiteShell>

      <SiteFooter />
    </div>
  );
}
