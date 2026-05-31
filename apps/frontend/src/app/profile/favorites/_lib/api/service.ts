import { apiFetch } from '@/lib/api/client';
import type { FavoritesListResponse } from '@/app/profile/favorites/_lib/api/types';

export function fetchFavorites() {
  return apiFetch<FavoritesListResponse>('/profile/favorites/api');
}
