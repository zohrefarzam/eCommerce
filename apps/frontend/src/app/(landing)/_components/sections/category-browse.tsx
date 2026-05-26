'use client';

import { useRef } from 'react';
import { Icon } from '@iconify/react';
import { useLandingContent, useLocale } from '@/i18n';
import { SectionHeader } from '@/landing/_components/ui/section-header';
import { CategoryCard } from '@/landing/_components/ui/category-card';
import { productsCategoryHref } from '@/lib/product-catalog';

export function CategoryBrowse() {
  const { browseCategories, categoryBrowse } = useLandingContent();
  const { config } = useLocale();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (direction: 'prev' | 'next') => {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.8;
    const isRtl = config.dir === 'rtl';
    const scrollLeft =
      direction === 'next'
        ? isRtl
          ? -amount
          : amount
        : isRtl
          ? amount
          : -amount;
    node.scrollBy({ left: scrollLeft, behavior: 'smooth' });
  };

  const prevIcon =
    config.dir === 'rtl' ? 'lucide:chevron-right' : 'lucide:chevron-left';
  const nextIcon =
    config.dir === 'rtl' ? 'lucide:chevron-left' : 'lucide:chevron-right';

  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title={categoryBrowse.title}
        actions={
          <div className="flex items-center gap-2">
            <ScrollButton
              icon={prevIcon}
              label={categoryBrowse.prevLabel}
              onClick={() => scrollBy('prev')}
            />
            <ScrollButton
              icon={nextIcon}
              label={categoryBrowse.nextLabel}
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
            href={productsCategoryHref(cat.slug)}
            label={cat.label}
            icon={cat.icon}
          />
        ))}
      </div>
    </section>
  );
}

function ScrollButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
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
      <Icon icon={icon} width={20} height={20} aria-hidden />
    </button>
  );
}
