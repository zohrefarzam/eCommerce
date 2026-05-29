'use client';

import authIllustration from '@/assets/images/auth/auth.png';
import { Image } from '@/components/base/image';
import { MarketingHeader } from '@/components/ui/marketing-header';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { SiteShell } from '@/landing/_components/layout/site-shell';
import { STOREFRONT_CONTENT_FRAME } from '@/lib/storefront-layout';

type AuthPageLayoutProps = {
  children: React.ReactNode;
};

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <CategoryNavBar />
      <SiteShell className="!pt-8 sm:!pt-10 lg:!pt-12">
        <div
          className={`${STOREFRONT_CONTENT_FRAME} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}
        >
          <div className="relative mx-auto aspect-[805/781] w-full max-w-md overflow-hidden rounded-2xl bg-surface-secondary lg:max-w-none">
            <Image
              src={authIllustration}
              alt=""
              sizes="(max-width: 1024px) 100vw, 50vw"
              fit="cover"
              priority
            />
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-lg">{children}</div>
        </div>
      </SiteShell>
      <SiteFooter />
    </div>
  );
}
