import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getLandingContent } from '@/landing/_content';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { getProductDetail } from '@/lib/product-detail';
import { ProductDetailView } from './product-detail-view';

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  const landing = getLandingContent(locale);
  const detail = getProductDetail(landing, locale, id);

  if (!detail) {
    return { title: messages.productsListing.metaProductsTitle };
  }

  return { title: messages.productDetail.metaTitle(detail.displayName) };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const landing = getLandingContent(locale);
  const detail = getProductDetail(landing, locale, id);

  if (!detail) {
    notFound();
  }

  return <ProductDetailView productId={id} />;
}
