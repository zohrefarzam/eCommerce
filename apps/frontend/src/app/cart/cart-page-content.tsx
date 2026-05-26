'use client';

import Link from 'next/link';
import { MarketingHeader } from '@/components/ui/marketing-header';
import { CartLineItemRow } from '@/components/ui/cart-line-item';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { SiteShell } from '@/landing/_components/layout/site-shell';
import { useLocale } from '@/i18n';
import { useCartStore } from '@/lib/cart-store';
import { CartOrderSummaryCard } from './_components/cart-order-summary';

export function CartPageContent() {
  const { messages, locale } = useLocale();
  const { cart: cartMessages } = messages;
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const lineLabels = {
    removeItem: cartMessages.removeItem,
    decreaseQuantity: cartMessages.decreaseQuantity,
    increaseQuantity: cartMessages.increaseQuantity,
    quantityLabel: cartMessages.quantityLabel,
  };

  const summaryLabels = {
    title: cartMessages.orderSummaryTitle,
    discountCodeLabel: cartMessages.discountCodeLabel,
    bonusCardLabel: cartMessages.bonusCardLabel,
    bonusCardApply: cartMessages.bonusCardApply,
    subtotalLabel: cartMessages.subtotalLabel,
    taxLabel: cartMessages.taxLabel,
    shippingLabel: cartMessages.shippingLabel,
    totalLabel: cartMessages.totalLabel,
    checkout: cartMessages.checkout,
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <CategoryNavBar />

      <SiteShell className="!pt-8 sm:!pt-10 lg:!pt-12">
        <div className="flex flex-col gap-8 lg:gap-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {cartMessages.title}
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-muted/30 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-foreground">
                {cartMessages.emptyTitle}
              </p>
              <p className="max-w-md text-sm text-muted">
                {cartMessages.emptyDescription}
              </p>
              <Link
                href="/products"
                prefetch={false}
                className="mt-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {cartMessages.browseProducts}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-10 xl:gap-14">
              <section aria-label={cartMessages.title}>
                {items.map((item) => (
                  <CartLineItemRow
                    key={item.lineId}
                    item={item}
                    locale={locale}
                    labels={lineLabels}
                    variant="page"
                    onRemove={removeItem}
                    onQuantityChange={setQuantity}
                  />
                ))}
              </section>

              <CartOrderSummaryCard
                items={items}
                locale={locale}
                labels={summaryLabels}
              />
            </div>
          )}
        </div>
      </SiteShell>

      <SiteFooter />
    </div>
  );
}
