'use client';

import { SiteShell } from '@/landing/_components/layout/site-shell';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { MarketingHeader } from '@/components/ui/marketing-header';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { ProductCarouselSection } from '@/landing/_components/sections/product-carousel';
import { PromotionShowcase } from '@/landing/_components/sections/promotion-showcase';
import { CategoryBrowse } from '@/landing/_components/sections/category-browse';
import { NewArrival } from '@/landing/_components/sections/new-arrival';
import { ServiceHighlights } from '@/landing/_components/sections/service-highlights';
import { ProductShowcase } from '@/landing/_components/sections/product-showcase';
import { useLandingContent, useLocale } from '@/i18n';
import { getCarouselBanners } from '@/landing/_content/carousel-banners';

export function HomeContent() {
  const { locale } = useLocale();
  const landing = useLandingContent();
  const carouselBanners = getCarouselBanners(locale);

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background">
      <div className="flex w-full min-w-0 flex-col overflow-x-hidden">
        <MarketingHeader />
        <CategoryNavBar />
        <ProductCarouselSection
          key={locale}
          carouselKey={locale}
          images={carouselBanners}
        />
      </div>
      <SiteShell>
        <ProductShowcase
          eyebrow={landing.home.newProductsEyebrow}
          title={landing.home.newProductsTitle}
          products={landing.productsByTab.new.slice(0, 4)}
          viewAllHref="/products"
          viewAllLabel={landing.home.viewAll}
        />
        <PromotionShowcase />
        <CategoryBrowse />
        <ProductShowcase
          eyebrow={landing.home.bestsellersEyebrow}
          title={landing.home.bestsellersTitle}
          products={landing.productsByTab.bestseller.slice(0, 4)}
          viewAllHref="/products"
          viewAllLabel={landing.home.viewAll}
        />
        <NewArrival />
        <ServiceHighlights />
      </SiteShell>
      <SiteFooter />
    </div>
  );
}
