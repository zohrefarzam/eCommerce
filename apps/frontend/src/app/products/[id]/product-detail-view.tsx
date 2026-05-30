'use client';

import { useEffect, useMemo, useState } from 'react';
import { notFound } from 'next/navigation';
import { useLocale } from '@/i18n';
import { resolveStorefrontProductDetail } from '@/lib/admin-catalog-bridge';
import { useAdminProductsStore } from '@/lib/admin-products-store';
import { getProductDetail } from '@/lib/product-detail';
import { ProductDetailContent } from './_components/product-detail-content';

type ProductDetailViewProps = {
  productId: string;
};

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const { landing, locale } = useLocale();
  const adminProducts = useAdminProductsStore((s) => s.products);
  const [catalogReady, setCatalogReady] = useState(false);

  useEffect(() => {
    const unsub = useAdminProductsStore.persist.onFinishHydration(() => {
      setCatalogReady(true);
    });
    if (useAdminProductsStore.persist.hasHydrated()) {
      setCatalogReady(true);
    }
    return unsub;
  }, []);

  const landingDetail = useMemo(
    () => getProductDetail(landing, locale, productId),
    [landing, locale, productId],
  );

  const detail = useMemo(() => {
    if (!catalogReady) return landingDetail;

    return resolveStorefrontProductDetail(
      landing,
      locale,
      productId,
      adminProducts,
      landingDetail,
    );
  }, [catalogReady, landing, locale, productId, adminProducts, landingDetail]);

  if (!catalogReady) {
    if (landingDetail) {
      return <ProductDetailContent detail={landingDetail} />;
    }
    return (
      <div className="flex justify-center py-24">
        <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
      </div>
    );
  }

  if (!detail) {
    notFound();
  }

  return <ProductDetailContent detail={detail} />;
}
