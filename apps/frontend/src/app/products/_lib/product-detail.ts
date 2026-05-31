import type { Locale } from '@/i18n/config';
import type { LandingContent, ShowcaseProduct } from '@/landing/_content/types';
import {
  gallerySourceForCardImage,
  phoneGalleryImageSources,
  productGallerySources,
} from '@/landing/_content/shared';
import type { ImageSource } from '@/components/base/_lib/image-source';
import {
  getProductMeta,
  mergeUniqueProducts,
  productCategorySlugsById,
} from '@/app/products/_lib/product-catalog';

export type ProductColorOption = {
  id: string;
  label: string;
  hex: string;
};

export type ProductStorageOption = {
  gb: number;
  label: string;
};

export type ProductHighlightSpec = {
  icon: string;
  label: string;
  value: string;
};

export type ProductDetailRow = {
  label: string;
  value: string | readonly string[];
};

export type ProductDetailSection = {
  id: string;
  title: string;
  rows: readonly ProductDetailRow[];
};

export type ProductTrustBadge = {
  icon: string;
  title: string;
  subtitle: string;
};

export type ProductGalleryImage = {
  src: ImageSource;
  alt: string;
};

export type ProductDetail = {
  product: ShowcaseProduct;
  displayName: string;
  gallery: readonly ProductGalleryImage[];
  colors: readonly ProductColorOption[];
  defaultColorId: string;
  storageOptions: readonly ProductStorageOption[];
  defaultStorageGb: number;
  highlights: readonly ProductHighlightSpec[];
  shortDescription: string;
  detailsIntro: string;
  detailSections: readonly ProductDetailSection[];
  moreDetailSections: readonly ProductDetailSection[];
  trustBadges: readonly ProductTrustBadge[];
  categorySlug?: string;
  brandLabel?: string;
};

type ProductDetailOverlay = Omit<
  ProductDetail,
  'product' | 'displayName' | 'categorySlug' | 'brandLabel'
> & {
  displayName?: string;
};

function findProductById(
  landing: LandingContent,
  id: string,
): ShowcaseProduct | undefined {
  return mergeUniqueProducts(landing).find((p) => p.id === id);
}

export function getProductById(
  landing: LandingContent,
  id: string,
): ShowcaseProduct | undefined {
  return findProductById(landing, id);
}

export function productDetailHref(id: string) {
  return `/products/${id}`;
}

function buildPhoneGallery(alt: string): ProductGalleryImage[] {
  const sources = phoneGalleryImageSources();
  return sources.map((src, index) => ({
    src,
    alt: index === 0 ? alt : `${alt} — ${index + 1}`,
  }));
}

function buildProductGallery(product: ShowcaseProduct): ProductGalleryImage[] {
  const categorySlug = productCategorySlugsById[product.id]?.[0];
  if (categorySlug === 'phones') {
    return buildPhoneGallery(product.imageAlt);
  }
  const src = gallerySourceForCardImage(product.image);
  return [{ src, alt: product.imageAlt }];
}

const detailOverlays: Record<
  Locale,
  Partial<Record<string, ProductDetailOverlay>>
