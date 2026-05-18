'use client';

import { Button } from '@heroui/react';
import { ProductCard } from '@/components/baseComponents/ui/product-card';
import type { ShowcaseProduct } from '@/landing/_content/landing';
import { Icon } from '@iconify/react';
import Link from 'next/link';
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
  viewAllLabel = 'مشاهده همه',
  onViewAll,
}: ProductShowcaseProps) {
  const viewAllButton = (
    <Button
      onPress={onViewAll}
      className="rounded-md px-8 py-3 font-medium"
      variant="outline"
    >
      {viewAllLabel}
      <Icon icon="lucide:arrow-left" width={18} height={18} />
    </Button>
  );

  return (
    <section className="flex flex-col gap-8" aria-label={title}>
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

      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          />
        ))}
      </div>
    </section>
  );
}
