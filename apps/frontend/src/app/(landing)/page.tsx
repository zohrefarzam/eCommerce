import { SiteShell } from '@/landing/_components/layout/site-shell';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { MarketingHeader } from '@/landing/_components/layout/marketing-header';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { ProductCarouselSection } from '@/landing/_components/sections/product-carousel';
import { CardSwapShowcase } from '@/landing/_components/sections/card-swap-showcase';
import { CategoryBrowse } from '@/landing/_components/sections/category-browse';
import { NewArrival } from '@/landing/_components/sections/new-arrival';
import { ServiceHighlights } from '@/landing/_components/sections/service-highlights';
import { ProductShowcase } from '@/landing/_components/sections/product-showcase';
import { productsByTab } from '@/landing/_content/landing';
import iphoneBanner from '@/assets/images/banner/iphone-banner.png';
import summerBanner from '@/assets/images/banner/summer-banner.png';

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background relative">
      <div className="flex w-full flex-col">
        <MarketingHeader />
        <CategoryNavBar />
        <ProductCarouselSection
          images={[
            { src: iphoneBanner, alt: 'Featured product one' },
            { src: summerBanner, alt: 'Featured product two' },
          ]}
        />
      </div>
      <SiteShell>
        <ProductShowcase
          eyebrow="این ماه"
          title="جدیدترین محصولات"
          products={productsByTab.new.slice(0, 4)}
          viewAllHref="/products"
        />
        <CardSwapShowcase />
        <CategoryBrowse />
        <ProductShowcase
          eyebrow="این ماه"
          title="پرفروش‌ترین محصولات"
          products={productsByTab.bestseller.slice(0, 4)}
          viewAllHref="/products"
        />
        <NewArrival />
        <ServiceHighlights />
      </SiteShell>
      <SiteFooter />
    </div>
  );
}
