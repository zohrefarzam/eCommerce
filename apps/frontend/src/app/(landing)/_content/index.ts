import type { Locale } from '@/i18n/config';
import { enLandingContent } from './en';
import { faLandingContent } from './fa';

export type {
  LandingContent,
  NewArrivalCategory,
  ProductTabId,
  ServiceHighlight,
  ShowcaseProduct,
} from './types';
export { productImageUrls } from './shared';

const landingByLocale = {
  fa: faLandingContent,
  en: enLandingContent,
} as const;

export function getLandingContent(locale: Locale) {
  return landingByLocale[locale];
}

/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const navLinks = faLandingContent.navLinks;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const footerContent = faLandingContent.footerContent;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const categoryBarItems = faLandingContent.categoryBarItems;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const browseCategories = faLandingContent.browseCategories;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const productTabs = faLandingContent.productTabs;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const productsByTab = faLandingContent.productsByTab;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const cardSwapSection = faLandingContent.cardSwapSection;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const cardSwapPromos = faLandingContent.cardSwapPromos;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const newArrivalSection = faLandingContent.newArrivalSection;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const newArrivalCategories = faLandingContent.newArrivalCategories;
/** @deprecated Use `getLandingContent(locale)` or `useLandingContent()` instead. */
export const serviceHighlights = faLandingContent.serviceHighlights;
