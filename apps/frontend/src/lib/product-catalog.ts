import type {
  LandingContent,
  ProductTabId,
  ShowcaseProduct,
} from '@/landing/_content/types';

const PRODUCT_TAB_ORDER: ProductTabId[] = ['new', 'bestseller', 'featured'];

export const PRODUCTS_PAGE_SIZE = 12;

export type ProductSortId = 'rating' | 'price-asc' | 'price-desc' | 'name';

export type ProductCatalogMeta = {
  brand: string;
  storageGb?: number;
};

/** Demo catalog facets until a real API exists. */
export const productCatalogMetaById: Record<string, ProductCatalogMeta> = {
  '1': { brand: 'Nova', storageGb: 128 },
  '2': { brand: 'CinePro' },
  '3': { brand: 'FitTrack' },
  '4': { brand: 'SoundWave' },
  '5': { brand: 'FitTrack' },
  '6': { brand: 'Nova', storageGb: 256 },
  '7': { brand: 'SoundWave' },
  '8': { brand: 'PixelTab', storageGb: 64 },
  b1: { brand: 'UltraBook' },
  b2: { brand: 'Sony' },
  b3: { brand: 'Samsung' },
  b4: { brand: 'BoomBox' },
  b5: { brand: 'ProMax', storageGb: 256 },
  b6: { brand: 'FitTrack' },
  b7: { brand: 'SoundWave' },
  b8: { brand: 'PhotoPro' },
  f1: { brand: 'PixelTab', storageGb: 128 },
  f2: { brand: 'ChargePlus' },
  f3: { brand: 'AK' },
  f4: { brand: 'GamePro' },
  f5: { brand: 'HomeHub' },
  f6: { brand: 'FitTrack' },
  f7: { brand: 'GamePro' },
  f8: { brand: 'SoundWave' },
};

export type BrandFacet = { slug: string; label: string; count: number };
export type StorageFacet = { value: number; label: string; count: number };

export type ProductFacets = {
  priceMin: number;
  priceMax: number;
  brands: BrandFacet[];
  storage: StorageFacet[];
};

export type ProductFacetFilters = {
  priceMin?: number;
  priceMax?: number;
  brands?: string[];
  storageGb?: number[];
};

/** Optional admin-managed catalog overlay for storefront listing. */
export type ProductCatalogContext = {
  products: ShowcaseProduct[];
  metaById: Map<string, ProductCatalogMeta>;
  categorySlugsById: Map<string, readonly string[]>;
};

function resolveProductMeta(
  productId: string,
  ctx?: ProductCatalogContext,
): ProductCatalogMeta | undefined {
  return ctx?.metaById.get(productId) ?? productCatalogMetaById[productId];
}

function resolveCategorySlugs(
  productId: string,
  ctx?: ProductCatalogContext,
): readonly string[] {
  return (
    ctx?.categorySlugsById.get(productId) ??
    productCategorySlugsById[productId] ??
    []
  );
}

/**
 * Stable product id → storefront category slugs (matches `categoryBarItems` / `browseCategories`).
 * Used for MVP listing filters until a real catalog API exists.
 */
export const productCategorySlugsById: Record<string, readonly string[]> = {
  '1': ['phones'],
  '2': ['cameras'],
  '3': ['watches'],
  '4': ['headphones'],
  '5': ['watches'],
  '6': ['phones'],
  '7': ['headphones'],
  '8': ['computers'],
  b1: ['computers'],
  b2: ['gaming'],
  b3: ['headphones'],
  b4: ['headphones'],
  b5: ['phones'],
  b6: ['watches'],
  b7: ['headphones'],
  b8: ['cameras'],
  f1: ['computers'],
  f2: ['phones'],
  f3: ['computers', 'gaming'],
  f4: ['computers', 'gaming'],
  f5: ['headphones'],
  f6: ['watches'],
  f7: ['computers', 'gaming'],
  f8: ['headphones'],
};

