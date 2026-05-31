import type { Locale } from '@/i18n/config';

export const categoriesQueryKeys = {
  all: ['categories'] as const,
  list: (locale: Locale) =>
    [...categoriesQueryKeys.all, 'list', locale] as const,
};
