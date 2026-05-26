'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductsListingContent } from './_components/products-listing-content';
import type { BreadcrumbItem } from './_components/products-breadcrumb';
import type { ProductsFilterValues } from './_components/products-filters';
import {
  buildProductsHref,
  getListingProducts,
  getProductTabLabel,
  isValidCategorySlug,
  isValidProductTab,
  parseProductsSearchParams,
  type ProductSortId,
  type ProductsListFilters,
} from '@/lib/product-catalog';
import { useLandingContent, useLocale } from '@/i18n';

type ProductsListingProps = {
  categorySlug?: string;
  tabId?: string;
  page?: number;
  sort?: ProductSortId;
  priceMin?: number;
  priceMax?: number;
  brands?: string[];
  storageGb?: number[];
};

export function ProductsListing({
  categorySlug,
  tabId,
  page = 1,
  sort = 'rating',
  priceMin,
  priceMax,
  brands = [],
  storageGb = [],
}: ProductsListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const landing = useLandingContent();
  const { messages } = useLocale();
  const { productsListing } = messages;

  const activeCategory = isValidCategorySlug(landing, categorySlug)
    ? categorySlug
    : undefined;
  const activeTab = isValidProductTab(landing, tabId) ? tabId : undefined;

  const categoryLabel = activeCategory
    ? landing.categoryBarItems.find((c) => c.slug === activeCategory)?.label
    : undefined;
  const tabLabel = activeTab
    ? getProductTabLabel(landing, activeTab)
    : undefined;

  const baseFilters = useMemo(
    (): ProductsListFilters => ({
      category: activeCategory,
      tab: activeTab,
      sort,
      page,
      priceMin,
      priceMax,
      brands: brands.length ? brands : undefined,
      storageGb: storageGb.length ? storageGb : undefined,
    }),
    [
      activeCategory,
      activeTab,
      sort,
      page,
      priceMin,
      priceMax,
      brands,
      storageGb,
    ],
  );

  const listing = useMemo(
    () =>
      getListingProducts(landing, {
        categorySlug: activeCategory,
        tabId: activeTab,
        facetFilters: { priceMin, priceMax, brands, storageGb },
        sort,
        page,
      }),
    [
      landing,
      activeCategory,
      activeTab,
      priceMin,
      priceMax,
      brands,
      storageGb,
      sort,
      page,
    ],
  );

  const navigate = useCallback(
    (patch: Partial<ProductsListFilters>) => {
      const href = buildProductsHref({
        ...baseFilters,
        ...patch,
        page: patch.page ?? 1,
      });
      const next = new URLSearchParams(href.split('?')[1] ?? '');
      const current = searchParams.toString();
      if (next.toString() === current) return;
      router.push(href, { scroll: false });
    },
    [baseFilters, router, searchParams],
  );

  const emptyMessage =
    activeTab && activeCategory
      ? productsListing.emptyForFilters
      : activeTab
        ? productsListing.emptyForTab
        : productsListing.emptyForCategory;

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: productsListing.breadcrumbHome, href: '/' },
      { label: productsListing.breadcrumbCatalog, href: '/products' },
    ];
    if (categoryLabel) {
      items.push({ label: categoryLabel });
    } else if (tabLabel) {
      items.push({ label: tabLabel });
    } else {
      items.push({ label: productsListing.allTitle });
    }
    return items;
  }, [
    categoryLabel,
    tabLabel,
    productsListing.breadcrumbHome,
    productsListing.breadcrumbCatalog,
    productsListing.allTitle,
  ]);

  const sortOptions = useMemo(
    () => [
      { id: 'rating' as const, label: productsListing.sortRating },
      { id: 'price-asc' as const, label: productsListing.sortPriceAsc },
      { id: 'price-desc' as const, label: productsListing.sortPriceDesc },
      { id: 'name' as const, label: productsListing.sortName },
    ],
    [productsListing],
  );

  const filterValues: ProductsFilterValues = useMemo(
    () => ({
      priceMin,
      priceMax,
      brands,
      storageGb,
    }),
    [priceMin, priceMax, brands, storageGb],
  );

  const buildPageHref = useCallback(
    (targetPage: number) =>
      buildProductsHref({ ...baseFilters, page: targetPage }),
    [baseFilters],
  );

  return (
    <ProductsListingContent
      products={listing.items}
      totalCount={listing.filteredCount}
      page={listing.page}
      totalPages={listing.totalPages}
      emptyMessage={emptyMessage}
      clearFiltersLabel={productsListing.clearFiltersLabel}
      breadcrumbItems={breadcrumbItems}
      breadcrumbAriaLabel={productsListing.breadcrumbAriaLabel}
      facets={listing.facets}
      filterValues={filterValues}
      filtersTitle={productsListing.filtersTitle}
      filtersAriaLabel={productsListing.filtersAriaLabel}
      priceFilterLabel={productsListing.priceFilter}
      brandFilterLabel={productsListing.brandFilter}
      storageFilterLabel={productsListing.storageFilter}
      priceFromLabel={productsListing.priceFrom}
      priceToLabel={productsListing.priceTo}
      brandSearchLabel={productsListing.brandSearch}
      applyFiltersLabel={productsListing.applyFilters}
      resetFiltersLabel={productsListing.resetFilters}
      selectedCountLabel={productsListing.selectedCount(listing.filteredCount)}
      productsResultLabel={productsListing.productsResultLabel}
      sortLabel={productsListing.sortLabel}
      sortOptions={sortOptions}
      sort={sort}
      onSortChange={(next) => navigate({ sort: next, page: 1 })}
      onApplyFilters={(values) =>
        navigate({
          priceMin: values.priceMin,
          priceMax: values.priceMax,
          brands: values.brands.length ? values.brands : undefined,
          storageGb: values.storageGb.length ? values.storageGb : undefined,
          page: 1,
        })
      }
      onResetFilters={() =>
        navigate({
          priceMin: undefined,
          priceMax: undefined,
          brands: undefined,
          storageGb: undefined,
          page: 1,
        })
      }
      buildPageHref={buildPageHref}
      paginationPrevLabel={productsListing.paginationPrev}
      paginationNextLabel={productsListing.paginationNext}
      paginationPageLabel={productsListing.paginationPage}
      paginationAriaLabel={productsListing.paginationAriaLabel}
    />
  );
}

export function ProductsListingFromSearchParams() {
  const searchParams = useSearchParams();
  const parsed = parseProductsSearchParams({
    category: searchParams.get('category') ?? undefined,
    tab: searchParams.get('tab') ?? undefined,
    page: searchParams.get('page') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
    priceMin: searchParams.get('priceMin') ?? undefined,
    priceMax: searchParams.get('priceMax') ?? undefined,
    brand: searchParams.get('brand') ?? undefined,
    storage: searchParams.get('storage') ?? undefined,
  });

  return (
    <ProductsListing
      categorySlug={parsed.category}
      tabId={parsed.tab}
      page={parsed.page}
      sort={parsed.sort}
      priceMin={parsed.priceMin}
      priceMax={parsed.priceMax}
      brands={parsed.brands ?? []}
      storageGb={parsed.storageGb ?? []}
    />
  );
}