> = {
  en: {
    b5: {
      displayName: 'Apple iPhone 14 Pro Max',
      gallery: buildPhoneGallery('Apple iPhone 14 Pro Max'),
      colors: [
        { id: 'black', label: 'Black', hex: '#1c1c1e' },
        { id: 'purple', label: 'Purple', hex: '#5e5ce6' },
        { id: 'red', label: 'Red', hex: '#ff3b30' },
        { id: 'yellow', label: 'Yellow', hex: '#f5d76e' },
        { id: 'silver', label: 'Silver', hex: '#e3e4e6' },
      ],
      defaultColorId: 'purple',
      storageOptions: [
        { gb: 128, label: '128GB' },
        { gb: 256, label: '256GB' },
        { gb: 512, label: '512GB' },
        { gb: 1024, label: '1TB' },
      ],
      defaultStorageGb: 1024,
      highlights: [
        { icon: 'lucide:smartphone', label: 'Screen size', value: '6.7"' },
        { icon: 'lucide:cpu', label: 'CPU', value: 'Apple A16 Bionic' },
        { icon: 'lucide:layers', label: 'Number of Cores', value: '6' },
        { icon: 'lucide:camera', label: 'Main camera', value: '48-12-12 MP' },
        { icon: 'lucide:scan-face', label: 'Front camera', value: '12 MP' },
        {
          icon: 'lucide:battery-full',
          label: 'Battery capacity',
          value: '4323 mAh',
        },
      ],
      shortDescription:
        'Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging throughout the day. Incredible photos as in bright, sunny weather, and in low light thanks to the new system with two cameras.',
      detailsIntro:
        'The iPhone 14 Pro Max display has rounded corners that follow a curved design. The screen is 6.7 inches diagonally with OLED technology, ProMotion, and Always-On display.',
      detailSections: [
        {
          id: 'screen',
          title: 'Screen',
          rows: [
            { label: 'Screen diagonal', value: '6.7"' },
            { label: 'The screen resolution', value: '2796×1290' },
            { label: 'The screen refresh rate', value: '120 Hz' },
            { label: 'The pixel density', value: '460 ppi' },
            { label: 'Screen type', value: 'OLED' },
            {
              label: 'Additionally',
              value: [
                'Dynamic Island',
                'Always-On display',
                'HDR display',
                'True Tone',
                'Wide color (P3)',
              ],
            },
          ],
        },
        {
          id: 'cpu',
          title: 'CPU',
          rows: [
            { label: 'CPU', value: 'A16 Bionic' },
            { label: 'Number of cores', value: '6' },
          ],
        },
      ],
      moreDetailSections: [
        {
          id: 'camera',
          title: 'Camera',
          rows: [
            { label: 'Main camera', value: '48 MP + 12 MP + 12 MP' },
            { label: 'Front camera', value: '12 MP' },
            { label: 'Video', value: '4K Dolby Vision HDR' },
          ],
        },
        {
          id: 'battery',
          title: 'Battery',
          rows: [
            { label: 'Capacity', value: '4323 mAh' },
            { label: 'Charging', value: 'MagSafe, wireless, USB-C' },
          ],
        },
      ],
      trustBadges: [
        {
          icon: 'lucide:truck',
          title: 'Free Delivery',
          subtitle: '1–2 day',
        },
        { icon: 'lucide:package-check', title: 'In Stock', subtitle: 'Today' },
        {
          icon: 'lucide:shield-check',
          title: 'Guaranteed',
          subtitle: '1 year',
        },
      ],
    },
  },
  fa: {
    b5: {
      displayName: 'اپل آیفون ۱۴ پرو مکس',
      gallery: buildPhoneGallery('اپل آیفون ۱۴ پرو مکس'),
      colors: [
        { id: 'black', label: 'مشکی', hex: '#1c1c1e' },
        { id: 'purple', label: 'بنفش', hex: '#5e5ce6' },
        { id: 'red', label: 'قرمز', hex: '#ff3b30' },
        { id: 'yellow', label: 'زرد', hex: '#f5d76e' },
        { id: 'silver', label: 'نقره‌ای', hex: '#e3e4e6' },
      ],
      defaultColorId: 'purple',
      storageOptions: [
        { gb: 128, label: '۱۲۸ گیگابایت' },
        { gb: 256, label: '۲۵۶ گیگابایت' },
        { gb: 512, label: '۵۱۲ گیگابایت' },
        { gb: 1024, label: '۱ ترابایت' },
      ],
      defaultStorageGb: 1024,
      highlights: [
        { icon: 'lucide:smartphone', label: 'اندازه صفحه', value: '۶.۷ اینچ' },
        { icon: 'lucide:cpu', label: 'پردازنده', value: 'Apple A16 Bionic' },
        { icon: 'lucide:layers', label: 'تعداد هسته', value: '۶' },
        {
          icon: 'lucide:camera',
          label: 'دوربین اصلی',
          value: '۴۸-۱۲-۱۲ مگاپیکسل',
        },
        {
          icon: 'lucide:scan-face',
          label: 'دوربین سلفی',
          value: '۱۲ مگاپیکسل',
        },
        {
          icon: 'lucide:battery-full',
          label: 'ظرفیت باتری',
          value: '۴۳۲۳ میلی‌آمپر',
        },
      ],
      shortDescription:
        'قابلیت‌های پیشرفته با نمایشگر ۶.۷ اینچی و استفاده تمام‌روز بدون نیاز به شارژ مجدد. عکس‌های خیره‌کننده در نور روز و شرایط کم‌نور با سیستم دوربین دوگانهٔ جدید.',
      detailsIntro:
        'نمایشگر آیفون ۱۴ پرو مکس گوشه‌های گرد دارد. اندازهٔ صفحه ۶.۷ اینچ با فناوری OLED، ProMotion و Always-On است.',
      detailSections: [
        {
          id: 'screen',
          title: 'صفحه نمایش',
          rows: [
            { label: 'اندازه صفحه', value: '۶.۷ اینچ' },
            { label: 'رزولوشن', value: '۲۷۹۶×۱۲۹۰' },
            { label: 'نرخ نوسازی', value: '۱۲۰ هرتز' },
            { label: 'تراکم پیکسل', value: '۴۶۰ ppi' },
            { label: 'نوع صفحه', value: 'OLED' },
            {
              label: 'سایر ویژگی‌ها',
              value: [
                'Dynamic Island',
                'Always-On display',
                'HDR display',
                'True Tone',
                'Wide color (P3)',
              ],
            },
          ],
        },
        {
          id: 'cpu',
          title: 'پردازنده',
          rows: [
            { label: 'CPU', value: 'A16 Bionic' },
            { label: 'تعداد هسته', value: '۶' },
          ],
        },
      ],
      moreDetailSections: [
        {
          id: 'camera',
          title: 'دوربین',
          rows: [
            { label: 'دوربین اصلی', value: '۴۸ + ۱۲ + ۱۲ مگاپیکسل' },
            { label: 'دوربین سلفی', value: '۱۲ مگاپیکسل' },
            { label: 'ویدیو', value: '4K Dolby Vision HDR' },
          ],
        },
        {
          id: 'battery',
          title: 'باتری',
          rows: [
            { label: 'ظرفیت', value: '۴۳۲۳ میلی‌آمپر' },
            { label: 'شارژ', value: 'MagSafe، بی‌سیم، USB-C' },
          ],
        },
      ],
      trustBadges: [
        {
          icon: 'lucide:truck',
          title: 'ارسال رایگان',
          subtitle: '۱–۲ روز',
        },
        { icon: 'lucide:package-check', title: 'موجود', subtitle: 'امروز' },
        {
          icon: 'lucide:shield-check',
          title: 'گارانتی',
          subtitle: '۱ سال',
        },
      ],
    },
  },
};

