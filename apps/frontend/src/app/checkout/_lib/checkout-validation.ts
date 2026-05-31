import type { Locale } from '@/i18n/config';
import type { PaymentMethodId } from '@/app/checkout/_lib/checkout-data';
import type { PaymentDetails } from '@/app/checkout/_lib/checkout-store';

export type PaymentValidationError =
  | 'cardholderName'
  | 'cardNumber'
  | 'expiryDate'
  | 'cvv';

export function validatePaymentDetails(
  paymentMethodId: PaymentMethodId,
  payment: PaymentDetails,
  _locale: Locale,
): PaymentValidationError[] {
  if (paymentMethodId !== 'card') return [];

  const errors: PaymentValidationError[] = [];
  if (!payment.cardholderName.trim()) errors.push('cardholderName');
  if (payment.cardNumber.replace(/\s/g, '').length < 13)
    errors.push('cardNumber');
  if (payment.expiryDate.trim().length < 4) errors.push('expiryDate');
  if (payment.cvv.trim().length < 3) errors.push('cvv');
  return errors;
}

export function isPaymentStepComplete(
  paymentMethodId: PaymentMethodId,
  payment: PaymentDetails,
  locale: Locale,
): boolean {
  return validatePaymentDetails(paymentMethodId, payment, locale).length === 0;
}
