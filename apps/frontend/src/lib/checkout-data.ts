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
  latitude?: number;
  longitude?: number;
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

export type ScheduledDateOption = {
  id: string;
  dayLabel: string;
  dateLabel: string;
  feeLabel: string;
};

export type DeliveryTimeSlot = {
  id: string;
  label: string;
};

/** Digikala-style delivery windows for scheduled shipping. */
export function getDeliveryTimeSlots(locale: Locale): DeliveryTimeSlot[] {
  if (locale === 'fa') {
    return [{ id: '9-21', label: 'ساعت ۹ تا ۲۱' }];
  }
  return [
    { id: '9-21', label: '9 AM – 9 PM' },
    { id: '9-13', label: '9 AM – 1 PM' },
    { id: '16-20', label: '4 PM – 8 PM' },
  ];
}

export function getScheduledDateOptions(locale: Locale): ScheduledDateOption[] {
  if (locale === 'fa') {
    return [
      {
        id: '1404-03-09',
        dayLabel: 'شنبه',
        dateLabel: '۹ خرداد',
        feeLabel: '۲۰۰,۰۰۰ تومان',
      },
      {
        id: '1404-03-10',
        dayLabel: 'یکشنبه',
        dateLabel: '۱۰ خرداد',
        feeLabel: '۲۰۰,۰۰۰ تومان',
      },
      {
        id: '1404-03-11',
        dayLabel: 'دوشنبه',
        dateLabel: '۱۱ خرداد',
        feeLabel: 'رایگان',
      },
      {
        id: '1404-03-12',
        dayLabel: 'سه‌شنبه',
        dateLabel: '۱۲ خرداد',
        feeLabel: 'رایگان',
      },
      {
        id: '1404-03-13',
        dayLabel: 'چهارشنبه',
        dateLabel: '۱۳ خرداد',
        feeLabel: '۲۰۰,۰۰۰ تومان',
      },
      {
        id: '1404-03-14',
        dayLabel: 'پنج‌شنبه',
        dateLabel: '۱۴ خرداد',
        feeLabel: '۲۰۰,۰۰۰ تومان',
      },
      {
        id: '1404-03-15',
        dayLabel: 'جمعه',
        dateLabel: '۱۵ خرداد',
        feeLabel: '۲۰۰,۰۰۰ تومان',
      },
    ];
  }
  return [
    {
      id: '2026-05-28',
      dayLabel: 'Wed',
      dateLabel: '28 May',
      feeLabel: 'Free',
    },
    {
      id: '2026-05-29',
      dayLabel: 'Thu',
      dateLabel: '29 May',
      feeLabel: '$5',
    },
    {
      id: '2026-05-30',
      dayLabel: 'Fri',
      dateLabel: '30 May',
      feeLabel: '$5',
    },
  ];
}

/** Legacy single-line label for summaries and payment review. */
export function getScheduledDateLabel(
  locale: Locale,
  dateId: string,
): string | undefined {
  const option = getScheduledDateOptions(locale).find((d) => d.id === dateId);
  if (!option) return undefined;
  return `${option.dayLabel} ${option.dateLabel}`;
}
