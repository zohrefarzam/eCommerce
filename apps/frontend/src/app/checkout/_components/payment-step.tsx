'use client';

import { Checkbox } from '@/components/base/checkbox';
import { Input } from '@/components/base/input';
import type { Messages } from '@/i18n/messages';
import type { Locale } from '@/i18n/config';
import type { PaymentDetails } from '@/app/checkout/_lib/checkout-store';
import type { PaymentMethodId } from '@/app/checkout/_lib/checkout-data';
import { cn } from '@/components/base/_lib/utils';
import { CheckoutNavButtons } from './checkout-nav-buttons';
import { CheckoutOrderSummary } from './checkout-order-summary';
import type { CartLineItem } from '@/app/cart/_lib/cart-store';
import type { CheckoutAddress } from '@/app/checkout/_lib/checkout-data';
import type { ShippingMethodId } from '@/app/checkout/_lib/checkout-data';

type PaymentStepProps = {
  locale: Locale;
  labels: Messages['checkout'];
  items: readonly CartLineItem[];
  address: CheckoutAddress | null;
  shippingMethodId: ShippingMethodId;
  scheduledDeliveryDate?: string | null;
  shippingLabel: string;
  paymentMethodId: PaymentMethodId;
  payment: PaymentDetails;
  onPaymentMethodChange: (id: PaymentMethodId) => void;
  onPaymentFieldChange: <K extends keyof PaymentDetails>(
    key: K,
    value: PaymentDetails[K],
  ) => void;
  onBack: () => void;
  onPay: () => void;
  payDisabled?: boolean;
  paymentError?: string | null;
};

export function PaymentStep({
  locale,
  labels,
  items,
  address,
  shippingMethodId,
  scheduledDeliveryDate,
  shippingLabel,
  paymentMethodId,
  payment,
  onPaymentMethodChange,
  onPaymentFieldChange,
  onBack,
  onPay,
  payDisabled,
  paymentError,
}: PaymentStepProps) {
  const isIran = locale === 'fa';

  const iranMethods: { id: PaymentMethodId; label: string; desc?: string }[] = [
    {
      id: 'online',
      label: labels.paymentOnline,
      desc: labels.paymentOnlineDesc,
    },
    { id: 'card', label: labels.paymentCard },
  ];

  const enMethods: { id: PaymentMethodId; label: string }[] = [
    { id: 'card', label: labels.paymentCard },
    { id: 'paypal', label: labels.paymentPaypal },
    { id: 'paypal-credit', label: labels.paymentPaypalCredit },
  ];

  const methods = isIran ? iranMethods : enMethods;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-10 xl:gap-14">
      <section className="flex flex-col gap-6 sm:gap-8">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          {labels.paymentTitle}
        </h2>

        <div
          className="flex flex-wrap gap-2 border-b border-muted/15 pb-4"
          role="tablist"
          aria-label={labels.paymentTitle}
        >
          {methods.map((method) => (
            <button
              key={method.id}
              type="button"
              role="tab"
              aria-selected={paymentMethodId === method.id}
              onClick={() => onPaymentMethodChange(method.id)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-semibold transition',
                paymentMethodId === method.id
                  ? 'bg-foreground text-background'
                  : 'text-muted hover:bg-surface-secondary hover:text-foreground',
              )}
            >
              {method.label}
            </button>
          ))}
        </div>

        {isIran && paymentMethodId === 'online' ? (
          <div className="rounded-xl border border-muted/20 bg-surface-secondary px-4 py-5 text-sm leading-relaxed text-muted">
            <p>{labels.onlinePaymentNote}</p>
            <p className="mt-3 font-medium text-foreground">
              {labels.paymentSnapp} · درگاه شتاب · کارت‌های عضو شتاب
            </p>
          </div>
        ) : null}

        {paymentMethodId === 'card' ? (
          <CardPaymentForm
            labels={labels}
            payment={payment}
            onPaymentFieldChange={onPaymentFieldChange}
            maskedPreview={!isIran}
          />
        ) : null}

        {!isIran && paymentMethodId !== 'card' ? (
          <p className="text-sm text-muted">
            {paymentMethodId === 'paypal'
              ? 'You will be redirected to PayPal to complete payment.'
              : 'PayPal Credit checkout will open in a new step.'}
          </p>
        ) : null}

        <Checkbox
          isSelected={payment.billingSameAsShipping}
          onChange={(checked) =>
            onPaymentFieldChange('billingSameAsShipping', checked)
          }
        >
          {labels.billingSameAsShipping}
        </Checkbox>

        {paymentError ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {paymentError}
          </p>
        ) : null}

        <CheckoutNavButtons
          backLabel={labels.back}
          nextLabel={labels.pay}
          onBack={onBack}
          onNext={onPay}
          nextDisabled={payDisabled}
        />
      </section>

      <CheckoutOrderSummary
        items={items}
        locale={locale}
        labels={labels}
        shippingMethodId={shippingMethodId}
        scheduledDeliveryDate={scheduledDeliveryDate}
        address={address}
        shippingLabel={shippingLabel}
        showReview
      />
    </div>
  );
}

function CardPaymentForm({
  labels,
  payment,
  onPaymentFieldChange,
  maskedPreview,
}: {
  labels: Messages['checkout'];
  payment: PaymentDetails;
  onPaymentFieldChange: PaymentStepProps['onPaymentFieldChange'];
  maskedPreview: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      {maskedPreview ? (
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-8 text-background">
          <div className="mb-6 size-10 rounded-md bg-surface/20" aria-hidden />
          <p className="font-mono text-lg tracking-widest" dir="ltr">
            {payment.cardNumber || '4085 9536 8475 9530'}
          </p>
          <p className="mt-4 text-sm opacity-80">
            {payment.cardholderName || 'Cardholder Name'}
          </p>
        </div>
      ) : null}

      <Input
        value={payment.cardholderName}
        onChange={(e) => onPaymentFieldChange('cardholderName', e.target.value)}
        placeholder={labels.cardholderName}
        aria-label={labels.cardholderName}
      />
      <Input
        value={payment.cardNumber}
        onChange={(e) => onPaymentFieldChange('cardNumber', e.target.value)}
        placeholder={labels.cardNumber}
        aria-label={labels.cardNumber}
        dir="ltr"
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          value={payment.expiryDate}
          onChange={(e) => onPaymentFieldChange('expiryDate', e.target.value)}
          placeholder={labels.expiryDate}
          aria-label={labels.expiryDate}
          dir="ltr"
        />
        <Input
          value={payment.cvv}
          onChange={(e) => onPaymentFieldChange('cvv', e.target.value)}
          placeholder={labels.cvv}
          aria-label={labels.cvv}
          type="password"
          dir="ltr"
        />
      </div>
    </div>
  );
}
