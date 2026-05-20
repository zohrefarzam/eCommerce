import type { Locale } from './config';

export type Messages = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brand: string;
    search: string;
    notifications: string;
    cart: string;
    account: string;
    switchToEnglish: string;
    switchToPersian: string;
  };
  productCard: {
    buy: string;
    view: string;
    addToWishlist: string;
    removeFromWishlist: string;
    discountLabel: (percent: number) => string;
  };
};

const fa: Messages = {
  meta: {
    title: 'رهپویان | فروشگاه',
    description: 'فروشگاه آنلاین محصولات دیجیتال',
  },
  header: {
    brand: 'رهپویان',
    search: 'جستجو',
    notifications: 'اعلان‌ها',
    cart: 'سبد خرید',
    account: 'حساب کاربری',
    switchToEnglish: 'English',
    switchToPersian: 'فارسی',
  },
  productCard: {
    buy: 'افزودن به سبد',
    view: 'مشاهده محصول',
    addToWishlist: 'افزودن به علاقه‌مندی',
    removeFromWishlist: 'حذف از علاقه‌مندی',
    discountLabel: (percent) => `${percent}٪ تخفیف`,
  },
};

const en: Messages = {
  meta: {
    title: 'Rahpoyan | Store',
    description: 'Online store for digital products',
  },
  header: {
    brand: 'Rahpoyan',
    search: 'Search',
    notifications: 'Notifications',
    cart: 'Cart',
    account: 'Account',
    switchToEnglish: 'English',
    switchToPersian: 'فارسی',
  },
  productCard: {
    buy: 'Add to cart',
    view: 'View product',
    addToWishlist: 'Add to wishlist',
    removeFromWishlist: 'Remove from wishlist',
    discountLabel: (percent) => `${percent}% off`,
  },
};

const messagesByLocale: Record<Locale, Messages> = { fa, en };

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale];
}
