'use client';

import { Select } from '@/components/base/select';
import type { ProductSortId } from '@/lib/product-catalog';
import { cn } from '@/lib/utils';

type SortOption = { id: ProductSortId; label: string };

type ProductsToolbarProps = {
  selectedCountLabel: string;
  sortLabel: string;
  sortOptions: SortOption[];
  sort: ProductSortId;
  onSortChange: (sort: ProductSortId) => void;
  className?: string;
};

export function ProductsToolbar({
  selectedCountLabel,
  sortLabel,
  sortOptions,
  sort,
  onSortChange,
  className,
}: ProductsToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 border-b border-muted/15 pb-3 sm:pb-4 lg:border-b',
        className,
      )}
    >
      <p className="text-sm font-medium text-foreground">
        {selectedCountLabel}
      </p>
      <div className="flex items-center gap-2 text-sm text-muted">
        <span className="sr-only sm:not-sr-only sm:inline">{sortLabel}</span>
        <div className="min-w-48">
          <Select<ProductSortId>
            aria-label={sortLabel}
            options={sortOptions}
            selectedKey={sort}
            onSelectionChange={onSortChange}
          />
        </div>
      </div>
    </div>
  );
}
