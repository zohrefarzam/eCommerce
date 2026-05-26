'use client';

import { useCallback, useMemo, useState } from 'react';
import { MarketingHeader } from '@/components/ui/marketing-header';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { SiteShell } from '@/landing/_components/layout/site-shell';
import { useLocale } from '@/i18n';
import { getProductReviews } from '@/lib/product-reviews';
import {
  getRelatedProducts,
  productsCategoryHref,
  slugifyBrand,
} from '@/lib/product-catalog';
import type { ProductDetail } from '@/lib/product-detail';
import {
  ProductsBreadcrumb,
  type BreadcrumbItem,
} from '../../_components/products-breadcrumb';
import { ProductDetailsSection } from './product-details-section';
import { ProductRelatedSection } from './product-related-section';
import { ProductReviewsSection } from './product-reviews-section';
import { ProductGallery } from './product-gallery';
import { ProductPurchasePanel } from './product-purchase-panel';

type ProductDetailContentProps = {
  detail: ProductDetail;
};

export function ProductDetailContent({ detail }: ProductDetailContentProps) {
  const { messages, landing, locale } = useLocale();
  const { productDetail, productsListing } = messages;
  const reviews = useMemo(() => getProductReviews(locale), [locale]);
  const relatedProducts = useMemo(
    () => getRelatedProducts(landing, detail.product.id),
    [landing, detail.product.id],
  );
  const defaultColorId = detail.defaultColorId || detail.colors[0]?.id || '';
  const defaultGalleryIndex = Math.max(
    0,
    detail.colors.findIndex((c) => c.id === defaultColorId),
  );
  const [galleryIndex, setGalleryIndex] = useState(defaultGalleryIndex);
  const [colorId, setColorId] = useState(defaultColorId);

  const handleGalleryIndexChange = useCallback(
    (index: number) => {
      setGalleryIndex(index);
      const color = detail.colors[index];
      if (color) setColorId(color.id);
    },
    [detail.colors],
  );

  const handleColorSelect = useCallback(
    (id: string) => {
      setColorId(id);
      const colorIndex = detail.colors.findIndex((c) => c.id === id);
      if (colorIndex >= 0 && detail.gallery.length > 0) {
        setGalleryIndex(colorIndex % detail.gallery.length);
      }
    },
    [detail.colors, detail.gallery.length],
  );

  const categoryLabel = detail.categorySlug
    ? landing.categoryBarItems.find((c) => c.slug === detail.categorySlug)
        ?.label
    : undefined;

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: productsListing.breadcrumbHome, href: '/' },
      { label: productsListing.breadcrumbCatalog, href: '/products' },
    ];

    if (categoryLabel && detail.categorySlug) {
      items.push({
        label: categoryLabel,
        href: productsCategoryHref(detail.categorySlug),
      });
    }

    if (detail.brandLabel && detail.categorySlug === 'phones') {
      items.push({
        label: detail.brandLabel,
        href: `/products?category=${detail.categorySlug}&brand=${slugifyBrand(detail.brandLabel)}`,
      });
    } else if (detail.categorySlug === 'phones') {
      items.push({ label: productDetail.breadcrumbSmartphones });
    }

    items.push({ label: detail.displayName });
    return items;
  }, [
    categoryLabel,
    detail.brandLabel,
    detail.categorySlug,
    detail.displayName,
    productDetail.breadcrumbSmartphones,
    productsListing.breadcrumbCatalog,
    productsListing.breadcrumbHome,
  ]);

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background">
      <div className="flex w-full min-w-0 flex-col overflow-x-hidden">
        <MarketingHeader />
        <CategoryNavBar />
      </div>

      <SiteShell className="!py-6 sm:!py-8">
        <article className="flex flex-col gap-6 sm:gap-8">
          <ProductsBreadcrumb
            items={breadcrumbItems}
            ariaLabel={productsListing.breadcrumbAriaLabel}
          />

          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14">
            <div className="min-w-0">
              <ProductGallery
                images={detail.gallery}
                activeIndex={galleryIndex}
                onActiveIndexChange={handleGalleryIndexChange}
              />
            </div>
            <div className="min-w-0">
              <ProductPurchasePanel
                detail={detail}
                colorId={colorId}
                onColorSelect={handleColorSelect}
                labels={{
                  selectColor: productDetail.selectColor,
                  addToWishlist: productDetail.addToWishlist,
                  addToCart: productDetail.addToCart,
                  readMore: productDetail.readMore,
                  readLess: productDetail.readLess,
                }}
              />
            </div>
          </div>

          <ProductDetailsSection
            title={productDetail.detailsTitle}
            intro={detail.detailsIntro}
            sections={detail.detailSections}
            moreSections={detail.moreDetailSections}
            viewMoreLabel={productDetail.viewMore}
            viewLessLabel={productDetail.viewLess}
          />

          <ProductReviewsSection
            data={reviews}
            labels={{
              title: productDetail.reviewsTitle,
              ofReviews: productDetail.reviewsOfCount,
              leaveComment: productDetail.leaveCommentPlaceholder,
              submitReview: productDetail.submitReview,
              yourRatingLabel: productDetail.yourRatingLabel,
              reviewSubmitted: productDetail.reviewSubmitted,
              viewMore: productDetail.reviewsViewMore,
            }}
          />

          <ProductRelatedSection
            title={productDetail.relatedProductsTitle}
            products={relatedProducts}
          />
        </article>
      </SiteShell>

      <SiteFooter />
    </div>
  );
}