export function mergeUniqueProducts(
  landing: LandingContent,
): ShowcaseProduct[] {
  const byId = new Map<string, ShowcaseProduct>();
  for (const tab of PRODUCT_TAB_ORDER) {
    for (const product of landing.productsByTab[tab]) {
      if (!byId.has(product.id)) {
        byId.set(product.id, product);
      }
    }
  }
  return [...byId.values()];
}

export type ProductsListFilters = {
  category?: string;
  tab?: ProductTabId;
  page?: number;
  sort?: ProductSortId;
  priceMin?: number;
  priceMax?: number;
  brands?: string[];
  storageGb?: number[];
  q?: string;
};

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase();
}

/** Text search over product name and catalog brand (demo until API search exists). */
export function filterProductsByQuery(
  products: ShowcaseProduct[],
  query: string | undefined,
  ctx?: ProductCatalogContext,
): ShowcaseProduct[] {
  const q = normalizeSearchText(query ?? '');
  if (!q) return products;

  return products.filter((product) => {
    const name = normalizeSearchText(product.name);
    const brand = normalizeSearchText(
      resolveProductMeta(product.id, ctx)?.brand ?? '',
    );
    return name.includes(q) || brand.includes(q);
  });
}

/** Normalize a price string (Persian/Arabic-Indic digits, currency, separators) to a number. */
export function parseProductPrice(price: string): number {
  const normalized = price
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  const digits = normalized.replace(/[^\d]/g, '');
  if (!digits) return 0;
  const value = Number.parseInt(digits, 10);
  return Number.isFinite(value) ? value : 0;
}

