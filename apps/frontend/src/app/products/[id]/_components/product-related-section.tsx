'use client';

import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/ui/product-card';
import { addShowcaseProductToCart } from '@/app/cart/_lib/cart-store';
import { productDetailHref } from '@/app/products/_lib/product-detail';
import type { ShowcaseProduct } from '@/landing/_content/types';

type ProductRelatedSectionProps = {
  title: string;
  products: readonly ShowcaseProduct[];
};

export function ProductRelatedSection({
  title,
  products,
}: ProductRelatedSectionProps) {
  const router = useRouter();

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="product-related-heading">
      <h2
        id="product-related-heading"
        className="text-lg font-bold text-foreground sm:text-xl"
      >
        {title}
      </h2>

      <div className="mt-5 grid grid-cols-2 items-stretch gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            name={product.name}
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            discountPercent={product.discountPercent}
            image={product.image}
            imageAlt={product.imageAlt}
            onView={() => router.push(productDetailHref(product.id))}
            onBuy={() => addShowcaseProductToCart(product)}
          />
        ))}
      </div>
    </section>
  );
}
