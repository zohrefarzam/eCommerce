import type { Locale } from '@/i18n/config';
import type { ImageSource } from '@/lib/image-source';
import iphoneBannerFa from '@/assets/images/banner/iphone-banner.png';
import summerBannerFa from '@/assets/images/banner/summer-banner.png';
import iphoneBannerEn from '@/assets/images/banner/en/iphone14-en.png';
import summerBannerEn from '@/assets/images/banner/en/summer-en.png';

export type CarouselBanner = {
  src: ImageSource;
  alt: string;
};

const carouselBannersByLocale: Record<Locale, CarouselBanner[]> = {
  en: [
    { src: iphoneBannerEn, alt: 'iPhone 14' },
    { src: summerBannerEn, alt: 'Summer sale' },
  ],
  fa: [
    { src: iphoneBannerFa, alt: 'آیفون ۱۴' },
    { src: summerBannerFa, alt: 'حراج تابستانه' },
  ],
};

export function getCarouselBanners(locale: Locale): CarouselBanner[] {
  return carouselBannersByLocale[locale];
}