function buildFallbackDetail(
  product: ShowcaseProduct,
  locale: Locale,
): ProductDetail {
  const meta = getProductMeta(product.id);
  const categorySlug = productCategorySlugsById[product.id]?.[0];
  const storageGb = meta?.storageGb ?? 128;

  const isFa = locale === 'fa';
  const storageOptions: ProductStorageOption[] = [
    { gb: storageGb, label: isFa ? `${storageGb} گیگابایت` : `${storageGb}GB` },
  ];

  return {
    product,
    displayName: product.name,
    gallery: buildProductGallery(product),
    colors: [],
    defaultColorId: '',
    storageOptions,
    defaultStorageGb: storageGb,
    highlights: [
      {
        icon: 'lucide:package',
        label: isFa ? 'برند' : 'Brand',
        value: meta?.brand ?? (isFa ? 'نامشخص' : '—'),
      },
      {
        icon: 'lucide:hard-drive',
        label: isFa ? 'حافظه' : 'Storage',
        value: storageOptions[0]?.label ?? '—',
      },
    ],
    shortDescription: isFa
      ? `${product.name} با کیفیت ساخت بالا و عملکرد روزمرهٔ قابل اعتماد.`
      : `${product.name} with reliable everyday performance and premium build quality.`,
    detailsIntro: isFa
      ? 'مشخصات کامل این محصول به‌زودی در فروشگاه منتشر می‌شود.'
      : 'Full specifications for this product will be published in the store soon.',
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
    brandLabel: meta?.brand,
  };
}

export function getProductDetail(
  landing: LandingContent,
  locale: Locale,
  id: string,
): ProductDetail | null {
  const product = findProductById(landing, id);
  if (!product) return null;

  const overlay = detailOverlays[locale][id];
  const meta = getProductMeta(id);
  const categorySlug = productCategorySlugsById[id]?.[0];
  const categoryLabel = categorySlug
    ? landing.categoryBarItems.find((c) => c.slug === categorySlug)?.label
    : undefined;

  if (!overlay) {
    const fallback = buildFallbackDetail(product, locale);
    return { ...fallback, brandLabel: meta?.brand ?? categoryLabel };
  }

  return {
    product,
    displayName: overlay.displayName ?? product.name,
    gallery: overlay.gallery,
    colors: overlay.colors,
    defaultColorId: overlay.defaultColorId,
    storageOptions: overlay.storageOptions,
    defaultStorageGb: overlay.defaultStorageGb,
    highlights: overlay.highlights,
    shortDescription: overlay.shortDescription,
    detailsIntro: overlay.detailsIntro,
    detailSections: overlay.detailSections,
    moreDetailSections: overlay.moreDetailSections,
    trustBadges: overlay.trustBadges,
    categorySlug,
    brandLabel: meta?.brand ?? categoryLabel,
  };
}
