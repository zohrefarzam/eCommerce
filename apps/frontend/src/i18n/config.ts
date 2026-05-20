export const locales = ['fa', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

export const LOCALE_COOKIE = 'locale';

export type LocaleConfig = {
  locale: Locale;
  lang: string;
  dir: 'rtl' | 'ltr';
  herouiLocale: string;
};

const localeConfigMap: Record<Locale, Omit<LocaleConfig, 'locale'>> = {
  fa: { lang: 'fa', dir: 'rtl', herouiLocale: 'fa-IR' },
  en: { lang: 'en', dir: 'ltr', herouiLocale: 'en-US' },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'fa' || value === 'en';
}

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return { locale, ...localeConfigMap[locale] };
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function getLocaleFromCookie(cookieStore: {
  get: (name: string) => { value: string } | undefined;
}): Locale {
  return resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
}
