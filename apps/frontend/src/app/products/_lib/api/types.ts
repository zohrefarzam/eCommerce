import type { ProductSortId } from '@/app/products/_lib/product-catalog';
import type { ProductTabId } from '@/landing/_content/types';
import type { ApiListResponse } from '@/lib/api/types';

export type ProductDto = {
  id: string;
  name: string;
  price: string;
  compareAtPrice?: string;
  discountPercent?: number;
  image: string;
  imageAlt: string;
  defaultFavorite?: boolean;
  brand?: string;
  storageGb?: number;
  categorySlugs?: string[];
};

export type ProductFacetsDto = {
  priceMin: number;
  priceMax: number;
  brands: { slug: string; label: string; count: number }[];
  storage: { value: number; label: string; count: number }[];
};

export type ProductsListResponse = ApiListResponse<ProductDto> & {
  facets: ProductFacetsDto;
};

export type ProductsListParams = {
  category?: string;
  tab?: ProductTabId;
  page?: number;
  sort?: ProductSortId;
  priceMin?: number;
  priceMax?: number;
  brands?: string[];
  storage?: number[];
  q?: string;
};

export type ProductDetailDto = {
  id: string;
  displayName: string;
  product: ProductDto;
  gallery: { src: string; alt: string }[];
  colors: { id: string; label: string; hex: string }[];
  defaultColorId: string;
  storageOptions: { gb: number; label: string }[];
  defaultStorageGb: number;
  highlights: { icon: string; label: string; value: string }[];
  shortDescription: string;
  detailsIntro: string;
  detailSections: {
    id: string;
    title: string;
    rows: { label: string; value: string | string[] }[];
  }[];
  moreDetailSections: {
    id: string;
    title: string;
    rows: { label: string; value: string | string[] }[];
  }[];
  trustBadges: { icon: string; title: string; subtitle: string }[];
  categorySlug?: string;
  brandLabel?: string;
  relatedProducts: ProductDto[];
};
