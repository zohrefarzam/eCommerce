import cameraImage from '@/assets/images/products/camera.png';
import headphoneImage from '@/assets/images/products/headphone.png';
import iphoneImage from '@/assets/images/products/Iphone14.png';
import smartwatchImage from '@/assets/images/products/smartwatch.png';
import type { Locale } from '@/i18n/config';
import type { ImageSource } from '@/lib/image-source';

export type OrderStatus = 'current' | 'delivered' | 'returned' | 'cancelled';

export type ProfileOrderItem = {
  image: ImageSource;
  alt: string;
};

export type ProfileOrder = {
  id: string;
  status: OrderStatus;
  dateLabel: string;
  total: number;
  clubPoints?: number;
  items: ProfileOrderItem[];
};

const ordersFa: ProfileOrder[] = [
  {
    id: '330121548',
    status: 'delivered',
    dateLabel: '۱۴۰۴/۰۲/۱۸',
    total: 42_850_000,
    clubPoints: 428,
    items: [
      { image: iphoneImage, alt: 'گوشی هوشمند' },
      { image: smartwatchImage, alt: 'ساعت هوشمند' },
      { image: headphoneImage, alt: 'هدفون' },
    ],
  },
  {
    id: '329884102',
    status: 'delivered',
    dateLabel: '۱۴۰۴/۰۲/۰۵',
    total: 18_200_000,
    clubPoints: 182,
    items: [
      { image: cameraImage, alt: 'دوربین' },
      { image: iphoneImage, alt: 'گوشی هوشمند' },
    ],
  },
  {
    id: '331002441',
    status: 'current',
    dateLabel: '۱۴۰۴/۰۲/۲۸',
    total: 9_450_000,
    items: [{ image: headphoneImage, alt: 'هدفون' }],
  },
  {
    id: '328771009',
    status: 'returned',
    dateLabel: '۱۴۰۴/۰۱/۲۲',
    total: 6_300_000,
    items: [{ image: smartwatchImage, alt: 'ساعت هوشمند' }],
  },
  {
    id: '327550812',
    status: 'cancelled',
    dateLabel: '۱۴۰۴/۰۱/۱۰',
    total: 24_100_000,
    items: [
      { image: iphoneImage, alt: 'گوشی هوشمند' },
      { image: cameraImage, alt: 'دوربین' },
    ],
  },
];

const ordersEn: ProfileOrder[] = [
  {
    id: '330121548',
    status: 'delivered',
    dateLabel: 'May 8, 2025',
    total: 428,
    clubPoints: 42,
    items: [
      { image: iphoneImage, alt: 'Smartphone' },
      { image: smartwatchImage, alt: 'Smart watch' },
      { image: headphoneImage, alt: 'Headphones' },
    ],
  },
  {
    id: '329884102',
    status: 'delivered',
    dateLabel: 'Apr 25, 2025',
    total: 182,
    clubPoints: 18,
    items: [
      { image: cameraImage, alt: 'Camera' },
      { image: iphoneImage, alt: 'Smartphone' },
    ],
  },
  {
    id: '331002441',
    status: 'current',
    dateLabel: 'May 18, 2025',
    total: 94,
    items: [{ image: headphoneImage, alt: 'Headphones' }],
  },
  {
    id: '328771009',
    status: 'returned',
    dateLabel: 'Apr 12, 2025',
    total: 63,
    items: [{ image: smartwatchImage, alt: 'Smart watch' }],
  },
  {
    id: '327550812',
    status: 'cancelled',
    dateLabel: 'Mar 31, 2025',
    total: 241,
    items: [
      { image: iphoneImage, alt: 'Smartphone' },
      { image: cameraImage, alt: 'Camera' },
    ],
  },
];

const ordersByLocale: Record<Locale, ProfileOrder[]> = {
  fa: ordersFa,
  en: ordersEn,
};

export function getProfileOrders(
  locale: Locale,
  placedOrders: ProfileOrder[] = [],
): ProfileOrder[] {
  return [...placedOrders, ...ordersByLocale[locale]];
}

export function getOrdersByStatus(
  locale: Locale,
  status: OrderStatus,
  placedOrders: ProfileOrder[] = [],
): ProfileOrder[] {
  return getProfileOrders(locale, placedOrders).filter(
    (order) => order.status === status,
  );
}

export function countOrdersByStatus(
  locale: Locale,
  status: OrderStatus,
  placedOrders: ProfileOrder[] = [],
): number {
  return getOrdersByStatus(locale, status, placedOrders).length;
}

function normalizeOrderSearchText(value: string): string {
  return value.trim().toLowerCase();
}

export function orderMatchesSearchQuery(
  order: ProfileOrder,
  query: string | undefined,
): boolean {
  const q = normalizeOrderSearchText(query ?? '');
  if (!q) return true;

  if (order.id.toLowerCase().includes(q)) return true;
  if (order.dateLabel.toLowerCase().includes(q)) return true;
  if (String(order.total).includes(q)) return true;

  return order.items.some((item) =>
    normalizeOrderSearchText(item.alt).includes(q),
  );
}
