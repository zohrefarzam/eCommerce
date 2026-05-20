'use client';

import { useLocale, type Locale } from '@/i18n';

export function LanguageSwitch() {
  const { locale, setLocale, messages } = useLocale();

  const nextLocale: Locale = locale === 'fa' ? 'en' : 'fa';
  const label =
    nextLocale === 'en'
      ? messages.header.switchToEnglish
      : messages.header.switchToPersian;

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      className="rounded-lg border border-foreground/15 px-2.5 py-1.5 text-xs font-semibold tracking-wide text-foreground transition hover:bg-surface-secondary sm:px-3 sm:text-sm"
      aria-label={label}
    >
      {nextLocale === 'en' ? 'EN' : 'FA'}
    </button>
  );
}
