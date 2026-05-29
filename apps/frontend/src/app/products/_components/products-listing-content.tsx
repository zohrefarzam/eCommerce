'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MarketingHeader } from '@/components/ui/marketing-header';
import { ProductCard } from '@/components/ui/product-card';
import { CategoryNavBar } from '@/landing/_components/layout/category-nav-bar';
import { SiteFooter } from '@/landing/_components/layout/site-footer';
import { SiteShell } from '@/landing/_components/layout/site-shell';
import type { ShowcaseProduct } from '@/landing/_content/types';
import type { ProductFacets, ProductSortId } from '@/lib/product-catalog';
import { addShowcaseProductToCart } from '@/lib/cart-store';
import { productDetailHref } from '@/lib/product-detail';
import { ProductsBreadcrumb, type BreadcrumbItem } from './products-breadcrumb';
import { ProductsFilters, type ProductsFilterValues } from './products-filters';
import { ProductsListingMobileBar } from './products-listing-mobile-bar';
import { ProductsPagination } from './products-pagination';
import { ProductsToolbar } from './products-toolbar';

export type ProductsListingContentProps = {
  products: ShowcaseProduct[];
  totalCount: number;
  page: number;
  totalPages: number;
  emptyMessage: string;
  clearFiltersLabel: string;
  breadcrumbItems: BreadcrumbItem[];
  breadcrumbAriaLabel: string;
  facets: ProductFacets;
  filterValues: ProductsFilterValues;
  filtersTitle: string;
  filtersAriaLabel: string;
  priceFilterLabel: string;
  brandFilterLabel: string;
  storageFilterLabel: string;
  priceFromLabel: string;
  priceToLabel: string;
  brandSearchLabel: string;
  applyFiltersLabel: string;
  resetFiltersLabel: string;
  selectedCountLabel: string;
  productsResultLabel: (count: number) => string;
  sortLabel: string;
  sortOptions: { id: ProductSortId; label: string }[];
  sort: ProductSortId;
  onSortChange: (sort: ProductSortId) => void;
  onApplyFilters: (values: ProductsFilterValues) => void;
  onResetFilters: () => void;
  buildPageHref: (page: number) => string;
  paginationPrevLabel: string;
  paginationNextLabel: string;
  paginationPageLabel: (page: number) => string;
  paginationAriaLabel: string;
};

export function ProductsListingContent({
  products,
  totalCount,
  page,
  totalPages,
  emptyMessage,
  clearFiltersLabel,
  breadcrumbItems,
  breadcrumbAriaLabel,
  facets,
  filterValues,
  filtersTitle,
  filtersAriaLabel,
  priceFilterLabel,
  brandFilterLabel,
  storageFilterLabel,
  priceFromLabel,
  priceToLabel,
  brandSearchLabel,
  applyFiltersLabel,
  resetFiltersLabel,
  selectedCountLabel,
  productsResultLabel,
  sortLabel,
  sortOptions,
  sort,
  onSortChange,
  onApplyFilters,
  onResetFilters,
  buildPageHref,
  paginationPrevLabel,
  paginationNextLabel,
  paginationPageLabel,
  paginationAriaLabel,
}: ProductsListingContentProps) {
  const router = useRouter();
  const sectionLabel =
    breadcrumbItems[breadcrumbItems.length - 1]?.label ?? 'Products';

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background">
      <div className="flex w-full min-w-0 flex-col overflow-x-hidden">
        <MarketingHeader />
        <CategoryNavBar />
      </div>

      <SiteShell className="!py-8">
        <section
          className="flex flex-col gap-5 sm:gap-6"
          aria-label={sectionLabel}
        >
          <ProductsBreadcrumb
            items={breadcrumbItems}
            ariaLabel={breadcrumbAriaLabel}
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <ProductsFilters
              facets={facets}
              values={filterValues}
              title={filtersTitle}
              ariaLabel={filtersAriaLabel}
              priceFilterLabel={priceFilterLabel}
              brandFilterLabel={brandFilterLabel}
              storageFilterLabel={storageFilterLabel}
              priceFromLabel={priceFromLabel}
              priceToLabel={priceToLabel}
              brandSearchLabel={brandSearchLabel}
              applyLabel={applyFiltersLabel}
              resetLabel={resetFiltersLabel}
              onApply={onApplyFilters}
              onReset={onResetFilters}
              className="lg:sticky lg:top-24 lg:w-64 xl:w-72"
            />

            <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
              <ProductsListingMobileBar
                totalCount={totalCount}
                filtersTitle={filtersTitle}
                sortLabel={sortLabel}
                productsResultLabel={productsResultLabel}
                facets={facets}
                filterValues={filterValues}
                priceFilterLabel={priceFilterLabel}
                brandFilterLabel={brandFilterLabel}
                storageFilterLabel={storageFilterLabel}
                priceFromLabel={priceFromLabel}
                priceToLabel={priceToLabel}
                brandSearchLabel={brandSearchLabel}
                applyFiltersLabel={applyFiltersLabel}
                resetFiltersLabel={resetFiltersLabel}
                sortOptions={sortOptions}
                sort={sort}
                onApplyFilters={onApplyFilters}
                onResetFilters={onResetFilters}
                onSortChange={onSortChange}
              />

              <ProductsToolbar
                selectedCountLabel={selectedCountLabel}
                sortLabel={sortLabel}
                sortOptions={sortOptions}
                sort={sort}
                onSortChange={onSortChange}
                className="hidden lg:flex"
              />

              {totalCount === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-muted/30 px-6 py-14 text-center">
                  <p className="max-w-md text-sm text-muted">{emptyMessage}</p>
                  <Link
                    href="/products"
                    prefetch={false}
                    className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {clearFiltersLabel}
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-3">
                    {products.map((p) => (
                      <ProductCard
                        key={p.id}
                        productId={p.id}
                        name={p.name}
                        price={p.price}
                        compareAtPrice={p.compareAtPrice}
                        discountPercent={p.discountPercent}
                        image={p.image}
                        imageAlt={p.imageAlt}
                        onView={() => router.push(productDetailHref(p.id))}
                        onBuy={() => addShowcaseProductToCart(p)}
                      />
                    ))}
                  </div>

                  <ProductsPagination
                    page={page}
                    totalPages={totalPages}
                    buildPageHref={buildPageHref}
                    prevLabel={paginationPrevLabel}
                    nextLabel={paginationNextLabel}
                    pageLabel={paginationPageLabel}
                    ariaLabel={paginationAriaLabel}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </SiteShell>

      <SiteFooter />
    </div>
  );
}
