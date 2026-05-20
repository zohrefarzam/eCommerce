'use client';

import { I18nProvider } from '@heroui/react';
import { LocaleProvider, useLocale, type Locale } from '@/i18n';

type ProvidersProps = {
  children: React.ReactNode;
  locale: Locale;
};

function HeroUiLocaleBridge({ children }: { children: React.ReactNode }) {
  const { config } = useLocale();
  return <I18nProvider locale={config.herouiLocale}>{children}</I18nProvider>;
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <LocaleProvider initialLocale={locale}>
      <HeroUiLocaleBridge>{children}</HeroUiLocaleBridge>
    </LocaleProvider>
  );
}
