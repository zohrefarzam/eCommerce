'use client';

import { useRef } from 'react';
import { Icon } from '@iconify/react';
import { browseCategories } from '@/landing/_content/landing';
import { SectionHeader } from '@/landing/_components/ui/section-header';
import { CategoryCard } from '@/landing/_components/ui/category-card';

export function CategoryBrowse() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (direction: 'prev' | 'next') => {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.8;
    node.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="مرور بر اساس دسته"
        actions={
          <div className="flex items-center gap-2">
            <ScrollButton
              direction="prev"
              label="دسته قبلی"
              onClick={() => scrollBy('prev')}
            />
            <ScrollButton
              direction="next"
              label="دسته بعدی"
              onClick={() => scrollBy('next')}
            />
          </div>
        }
      />
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {browseCategories.map((cat) => (
          <CategoryCard
            key={cat.slug}
            href={`/category/${cat.slug}`}
            label={cat.label}
            icon={cat.icon}
          />
        ))}
      </div>
    </section>
  );
}

function ScrollButton({
  direction,
  label,
  onClick,
}: {
  direction: 'prev' | 'next';
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full text-foreground transition hover:bg-surface-secondary"
    >
      <Icon
        icon={
          direction === 'next' ? 'lucide:chevron-left' : 'lucide:chevron-right'
        }
        width={20}
        height={20}
        aria-hidden
      />
    </button>
  );
}
