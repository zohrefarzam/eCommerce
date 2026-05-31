'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { Accordion, AccordionSection } from '@/components/base/accordion';
import { Button } from '@/components/base/button';
import { Checkbox } from '@/components/base/checkbox';
import { Input } from '@/components/base/input';
import { Slider } from '@/components/base/slider';
import type {
  BrandFacet,
  ProductFacets,
  StorageFacet,
} from '@/app/products/_lib/product-catalog';

export type ProductsFilterValues = {
  priceMin?: number;
  priceMax?: number;
  brands: string[];
  storageGb: number[];
};

type ProductsFiltersPanelProps = {
  facets: ProductFacets;
  values: ProductsFilterValues;
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
};

function clampPrice(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function PriceRangeFilter({
  min,
  max,
  priceMin,
  priceMax,
  fromLabel,
  toLabel,
  sliderAriaLabel,
  onChange,
}: {
  min: number;
  max: number;
  priceMin?: number;
  priceMax?: number;
  fromLabel: string;
  toLabel: string;
  sliderAriaLabel: string;
  onChange: (next: { priceMin?: number; priceMax?: number }) => void;
}) {
  const range = Math.max(1, max - min);
  const step = Math.max(1, Math.round(range / 100));

  const low = clampPrice(priceMin ?? min, min, max);
  const high = clampPrice(priceMax ?? max, min, max);
  const sliderValue: [number, number] = [
    Math.min(low, high),
    Math.max(low, high),
  ];

  return (
    <div dir="ltr" className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{fromLabel}</span>
        <span>{toLabel}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          placeholder={String(min)}
          value={priceMin ?? ''}
          aria-label={fromLabel}
          onChange={(e) => {
            const nextMin = e.target.value
              ? Number.parseInt(e.target.value, 10)
              : undefined;
            onChange({ priceMin: nextMin, priceMax });
          }}
        />
        <span className="h-px w-3 shrink-0 bg-muted/40" aria-hidden />
        <Input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          placeholder={String(max)}
          value={priceMax ?? ''}
          aria-label={toLabel}
          onChange={(e) => {
            const nextMax = e.target.value
              ? Number.parseInt(e.target.value, 10)
              : undefined;
            onChange({ priceMin, priceMax: nextMax });
          }}
        />
      </div>
      <Slider
        aria-label={sliderAriaLabel}
        minValue={min}
        maxValue={max}
        step={step}
        value={sliderValue}
        onChange={(value) => {
          if (Array.isArray(value) && value.length === 2) {
            onChange({ priceMin: value[0], priceMax: value[1] });
          }
        }}
      />
    </div>
  );
}

function CheckboxRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Checkbox
      isSelected={checked}
      onChange={onChange}
      className="w-full px-1.5 py-1 hover:bg-foreground/5"
    >
      <span className="flex w-full min-w-0 items-center justify-between gap-2">
        <span className="min-w-0 flex-1 truncate">{label}</span>
        {count != null ? (
          <span className="shrink-0 text-xs tabular-nums text-muted">
            {count}
          </span>
        ) : null}
      </span>
    </Checkbox>
  );
}

function FacetCheckList<T extends { count: number }>({
  items,
  getKey,
  getLabel,
  selected,
  onToggle,
  searchPlaceholder,
}: {
  items: T[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  selected: Set<string>;
  onToggle: (key: string, checked: boolean) => void;
  searchPlaceholder: string;
}) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => getLabel(item).toLowerCase().includes(q));
  }, [items, query, getLabel]);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {items.length > 4 ? (
        <Input
          type="search"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          startContent={
            <Icon icon="lucide:search" width={16} height={16} aria-hidden />
          }
          aria-label={searchPlaceholder}
        />
      ) : null}
      <div className="flex max-h-44 flex-col gap-0.5 overflow-y-auto pe-0.5">
        {filtered.map((item) => {
          const key = getKey(item);
          return (
            <CheckboxRow
              key={key}
              label={getLabel(item)}
              count={item.count}
              checked={selected.has(key)}
              onChange={(checked) => onToggle(key, checked)}
            />
          );
        })}
      </div>
    </div>
  );
}

/** Shared filter form — used in the desktop sidebar and mobile modal. */
export function ProductsFiltersPanel({
  facets,
  values,
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
}: ProductsFiltersPanelProps) {
  const [draft, setDraft] = useState(values);

  useEffect(() => {
    setDraft(values);
  }, [values]);

  const brandSelected = useMemo(() => new Set(draft.brands), [draft.brands]);
  const storageSelected = useMemo(
    () => new Set(draft.storageGb.map(String)),
    [draft.storageGb],
  );

  const toggleBrand = (slug: string, checked: boolean) => {
    setDraft((prev) => ({
      ...prev,
      brands: checked
        ? [...prev.brands, slug]
        : prev.brands.filter((b) => b !== slug),
    }));
  };

  const toggleStorage = (value: number, checked: boolean) => {
    setDraft((prev) => ({
      ...prev,
      storageGb: checked
        ? [...prev.storageGb, value]
        : prev.storageGb.filter((s) => s !== value),
    }));
  };

  const defaultExpandedKeys = useMemo(() => {
    const keys = ['price'];
    if (facets.brands.length > 0) keys.push('brand');
    if (facets.storage.length > 0) keys.push('storage');
    return keys;
  }, [facets.brands.length, facets.storage.length]);

  return (
    <>
      <Accordion
        allowsMultipleExpanded
        defaultExpandedKeys={defaultExpandedKeys}
        className="flex flex-col"
      >
        <AccordionSection id="price" title={priceFilterLabel}>
          <PriceRangeFilter
            min={facets.priceMin}
            max={facets.priceMax}
            priceMin={draft.priceMin}
            priceMax={draft.priceMax}
            fromLabel={priceFromLabel}
            toLabel={priceToLabel}
            sliderAriaLabel={priceFilterLabel}
            onChange={(next) =>
              setDraft((prev) => ({
                ...prev,
                priceMin: next.priceMin,
                priceMax: next.priceMax,
              }))
            }
          />
        </AccordionSection>

        {facets.brands.length > 0 ? (
          <AccordionSection id="brand" title={brandFilterLabel}>
            <FacetCheckList<BrandFacet>
              items={facets.brands}
              getKey={(b) => b.slug}
              getLabel={(b) => b.label}
              selected={brandSelected}
              onToggle={toggleBrand}
              searchPlaceholder={brandSearchLabel}
            />
          </AccordionSection>
        ) : null}

        {facets.storage.length > 0 ? (
          <AccordionSection id="storage" title={storageFilterLabel}>
            <FacetCheckList<StorageFacet>
              items={facets.storage}
              getKey={(s) => String(s.value)}
              getLabel={(s) => s.label}
              selected={storageSelected}
              onToggle={(key, checked) =>
                toggleStorage(Number.parseInt(key, 10), checked)
              }
              searchPlaceholder={brandSearchLabel}
            />
          </AccordionSection>
        ) : null}
      </Accordion>

      <div className="mt-5 flex flex-col gap-2 border-t border-muted/15 pt-4">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onPress={() => onApply(draft)}
          className="rounded-lg bg-foreground text-sm font-semibold text-background hover:bg-foreground/90"
        >
          {applyLabel}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          onPress={onReset}
          className="rounded-lg bg-transparent text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground"
        >
          {resetLabel}
        </Button>
      </div>
    </>
  );
}
