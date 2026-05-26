'use client';

import { useLocale } from '@/i18n';
import { getProductDetail } from '@/lib/product-detail';
import { ProductDetailContent } from './_components/product-detail-content';

type ProductDetailViewProps = {
  productId: string;
};

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const { landing, locale } = useLocale();
  const detail = getProductDetail(landing, locale, productId);

  if (!detail) return null;

  return <ProductDetailContent detail={detail} />;
}
