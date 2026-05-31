import { apiFetch } from '@/lib/api/client';
import type { CartResponse } from '@/app/cart/_lib/api/types';

export function fetchCart() {
  return apiFetch<CartResponse>('/cart/api');
}
