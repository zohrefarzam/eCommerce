import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getLandingContent } from '@/landing/_content';
import {
  buildProductsHref,
  getProductTabLabel,
  isValidCategorySlug,
  isValidProductTab,
  parseProductsSearchParams,
} from '@/app/products/_lib/product-catalog';
import type { ProductTabId } from '@/landing/_content/types';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { Suspense } from 'react';
import { ProductsListingFromSearchParams } from './products-listing';

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    tab?: string | string[];
    page?: string | string[];
    sort?: string | string[];
    priceMin?: string | string[];
    priceMax?: string | string[];
    brand?: string | string[];
    storage?: string | string[];
    q?: string | string[];
  }>;
};

function resolveSearchParam(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  const { productsListing } = messages;
  const params = await searchParams;
  const categorySlug = resolveSearchParam(params.category);
  const tabParam = resolveSearchParam(params.tab);
  const landing = getLandingContent(locale);

  const categoryLabel =
    isValidCategorySlug(landing, categorySlug) &&
    landing.categoryBarItems.find((c) => c.slug === categorySlug)?.label;

  const tabLabel =
    isValidProductTab(landing, tabParam) &&
    getProductTabLabel(landing, tabParam as ProductTabId);

  if (tabLabel && categoryLabel) {
    return {
      title: productsListing.metaFilteredTitle(tabLabel, categoryLabel),
    };
  }
  if (tabLabel) {
    return { title: productsListing.metaTabTitle(tabLabel) };
  }
  if (categoryLabel) {
    return { title: productsListing.metaCategoryTitle(categoryLabel) };
  }

  return { title: productsListing.metaProductsTitle };
}

function ProductsListingFallback() {
  return (
    <div className="flex min-h-[40vh] flex-1 items-center justify-center bg-background">
      <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const landing = getLandingContent(locale);
  const parsed = parseProductsSearchParams({
    category: resolveSearchParam(params.category),
    tab: resolveSearchParam(params.tab),
    page: resolveSearchParam(params.page),
    sort: resolveSearchParam(params.sort),
    priceMin: resolveSearchParam(params.priceMin),
    priceMax: resolveSearchParam(params.priceMax),
    brand: resolveSearchParam(params.brand),
    storage: resolveSearchParam(params.storage),
    q: resolveSearchParam(params.q),
  });

  if (parsed.category && isValidCategorySlug(landing, parsed.category)) {
    redirect(buildProductsHref(parsed));
  }

  return (
    <Suspense fallback={<ProductsListingFallback />}>
      <ProductsListingFromSearchParams />
    </Suspense>
  );
}
