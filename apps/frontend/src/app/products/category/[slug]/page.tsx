import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getLandingContent } from '@/landing/_content';
import { isValidCategorySlug } from '@/app/products/_lib/product-catalog';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { ProductsListingFromCategorySlug } from '../../products-listing';

type CategoryProductsPageProps = {
  params: Promise<{ slug: string }>;
};

function ProductsListingFallback() {
  return (
    <div className="flex min-h-[40vh] flex-1 items-center justify-center bg-background">
      <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
    </div>
  );
}

export async function generateMetadata({
  params,
}: CategoryProductsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  const { productsListing } = messages;
  const landing = getLandingContent(locale);

  const categoryLabel =
    isValidCategorySlug(landing, slug) &&
    landing.categoryBarItems.find((c) => c.slug === slug)?.label;

  if (categoryLabel) {
    return { title: productsListing.metaCategoryTitle(categoryLabel) };
  }

  return { title: productsListing.metaProductsTitle };
}

export default async function CategoryProductsPage({
  params,
}: CategoryProductsPageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const landing = getLandingContent(locale);

  if (!isValidCategorySlug(landing, slug)) {
    redirect('/products');
  }

  return (
    <Suspense fallback={<ProductsListingFallback />}>
      <ProductsListingFromCategorySlug categorySlug={slug} />
    </Suspense>
  );
}
