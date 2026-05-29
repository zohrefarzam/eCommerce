'use client';

import { I18nProvider } from '@heroui/react';
import { LocaleProvider, useLocale, type Locale } from '@/i18n';
import { AuthProvider } from '@/providers/auth-provider';

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
      <AuthProvider>
        <HeroUiLocaleBridge>{children}</HeroUiLocaleBridge>
      </AuthProvider>
    </LocaleProvider>
  );
}
