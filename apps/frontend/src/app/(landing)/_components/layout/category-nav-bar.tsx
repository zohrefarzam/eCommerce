'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { categoryBarItems } from '@/landing/_content/landing';

const categoryIconBySlug: Record<
  (typeof categoryBarItems)[number]['slug'],
  string
> = {
  phones: 'lucide:smartphone',
  computers: 'lucide:monitor',
  watches: 'lucide:watch',
  cameras: 'lucide:camera',
  headphones: 'lucide:headphones',
  gaming: 'lucide:gamepad-2',
};

export function CategoryNavBar() {
  return (
    <nav
      aria-label="دسته‌بندی محصولات"
      className="flex w-full flex-nowrap gap-0 overflow-x-auto bg-category-bar-bg py-3 text-category-bar-fg sm:overflow-visible"
    >
      {categoryBarItems.map((item, index) => (
        <Link
          key={item.slug}
          href={`/category/${item.slug}`}
          prefetch={false}
          className={`flex min-w-[7.5rem] shrink-0 items-center justify-center gap-2 border-s border-white/15 px-3 py-2 text-sm font-medium transition hover:bg-white/10 sm:min-w-0 sm:flex-1 sm:basis-0 sm:shrink sm:px-2 ${
            index === 0 ? 'border-s-0' : ''
          }`}
        >
          <Icon
            icon={categoryIconBySlug[item.slug]}
            width={22}
            height={22}
            className="shrink-0 text-category-bar-fg"
            aria-hidden
          />
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
