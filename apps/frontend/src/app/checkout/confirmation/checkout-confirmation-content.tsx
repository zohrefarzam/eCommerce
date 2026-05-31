'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/base/button';
import { MarketingHeader } from '@/components/ui/marketing-header';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { SiteShell } from '@/landing/_components/layout/site-shell';
import { useLocale } from '@/i18n';
import { useCheckoutOrdersStore } from '@/app/checkout/_lib/checkout-orders-store';

export function CheckoutConfirmationContent() {
  const searchParams = useSearchParams();
  const { messages } = useLocale();
  const labels = messages.checkout;
  const getOrderById = useCheckoutOrdersStore((s) => s.getOrderById);
  const [mounted, setMounted] = useState(false);

  const orderId = searchParams.get('orderId') ?? '';
  const order = mounted && orderId ? getOrderById(orderId) : undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <CategoryNavBar />

      <SiteShell className="!pt-8 sm:!pt-10 lg:!pt-12">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 py-12 text-center sm:py-16">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <Icon
              icon="lucide:circle-check"
              width={36}
              height={36}
              aria-hidden
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">
              {labels.confirmationTitle}
            </h1>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {labels.confirmationDescription}
            </p>
          </div>

          {order ? (
            <p className="rounded-xl border border-muted/20 bg-surface px-4 py-3 text-sm text-foreground">
              <span className="font-semibold">
                {labels.confirmationOrderId}:
              </span>{' '}
              <span className="tabular-nums">{order.id}</span>
            </p>
          ) : null}

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              href="/profile/orders"
              variant="primary"
              className="h-11 rounded-xl !bg-foreground !text-background font-semibold hover:!bg-foreground/90"
            >
              {labels.viewOrders}
            </Button>
            <Button
              href="/products"
              variant="outline"
              className="h-11 rounded-xl font-semibold"
            >
              {labels.confirmationContinueShopping}
            </Button>
          </div>

          {!order && mounted && orderId ? (
            <p className="text-sm text-muted">
              <Link
                href="/products"
                prefetch={false}
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {labels.continueShopping}
              </Link>
            </p>
          ) : null}
        </div>
      </SiteShell>

      <SiteFooter />
    </div>
  );
}
