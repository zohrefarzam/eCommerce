'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { ProductCard } from '@/components/ui/product-card';
import { addShowcaseProductToCart } from '@/lib/cart-store';
import { productDetailHref } from '@/lib/product-detail';
import type { ShowcaseProduct } from '@/landing/_content/types';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useLocale } from '@/i18n';
import { SectionHeader } from '@/landing/_components/ui/section-header';

export type ProductShowcaseProps = {
  eyebrow?: string;
  title: string;
  products: ShowcaseProduct[];
  viewAllHref?: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
};

export function ProductShowcase({
  eyebrow,
  title,
  products,
  viewAllHref,
  viewAllLabel = 'View all',
  onViewAll,
}: ProductShowcaseProps) {
  const router = useRouter();
  const { config } = useLocale();
  const viewAllIcon =
    config.dir === 'rtl' ? 'lucide:arrow-left' : 'lucide:arrow-right';

  const viewAllButton = (
    <Button
      size="sm"
      onPress={onViewAll}
      variant="outline"
      className="h-8 min-h-8 gap-1 rounded-md px-2.5 text-[11px] font-medium sm:h-10 sm:min-h-10 sm:gap-1.5 sm:px-6 sm:text-sm"
    >
      {viewAllLabel}
      <Icon
        icon={viewAllIcon}
        width={14}
        height={14}
        className="sm:h-4 sm:w-4"
      />
    </Button>
  );

  return (
    <section className="flex flex-col gap-5 sm:gap-8" aria-label={title}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        actions={
          viewAllHref ? (
            <Link href={viewAllHref} prefetch={false}>
              {viewAllButton}
            </Link>
          ) : (
            viewAllButton
          )
        }
      />

      <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={p.price}
            compareAtPrice={p.compareAtPrice}
            discountPercent={p.discountPercent}
            image={p.image}
            imageAlt={p.imageAlt}
            defaultFavorite={p.defaultFavorite}
            onView={() => router.push(productDetailHref(p.id))}
            onBuy={() => addShowcaseProductToCart(p)}
          />
        ))}
      </div>
    </section>
  );
}
