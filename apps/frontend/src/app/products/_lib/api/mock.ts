import { getLandingContent } from '@/landing/_content';
import type { ShowcaseProduct } from '@/landing/_content/types';
import {
  getListingProducts,
  getProductMeta,
  getRelatedProducts,
  productCategorySlugsById,
  PRODUCTS_PAGE_SIZE,
  type ProductSortId,
} from '@/app/products/_lib/product-catalog';
import { getProductDetail } from '@/app/products/_lib/product-detail';
import { serializeImageSource } from '@/lib/api/serialize';
import type {
  ProductDetailDto,
  ProductDto,
  ProductsListParams,
  ProductsListResponse,
} from '@/app/products/_lib/api/types';
import type { ProductTabId } from '@/landing/_content/types';
import type { Locale } from '@/i18n/config';

function toProductDto(product: ShowcaseProduct, locale: Locale): ProductDto {
  const meta = getProductMeta(product.id);
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    discountPercent: product.discountPercent,
    image: product.image,
    imageAlt: product.imageAlt,
    defaultFavorite: product.defaultFavorite,
    brand: meta?.brand,
    storageGb: meta?.storageGb,
    categorySlugs: [...(productCategorySlugsById[product.id] ?? [])],
  };
}

export function mockProductsList(
  locale: Locale,
  params: ProductsListParams,
): ProductsListResponse {
  const landing = getLandingContent(locale);
  const pageSize = PRODUCTS_PAGE_SIZE;
  const result = getListingProducts(landing, {
    categorySlug: params.category,
    tabId: params.tab as ProductTabId | undefined,
    facetFilters: {
      priceMin: params.priceMin,
      priceMax: params.priceMax,
      brands: params.brands,
      storageGb: params.storage,
    },
    sort: (params.sort ?? 'rating') as ProductSortId,
    page: params.page ?? 1,
    pageSize,
    q: params.q,
  });

  return {
    data: result.items.map((product) => toProductDto(product, locale)),
    meta: {
      page: result.page,
      pageSize,
      total: result.total,
      totalPages: result.totalPages,
    },
    facets: result.facets,
  };
}

export function mockProductDetail(
  locale: Locale,
  id: string,
): ProductDetailDto | null {
  const landing = getLandingContent(locale);
  const detail = getProductDetail(landing, locale, id);
  if (!detail) return null;

  const related = getRelatedProducts(landing, id);

  return {
    id: detail.product.id,
    displayName: detail.displayName,
    product: toProductDto(detail.product, locale),
    gallery: detail.gallery.map((item) => ({
      src: serializeImageSource(item.src),
      alt: item.alt,
    })),
    colors: detail.colors.map((c) => ({ ...c })),
    defaultColorId: detail.defaultColorId,
    storageOptions: detail.storageOptions.map((s) => ({ ...s })),
    defaultStorageGb: detail.defaultStorageGb,
    highlights: detail.highlights.map((h) => ({ ...h })),
    shortDescription: detail.shortDescription,
    detailsIntro: detail.detailsIntro,
    detailSections: detail.detailSections.map((section) => ({
      id: section.id,
      title: section.title,
      rows: section.rows.map((row) => ({
        label: row.label,
        value: typeof row.value === 'string' ? row.value : [...row.value],
      })),
    })),
    moreDetailSections: detail.moreDetailSections.map((section) => ({
      id: section.id,
      title: section.title,
      rows: section.rows.map((row) => ({
        label: row.label,
        value: typeof row.value === 'string' ? row.value : [...row.value],
      })),
    })),
    trustBadges: detail.trustBadges.map((b) => ({ ...b })),
    categorySlug: detail.categorySlug,
    brandLabel: detail.brandLabel,
    relatedProducts: related.map((p) => toProductDto(p, locale)),
  };
}
