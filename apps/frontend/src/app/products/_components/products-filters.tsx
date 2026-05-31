'use client';

import { ProductsFiltersPanel } from './products-filters-panel';
import type { ProductsFilterValues } from './products-filters-panel';
import { cn } from '@/components/base/_lib/utils';

export type { ProductsFilterValues };

type ProductsFiltersProps = {
  facets: Parameters<typeof ProductsFiltersPanel>[0]['facets'];
  values: ProductsFilterValues;
  title: string;
  ariaLabel: string;
  priceFilterLabel: string;
  brandFilterLabel: string;
  storageFilterLabel: string;
  priceFromLabel: string;
  priceToLabel: string;
  brandSearchLabel: string;
  applyLabel: string;
  resetLabel: string;
  onApply: (values: ProductsFilterValues) => void;
  onReset: () => void;
  className?: string;
};

export function ProductsFilters({
  facets,
  values,
  title,
  ariaLabel,
  priceFilterLabel,
  brandFilterLabel,
  storageFilterLabel,
  priceFromLabel,
  priceToLabel,
  brandSearchLabel,
  applyLabel,
  resetLabel,
  onApply,
  onReset,
  className,
}: ProductsFiltersProps) {
  return (
    <aside
      aria-label={ariaLabel}
      className={cn(
        'hidden min-w-0 border-b border-muted/15 pb-6 lg:block lg:border-b-0 lg:border-e lg:pb-0 lg:pe-8',
        className,
      )}
    >
      <h2 className="mb-4 text-sm font-bold text-foreground sm:text-base">
        {title}
      </h2>
      <ProductsFiltersPanel
        facets={facets}
        values={values}
        priceFilterLabel={priceFilterLabel}
        brandFilterLabel={brandFilterLabel}
        storageFilterLabel={storageFilterLabel}
        priceFromLabel={priceFromLabel}
        priceToLabel={priceToLabel}
        brandSearchLabel={brandSearchLabel}
        applyLabel={applyLabel}
        resetLabel={resetLabel}
        onApply={onApply}
        onReset={onReset}
      />
    </aside>
  );
}