export function slugifyBrand(brand: string): string {
  return brand
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getProductMeta(
  productId: string,
): ProductCatalogMeta | undefined {
  return productCatalogMetaById[productId];
}

export function getProductFacets(
  products: ShowcaseProduct[],
  ctx?: ProductCatalogContext,
): ProductFacets {
  const brandCounts = new Map<string, number>();
  const storageCounts = new Map<number, number>();
  let priceMin = Infinity;
  let priceMax = 0;

  for (const product of products) {
    const amount = parseProductPrice(product.price);
    priceMin = Math.min(priceMin, amount);
    priceMax = Math.max(priceMax, amount);

    const meta = resolveProductMeta(product.id, ctx);
    if (meta?.brand) {
      const slug = slugifyBrand(meta.brand);
      brandCounts.set(slug, (brandCounts.get(slug) ?? 0) + 1);
    }
    if (meta?.storageGb != null) {
      storageCounts.set(
        meta.storageGb,
        (storageCounts.get(meta.storageGb) ?? 0) + 1,
      );
    }
  }

  const brands: BrandFacet[] = [...brandCounts.entries()]
    .map(([slug, count]) => {
      const label =
        [...products]
          .map((p) => resolveProductMeta(p.id, ctx))
          .find((m) => m && slugifyBrand(m.brand) === slug)?.brand ?? slug;
      return { slug, label, count };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  const storage: StorageFacet[] = [...storageCounts.entries()]
    .map(([value, count]) => ({
      value,
      label: `${value} GB`,
      count,
    }))
    .sort((a, b) => a.value - b.value);

  return {
    priceMin: Number.isFinite(priceMin) ? Math.floor(priceMin) : 0,
    priceMax: priceMax > 0 ? Math.ceil(priceMax) : 0,
    brands,
    storage,
  };
}

export function applyFacetFilters(
  products: ShowcaseProduct[],
  filters: ProductFacetFilters,
  ctx?: ProductCatalogContext,
): ShowcaseProduct[] {
  const brandSet =
    filters.brands && filters.brands.length > 0
      ? new Set(filters.brands)
      : null;
  const storageSet =
    filters.storageGb && filters.storageGb.length > 0
      ? new Set(filters.storageGb)
      : null;

  return products.filter((product) => {
    const amount = parseProductPrice(product.price);
    if (filters.priceMin != null && amount < filters.priceMin) return false;
    if (filters.priceMax != null && amount > filters.priceMax) return false;

    const meta = resolveProductMeta(product.id, ctx);
    if (brandSet) {
      if (!meta || !brandSet.has(slugifyBrand(meta.brand))) return false;
    }
    if (storageSet) {
      if (meta?.storageGb == null || !storageSet.has(meta.storageGb)) {
        return false;
      }
    }
    return true;
  });
}

export function sortProducts(
  products: ShowcaseProduct[],
  sort: ProductSortId,
): ShowcaseProduct[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      sorted.sort(
        (a, b) => parseProductPrice(a.price) - parseProductPrice(b.price),
      );
      break;
    case 'price-desc':
      sorted.sort(
        (a, b) => parseProductPrice(b.price) - parseProductPrice(a.price),
      );
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'rating':
    default:
      sorted.sort((a, b) => {
        const score = (p: ShowcaseProduct) =>
          (p.discountPercent ?? 0) + (p.defaultFavorite ? 10 : 0);
        return score(b) - score(a);
      });
      break;
  }
  return sorted;
}

export function paginateProducts<T>(
  items: T[],
  page: number,
  pageSize: number = PRODUCTS_PAGE_SIZE,
): { items: T[]; totalPages: number; page: number; total: number } {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    page: safePage,
    total,
  };
}

export function buildProductsHref(filters: ProductsListFilters = {}): string {
  const params = new URLSearchParams();
  if (filters.tab) params.set('tab', filters.tab);
  if (filters.category) params.set('category', filters.category);
  if (filters.sort && filters.sort !== 'rating')
    params.set('sort', filters.sort);
  if (filters.page && filters.page > 1)
    params.set('page', String(filters.page));
  if (filters.priceMin != null)
    params.set('priceMin', String(filters.priceMin));
  if (filters.priceMax != null)
    params.set('priceMax', String(filters.priceMax));
  if (filters.brands?.length) params.set('brand', filters.brands.join(','));
  if (filters.storageGb?.length) {
    params.set('storage', filters.storageGb.join(','));
  }
  const trimmedQuery = filters.q?.trim();
  if (trimmedQuery) params.set('q', trimmedQuery);
  const query = params.toString();
  return query ? `/products?${query}` : '/products';
}

export function parseProductsSearchParams(params: {
  category?: string;
  tab?: string;
  page?: string;
  sort?: string;
  priceMin?: string;
  priceMax?: string;
  brand?: string;
  storage?: string;
  q?: string;
}): ProductsListFilters & { sort: ProductSortId } {
  const sortValues: ProductSortId[] = [
    'rating',
    'price-asc',
    'price-desc',
    'name',
  ];
  const sort = sortValues.includes(params.sort as ProductSortId)
    ? (params.sort as ProductSortId)
    : 'rating';

  const page = Number.parseInt(params.page ?? '1', 10);
  const priceMin = Number.parseInt(params.priceMin ?? '', 10);
  const priceMax = Number.parseInt(params.priceMax ?? '', 10);

  return {
    category: params.category,
    tab: params.tab as ProductTabId | undefined,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    sort,
    priceMin: Number.isFinite(priceMin) ? priceMin : undefined,
    priceMax: Number.isFinite(priceMax) ? priceMax : undefined,
    brands: params.brand
      ? params.brand
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined,
    storageGb: params.storage
      ? params.storage
          .split(',')
          .map((s) => Number.parseInt(s.trim(), 10))
          .filter((n) => Number.isFinite(n))
      : undefined,
    q: params.q?.trim() || undefined,
  };
}

export function productsCategoryHref(slug: string) {
  return buildProductsHref({ category: slug });
}

export function productsTabHref(tab: ProductTabId) {
  return buildProductsHref({ tab });
}

export function isValidProductTab(
  landing: LandingContent,
  tab: string | undefined,
): tab is ProductTabId {
  if (!tab) return false;
  return landing.productTabs.some((t) => t.id === tab);
}

export function getProductTabLabel(
  landing: LandingContent,
  tabId: ProductTabId,
) {
  return landing.productTabs.find((t) => t.id === tabId)?.label ?? tabId;
}

export function isValidCategorySlug(
  landing: LandingContent,
  slug: string | undefined,
): slug is string {
  if (!slug) return false;
  return landing.categoryBarItems.some((c) => c.slug === slug);
}

export function getProductsForCategory(
  landing: LandingContent,
  categorySlug: string,
) {
  return getFilteredProducts(landing, { categorySlug });
}

export function getFilteredProducts(
  landing: LandingContent,
  filters: { categorySlug?: string; tabId?: ProductTabId },
  ctx?: ProductCatalogContext,
): ShowcaseProduct[] {
  const activeTab =
    filters.tabId && isValidProductTab(landing, filters.tabId)
      ? filters.tabId
      : undefined;

  let products = ctx
    ? [...ctx.products]
    : activeTab
      ? [...landing.productsByTab[activeTab]]
      : mergeUniqueProducts(landing);

  if (activeTab && ctx) {
    const tabIds = new Set(landing.productsByTab[activeTab].map((p) => p.id));
    products = products.filter((p) => tabIds.has(p.id));
  }

  const activeCategory =
    filters.categorySlug && isValidCategorySlug(landing, filters.categorySlug)
      ? filters.categorySlug
      : undefined;

  if (activeCategory) {
    products = products.filter((p) =>
      resolveCategorySlugs(p.id, ctx).includes(activeCategory),
    );
  }

  return products;
}

export function getListingProducts(
  landing: LandingContent,
  options: {
    categorySlug?: string;
    tabId?: ProductTabId;
    facetFilters?: ProductFacetFilters;
    sort?: ProductSortId;
    page?: number;
    pageSize?: number;
    q?: string;
  },
  ctx?: ProductCatalogContext,
) {
  const base = getFilteredProducts(
    landing,
    {
      categorySlug: options.categorySlug,
      tabId: options.tabId,
    },
    ctx,
  );
  const searched = filterProductsByQuery(base, options.q, ctx);
  const facets = getProductFacets(searched, ctx);
  const filtered = applyFacetFilters(searched, options.facetFilters ?? {}, ctx);
  const sorted = sortProducts(filtered, options.sort ?? 'rating');
  const paginated = paginateProducts(
    sorted,
    options.page ?? 1,
    options.pageSize ?? PRODUCTS_PAGE_SIZE,
  );

  return {
    facets,
    baseCount: base.length,
    filteredCount: filtered.length,
    ...paginated,
  };
}

const RELATED_PRODUCTS_LIMIT = 4;

/** Demo related items: same category first, then fill from catalog (excludes current). */
export function getRelatedProducts(
  landing: LandingContent,
  productId: string,
  limit = RELATED_PRODUCTS_LIMIT,
): ShowcaseProduct[] {
  const all = mergeUniqueProducts(landing);
  const categories = productCategorySlugsById[productId] ?? [];
  const categorySet = new Set(categories);

  const sameCategory = all.filter((p) => {
    if (p.id === productId) return false;
    if (categorySet.size === 0) return true;
    const slugs = productCategorySlugsById[p.id] ?? [];
    return slugs.some((slug) => categorySet.has(slug));
  });

  const picked: ShowcaseProduct[] = [];
  const seen = new Set<string>([productId]);

  for (const product of sameCategory) {
    if (picked.length >= limit) break;
    if (seen.has(product.id)) continue;
    seen.add(product.id);
    picked.push(product);
  }

  if (picked.length < limit) {
    for (const product of all) {
      if (picked.length >= limit) break;
      if (seen.has(product.id)) continue;
      seen.add(product.id);
      picked.push(product);
    }
  }

  return picked;
}
