'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MarketingHeader } from '@/components/ui/marketing-header';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { SiteShell } from '@/landing/_components/layout/site-shell';
import { STOREFRONT_CONTENT_FRAME } from '@/app/(landing)/_lib/storefront-layout';
import { useAuth } from '@/providers/auth-provider';
import { AdminSidebar } from './admin-sidebar';

function AdminLoadingShell() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <CategoryNavBar />
      <SiteShell className="!pt-8">
        <div className="flex justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      </SiteShell>
      <SiteFooter />
    </div>
  );
}

type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      router.replace(`/auth/login?returnUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!isAdmin) {
      router.replace('/');
    }
  }, [isReady, isAuthenticated, isAdmin, pathname, router]);

  if (!isReady || !isAuthenticated || !isAdmin) {
    return <AdminLoadingShell />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <CategoryNavBar />
      <SiteShell className="!pt-6 sm:!pt-8 lg:!pt-10">
        <div
          className={`${STOREFRONT_CONTENT_FRAME} grid gap-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-start`}
        >
          <div className="hidden lg:block">
            <AdminSidebar />
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </SiteShell>
      <SiteFooter />
    </div>
  );
}

type AdminContentCardProps = {
  title: string;
  children: React.ReactNode;
  headerEnd?: React.ReactNode;
};

export function AdminContentCard({
  title,
  children,
  headerEnd,
}: AdminContentCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-muted/20 bg-surface">
      <div className="flex items-center justify-between gap-4 border-b border-muted/15 px-5 py-4 sm:px-6">
        <h1 className="text-lg font-bold text-foreground sm:text-xl">
          {title}
        </h1>
        {headerEnd}
      </div>
      <div className="px-5 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
