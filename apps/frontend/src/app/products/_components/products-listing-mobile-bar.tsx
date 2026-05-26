'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import type { ProductFacets, ProductSortId } from '@/lib/product-catalog';
import { cn } from '@/lib/utils';
import type { ProductsFilterValues } from './products-filters';
import { ProductsFiltersPanel } from './products-filters-panel';

type SortOption = { id: ProductSortId; label: string };

type ProductsListingMobileBarProps = {
  totalCount: number;
  filtersTitle: string;
  sortLabel: string;
  productsResultLabel: (count: number) => string;
  facets: ProductFacets;
  filterValues: ProductsFilterValues;
  priceFilterLabel: string;
  brandFilterLabel: string;
  storageFilterLabel: string;
  priceFromLabel: string;
  priceToLabel: string;
  brandSearchLabel: string;
  applyFiltersLabel: string;
  resetFiltersLabel: string;
  sortOptions: SortOption[];
  sort: ProductSortId;
  onApplyFilters: (values: ProductsFilterValues) => void;
  onResetFilters: () => void;
  onSortChange: (sort: ProductSortId) => void;
  className?: string;
};

const mobileActionClass =
  'flex h-11 w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-muted/25 bg-background px-3 text-sm font-medium text-foreground shadow-none hover:border-muted/40 hover:bg-input-bg';

function SortOptionRow({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      variant="ghost"
      fullWidth
      onPress={onSelect}
      className={cn(
        'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-start text-sm',
        selected
          ? 'bg-foreground/8 font-semibold text-foreground hover:bg-foreground/8'
          : 'text-foreground hover:bg-foreground/5',
      )}
    >
      <span>{label}</span>
      {selected ? (
        <Icon
          icon="lucide:check"
          width={18}
          height={18}
          className="shrink-0 text-foreground"
          aria-hidden
        />
      ) : null}
    </Button>
  );
}

export function ProductsListingMobileBar({
  totalCount,
  filtersTitle,
  sortLabel,
  productsResultLabel,
  facets,
  filterValues,
  priceFilterLabel,
  brandFilterLabel,
  storageFilterLabel,
  priceFromLabel,
  priceToLabel,
  brandSearchLabel,
  applyFiltersLabel,
  resetFiltersLabel,
  sortOptions,
  sort,
  onApplyFilters,
  onResetFilters,
  onSortChange,
  className,
}: ProductsListingMobileBarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const currentSortLabel = useMemo(
    () => sortOptions.find((o) => o.id === sort)?.label ?? sortLabel,
    [sort, sortLabel, sortOptions],
  );

  const filterPanelProps = {
    facets,
    values: filterValues,
    priceFilterLabel,
    brandFilterLabel,
    storageFilterLabel,
    priceFromLabel,
    priceToLabel,
    brandSearchLabel,
    applyLabel: applyFiltersLabel,
    resetLabel: resetFiltersLabel,
    onApply: (values: ProductsFilterValues) => {
      onApplyFilters(values);
      setFiltersOpen(false);
    },
    onReset: () => {
      onResetFilters();
      setFiltersOpen(false);
    },
  };

  return (
    <div className={cn('flex flex-col gap-3 lg:hidden', className)}>
      <div className="grid w-full grid-cols-2 gap-2">
        <Button
          variant="outline"
          fullWidth
          className={mobileActionClass}
          onPress={() => setFiltersOpen(true)}
        >
          <span className="truncate">{filtersTitle}</span>
          <Icon
            icon="lucide:sliders-horizontal"
            width={18}
            height={18}
            className="shrink-0"
            aria-hidden
          />
        </Button>
        <Button
          variant="outline"
          fullWidth
          className={mobileActionClass}
          onPress={() => setSortOpen(true)}
        >
          <span className="min-w-0 truncate">{currentSortLabel}</span>
          <Icon
            icon="lucide:chevron-down"
            width={18}
            height={18}
            className="shrink-0"
            aria-hidden
          />
        </Button>
      </div>

      <p className="text-sm font-medium text-foreground">
        {productsResultLabel(totalCount)}
      </p>

      <Modal
        isOpen={filtersOpen}
        onOpenChange={setFiltersOpen}
        title={filtersTitle}
        bodyClassName="!pb-6"
      >
        <ProductsFiltersPanel {...filterPanelProps} />
      </Modal>

      <Modal
        isOpen={sortOpen}
        onOpenChange={setSortOpen}
        title={sortLabel}
        placement="bottom"
      >
        <ul
          className="flex flex-col gap-1"
          role="listbox"
          aria-label={sortLabel}
        >
          {sortOptions.map((option) => (
            <li key={option.id} role="presentation">
              <SortOptionRow
                label={option.label}
                selected={sort === option.id}
                onSelect={() => {
                  onSortChange(option.id);
                  setSortOpen(false);
                }}
              />
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
