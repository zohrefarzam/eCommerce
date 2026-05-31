import { getLandingContent } from '@/landing/_content';
import type { CategoriesListResponse } from '@/app/(landing)/_lib/api/categories/types';
import type { Locale } from '@/i18n/config';

export function mockCategoriesList(locale: Locale): CategoriesListResponse {
  const landing = getLandingContent(locale);
  return {
    data: landing.browseCategories.map((category) => ({
      slug: category.slug,
      label: category.label,
      icon: category.icon,
    })),
  };
}
