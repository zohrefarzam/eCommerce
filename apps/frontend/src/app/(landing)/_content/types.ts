import type { ImageSource } from '@/lib/image-source';

export type ProductTabId = 'new' | 'bestseller' | 'featured';

export type ShowcaseProduct = {
  id: string;
  name: string;
  price: string;
  compareAtPrice?: string;
  discountPercent?: number;
  image: string;
  imageAlt: string;
  defaultFavorite?: boolean;
};

export type ServiceHighlight = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type NewArrivalCategory = {
  slug: string;
  title: string;
  description: string;
  image: ImageSource;
  imageAlt: string;
  href: string;
};

export type LandingContent = {
  navLinks: readonly { href: string; label: string }[];
  footerContent: {
    brand: string;
    tagline: string;
    columns: readonly {
      title: string;
      links: readonly { href: string; label: string }[];
    }[];
    contact: { phone: string; email: string; address: string };
    social: readonly { href: string; label: string; icon: string }[];
    legal: readonly { href: string; label: string }[];
    copyright: string;
  };
  categoryBarItems: readonly { slug: string; label: string }[];
  browseCategories: readonly { slug: string; label: string; icon: string }[];
  productTabs: readonly { id: ProductTabId; label: string }[];
  productsByTab: Record<ProductTabId, ShowcaseProduct[]>;
  cardSwapSection: {
    title: string;
    description: string;
    cta: string;
    href: string;
    ariaLabel: string;
  };
  cardSwapPromos: readonly {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    cta: string;
    href: string;
  }[];
  newArrivalSection: {
    eyebrow: string;
    title: string;
    shopNowLabel: string;
  };
  newArrivalCategories: NewArrivalCategory[];
  serviceHighlights: readonly ServiceHighlight[];
  categoryBrowse: {
    title: string;
    prevLabel: string;
    nextLabel: string;
    categoriesAriaLabel: string;
  };
  serviceHighlightsAria: string;
  home: {
    newProductsEyebrow: string;
    newProductsTitle: string;
    bestsellersEyebrow: string;
    bestsellersTitle: string;
    viewAll: string;
  };
  promoBanners: readonly {
    id: string;
    title: string;
    description: string;
    align: 'image-start' | 'image-end';
    tone: 'light' | 'muted';
    cta?: string;
  }[];
};
