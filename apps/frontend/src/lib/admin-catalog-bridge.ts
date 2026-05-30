import type { ShowcaseProduct } from '@/landing/_content/types';
import type { AdminProduct } from '@/lib/admin-products-store';
import type {
  ProductCatalogContext,
  ProductCatalogMeta,
} from '@/lib/product-catalog';
import { getListingProducts } from '@/lib/product-catalog';
import type { LandingContent } from '@/landing/_content/types';
import type { Locale } from '@/i18n/config';
import type { ProductDetail } from '@/lib/product-detail';
import { gallerySourceForCardImage } from '@/landing/_content/shared';

const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

export function adminProductToShowcase(product: AdminProduct): ShowcaseProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.imageUrl || DEFAULT_PRODUCT_IMAGE,
    imageAlt: product.name,
  };
}

export function buildAdminCatalogContext(
  adminProducts: AdminProduct[],
): ProductCatalogContext {
  const metaById = new Map<string, ProductCatalogMeta>();
  const categorySlugsById = new Map<string, readonly string[]>();

  for (const product of adminProducts) {
    if (product.brand.trim()) {
      metaById.set(product.id, { brand: product.brand.trim() });
    }
    if (product.categorySlug) {
      categorySlugsById.set(product.id, [product.categorySlug]);
    }
  }

  return {
    products: adminProducts.map(adminProductToShowcase),
    metaById,
    categorySlugsById,
  };
}

export function getAdminStorefrontListing(
  landing: LandingContent,
  adminProducts: AdminProduct[],
  options: Parameters<typeof getListingProducts>[1],
) {
  return getListingProducts(
    landing,
    options,
    buildAdminCatalogContext(adminProducts),
  );
}

export function getAdminProductDetail(
  adminProduct: AdminProduct,
  landing: LandingContent,
  locale: Locale,
): ProductDetail {
  const product = adminProductToShowcase(adminProduct);
  const isFa = locale === 'fa';
  const brand = adminProduct.brand.trim();
  const categorySlug = adminProduct.categorySlug || undefined;
  const categoryLabel = categorySlug
    ? landing.categoryBarItems.find((item) => item.slug === categorySlug)?.label
    : undefined;
  const imageSrc = product.image.startsWith('data:')
    ? product.image
    : gallerySourceForCardImage(product.image);

  return {
    product,
    displayName: product.name,
    gallery: [{ src: imageSrc, alt: product.imageAlt }],
    colors: [],
    defaultColorId: '',
    storageOptions: [
      {
        gb: 128,
        label: isFa ? '۱۲۸ گیگابایت' : '128GB',
      },
    ],
    defaultStorageGb: 128,
    highlights: [
      {
        icon: 'lucide:package',
        label: isFa ? 'برند' : 'Brand',
        value: brand || (isFa ? 'نامشخص' : '—'),
      },
    ],
    shortDescription: isFa
      ? `${product.name} — محصول افزوده‌شده از پنل مدیریت.`
      : `${product.name} — added from the admin panel.`,
    detailsIntro: isFa
      ? 'این محصول از پنل مدیریت فروشگاه ثبت شده است.'
      : 'This product was created in the store admin panel.',
    detailSections: [],
    moreDetailSections: [],
    trustBadges: [
      {
        icon: 'lucide:truck',
        title: isFa ? 'ارسال سریع' : 'Fast delivery',
        subtitle: isFa ? '۲–۴ روز' : '2–4 days',
      },
      {
        icon: 'lucide:package-check',
        title: isFa ? 'موجود' : 'In stock',
        subtitle: isFa ? 'همین امروز' : 'Today',
      },
    ],
    categorySlug,
    brandLabel: brand || categoryLabel,
  };
}

export function findAdminProductById(
  adminProducts: AdminProduct[],
  id: string,
): AdminProduct | undefined {
  return adminProducts.find((product) => product.id === id);
}

export function resolveStorefrontProductDetail(
  landing: LandingContent,
  locale: Locale,
  productId: string,
  adminProducts: AdminProduct[],
  landingDetail: ProductDetail | null,
): ProductDetail | null {
  const adminProduct = findAdminProductById(adminProducts, productId);
  if (!adminProduct) return landingDetail;

  const showcase = adminProductToShowcase(adminProduct);
  if (!landingDetail) {
    return getAdminProductDetail(adminProduct, landing, locale);
  }

  const imageChanged = showcase.image !== landingDetail.product.image;
  const gallery = imageChanged
    ? [
        {
          src: showcase.image.startsWith('data:')
            ? showcase.image
            : gallerySourceForCardImage(showcase.image),
          alt: showcase.imageAlt,
        },
      ]
    : landingDetail.gallery;

  return {
    ...landingDetail,
    product: showcase,
    displayName: showcase.name,
    gallery,
    brandLabel: adminProduct.brand.trim() || landingDetail.brandLabel,
    categorySlug: adminProduct.categorySlug || landingDetail.categorySlug,
  };
}
