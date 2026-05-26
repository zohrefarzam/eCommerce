import type { Locale } from '@/i18n/config';

export type AddressTag = 'home' | 'office' | 'other';

export type CheckoutAddress = {
  id: string;
  label: string;
  tag: AddressTag;
  recipientName: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
  phone: string;
};

export type CheckoutAddressInput = Omit<CheckoutAddress, 'id'>;

export type ShippingMethodId = 'free' | 'express' | 'scheduled';

export type ShippingMethod = {
  id: ShippingMethodId;
  priceAmount: number;
  isFree: boolean;
};

export type PaymentMethodId = 'online' | 'card' | 'paypal' | 'paypal-credit';

const addressesEn: CheckoutAddress[] = [
  {
    id: 'addr-home-en',
    label: '2118 Thornridge',
    tag: 'home',
    recipientName: 'Customer',
    province: 'Connecticut',
    city: 'Syracuse',
    street: '2118 Thornridge Cir.',
    postalCode: '35624',
    phone: '(209) 555-0104',
  },
  {
    id: 'addr-office-en',
    label: 'Headoffice',
    tag: 'office',
    recipientName: 'Customer',
    province: 'South Dakota',
    city: 'San Jose',
    street: '2715 Ash Dr.',
    postalCode: '83475',
    phone: '(704) 555-0127',
  },
];

const addressesFa: CheckoutAddress[] = [
  {
    id: 'addr-home-fa',
    label: 'منزل — ونک',
    tag: 'home',
    recipientName: 'زهره محمدی',
    province: 'تهران',
    city: 'تهران',
    street: 'خیابان ولیعصر، کوچه ۱۲، پلاک ۸',
    postalCode: '۱۹۹۱۸۳۴۵۶۷',
    phone: '۰۹۱۲۱۲۳۴۵۶۷',
  },
  {
    id: 'addr-office-fa',
    label: 'محل کار — سعادت‌آباد',
    tag: 'office',
    recipientName: 'زهره محمدی',
    province: 'تهران',
    city: 'تهران',
    street: 'سعادت‌آباد، میدان کاج، برج فناوری، طبقه ۵',
    postalCode: '۱۹۹۸۱۲۳۴۵۶',
    phone: '۰۲۱۸۸۷۷۶۶۵۵',
  },
];

export function createDefaultAddresses(locale: Locale): CheckoutAddress[] {
  return locale === 'fa' ? [...addressesFa] : [...addressesEn];
}

/** Shipping fee amounts — locale-specific display handled in UI. */
export function createDefaultShippingMethods(
  _locale: Locale,
): ShippingMethod[] {
  return [
    { id: 'free', priceAmount: 0, isFree: true },
    { id: 'express', priceAmount: 0, isFree: false },
    { id: 'scheduled', priceAmount: 0, isFree: true },
  ];
}

export function getShippingPrice(
  methodId: ShippingMethodId,
  locale: Locale,
): number {
  if (methodId === 'free' || methodId === 'scheduled') return 0;
  return locale === 'fa' ? 850_000 : 29;
}

export function formatAddressLine(address: CheckoutAddress): string {
  return `${address.street}، ${address.city}، ${address.province} ${address.postalCode}`;
}

export function formatAddressLineEn(address: CheckoutAddress): string {
  return `${address.street}, ${address.city}, ${address.province} ${address.postalCode}`;
}

export function formatAddressOneLine(
  address: CheckoutAddress,
  locale: Locale,
): string {
  return locale === 'fa'
    ? formatAddressLine(address)
    : formatAddressLineEn(address);
}

/** Digikala-style delivery windows for scheduled shipping. */
export function getDeliveryTimeSlots(
  locale: Locale,
): { id: string; label: string }[] {
  if (locale === 'fa') {
    return [
      { id: 'sat-am', label: 'شنبه ۹ تا ۱۳' },
      { id: 'sat-pm', label: 'شنبه ۱۶ تا ۲۰' },
      { id: 'sun-am', label: 'یکشنبه ۹ تا ۱۳' },
      { id: 'sun-pm', label: 'یکشنبه ۱۶ تا ۲۰' },
    ];
  }
  return [
    { id: 'mon-am', label: 'Mon 9 AM – 1 PM' },
    { id: 'mon-pm', label: 'Mon 4 PM – 8 PM' },
    { id: 'tue-am', label: 'Tue 9 AM – 1 PM' },
    { id: 'tue-pm', label: 'Tue 4 PM – 8 PM' },
  ];
}

export function getScheduledDateOptions(
  locale: Locale,
): { id: string; label: string }[] {
  if (locale === 'fa') {
    return [
      { id: '1404-08-05', label: '۵ آبان ۱۴۰۴' },
      { id: '1404-08-06', label: '۶ آبان ۱۴۰۴' },
      { id: '1404-08-07', label: '۷ آبان ۱۴۰۴' },
    ];
  }
  return [
    { id: '2026-05-28', label: '28 May 2026' },
    { id: '2026-05-29', label: '29 May 2026' },
    { id: '2026-05-30', label: '30 May 2026' },
  ];
}
