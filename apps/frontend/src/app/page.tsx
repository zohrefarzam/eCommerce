import { SiteShell } from "@/components/layout/site-shell";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { CategoryNavBar } from "@/components/layout/category-nav-bar";
import { HeroIphone } from "@/components/sections/hero-iphone";
import { PromoBannerGrid } from "@/components/sections/promo-banner-grid";
import { CategoryBrowse } from "@/components/sections/category-browse";
import { ProductShowcase } from "@/components/sections/product-showcase";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <div className="flex w-full flex-col">
        <MarketingHeader />
        <CategoryNavBar />
        <HeroIphone />
      </div>
      <SiteShell>
        <PromoBannerGrid />
        <CategoryBrowse />
        <ProductShowcase />
      </SiteShell>
    </div>
  );
}
