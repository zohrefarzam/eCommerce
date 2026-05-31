import type { Locale } from '@/i18n/config';

export const addressesQueryKeys = {
  all: ['addresses'] as const,
  list: (locale: Locale) =>
    [...addressesQueryKeys.all, 'list', locale] as const,
};
