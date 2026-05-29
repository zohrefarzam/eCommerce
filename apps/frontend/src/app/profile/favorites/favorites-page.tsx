'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useLocale } from '@/i18n';
import { addShowcaseProductToCart } from '@/lib/cart-store';
import { useFavoritesStore } from '@/lib/favorites-store';
import { ProfileContentCard } from '../_components/profile-shell';
import { FavoriteProductRow } from './_components/favorite-product-row';

export function ProfileFavoritesPage() {
  const { messages } = useLocale();
  const labels = messages.account;
  const { productCard } = messages;
  const items = useFavoritesStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showEmpty = mounted && items.length === 0;
  const showList = mounted && items.length > 0;

  return (
    <ProfileContentCard title={labels.favoritesTitle}>
      {!mounted ? (
        <div className="flex justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      ) : null}

      {showEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-surface-secondary text-muted">
            <Icon icon="lucide:heart" width={40} height={40} aria-hidden />
          </div>
          <p className="mt-6 max-w-sm text-sm text-muted">
            {labels.favoritesEmpty}
          </p>
        </div>
      ) : null}

      {showList ? (
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.productId}>
              <FavoriteProductRow
                item={item}
                productCardLabels={productCard}
                onAddToCart={() =>
                  addShowcaseProductToCart({
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    compareAtPrice: item.compareAtPrice,
                    discountPercent: item.discountPercent,
                    image: item.image,
                    imageAlt: item.imageAlt,
                  })
                }
              />
            </li>
          ))}
        </ul>
      ) : null}
    </ProfileContentCard>
  );
}
