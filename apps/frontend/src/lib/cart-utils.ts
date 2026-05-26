import type { Locale } from '@/i18n/config';
import type { CartLineItem } from '@/lib/cart-store';
import type { ShippingMethodId } from '@/lib/checkout-data';
import { getShippingPrice } from '@/lib/checkout-data';
import { parseProductPrice } from '@/lib/product-catalog';

export type CartOrderSummary = {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
};

const TAX_RATE = 0.021;

/** Matches checkout default shipping method (`free`). */
const DEFAULT_CART_SHIPPING_METHOD: ShippingMethodId = 'free';

export function cartLineTitle(item: CartLineItem): string {
  const parts = [item.name];
  if (item.storageLabel) parts.push(item.storageLabel);
  if (item.colorLabel) parts.push(item.colorLabel);
  return parts.join(' ');
}

export function cartLineSku(item: CartLineItem): string {
  const seed = `${item.productId}:${item.lineId}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return `#${String(hash).padStart(14, '0').slice(0, 14)}`;
}

export function cartLineUnitAmount(item: CartLineItem): number {
  return parseProductPrice(item.price);
}

export function cartLineTotalAmount(item: CartLineItem): number {
  return cartLineUnitAmount(item) * item.quantity;
}

export function getCartSubtotal(items: readonly CartLineItem[]): number {
  return items.reduce((sum, item) => sum + cartLineTotalAmount(item), 0);
}

export function getCartOrderSummary(
  items: readonly CartLineItem[],
  locale: Locale,
  options?: { shippingMethodId?: ShippingMethodId },
): CartOrderSummary {
  const subtotal = getCartSubtotal(items);
  const tax = Math.round(subtotal * TAX_RATE);
  const shippingMethodId =
    options?.shippingMethodId ?? DEFAULT_CART_SHIPPING_METHOD;
  const shipping = getShippingPrice(shippingMethodId, locale);
  return {
    subtotal,
    tax,
    shipping,
    total: subtotal + tax + shipping,
  };
}

export function formatCartMoney(amount: number, locale: Locale): string {
  if (locale === 'fa') {
    return `${amount.toLocaleString('fa-IR')} تومان`;
  }
  return `$${amount.toLocaleString('en-US')}`;
}
