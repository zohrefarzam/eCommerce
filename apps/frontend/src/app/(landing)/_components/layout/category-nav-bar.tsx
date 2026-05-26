'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useLandingContent } from '@/i18n';
import { productsCategoryHref } from '@/lib/product-catalog';
import { STOREFRONT_CONTENT_FRAME } from '@/lib/storefront-layout';

const categoryIconBySlug: Record<string, string> = {
  phones: 'lucide:smartphone',
  computers: 'lucide:monitor',
  watches: 'lucide:watch',
  cameras: 'lucide:camera',
  headphones: 'lucide:headphones',
  gaming: 'lucide:gamepad-2',
};

export function CategoryNavBar() {
  const { categoryBarItems, categoryBrowse } = useLandingContent();

  return (
    <nav
      aria-label={categoryBrowse.categoriesAriaLabel}
      className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain scroll-smooth bg-category-bar-bg py-2 text-category-bar-fg sm:overflow-visible sm:py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        className={`${STOREFRONT_CONTENT_FRAME} flex w-full min-w-0 flex-nowrap`}
      >
        {categoryBarItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === categoryBarItems.length - 1;
          return (
            <Link
              key={item.slug}
              href={productsCategoryHref(item.slug)}
              prefetch={false}
              aria-label={item.label}
              className={`flex flex-1 basis-0 items-center border-s border-white/15 px-2 py-2.5 transition hover:bg-white/10 sm:min-w-0 sm:flex-row sm:gap-2 sm:py-2 ${
                isFirst
                  ? 'justify-start border-s-0 ps-0'
                  : isLast
                    ? 'justify-end pe-0'
                    : 'justify-center'
              }`}
            >
              <Icon
                icon={categoryIconBySlug[item.slug]}
                width={22}
                height={22}
                className="shrink-0 text-category-bar-fg"
                aria-hidden
              />
              <span className="hidden text-sm font-medium sm:inline">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
