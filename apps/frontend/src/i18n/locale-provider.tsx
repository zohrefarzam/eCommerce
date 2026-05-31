'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { getLandingContent } from '@/landing/_content';
import type { LandingContent } from '@/landing/_content/types';
import {
  getLocaleConfig,
  LOCALE_COOKIE,
  type Locale,
  type LocaleConfig,
} from './config';
import { getMessages, type Messages } from './messages';

type LocaleContextValue = {
  locale: Locale;
  config: LocaleConfig;
  messages: Messages;
  landing: LandingContent;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

function applyDocumentLocale(config: LocaleConfig) {
  const root = document.documentElement;
  root.lang = config.lang;
  root.dir = config.dir;
}

type LocaleProviderProps = {
  children: React.ReactNode;
  initialLocale: Locale;
};

export function LocaleProvider({
  children,
  initialLocale,
}: LocaleProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const config = useMemo(() => getLocaleConfig(locale), [locale]);
  const messages = useMemo(() => getMessages(locale), [locale]);
  const landing = useMemo(() => getLandingContent(locale), [locale]);

  useEffect(() => {
    applyDocumentLocale(config);
  }, [config]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      setLocaleCookie(next);
      setLocaleState(next);
      applyDocumentLocale(getLocaleConfig(next));
      router.refresh();
    },
    [locale, router],
  );

  const value = useMemo(
    () => ({ locale, config, messages, landing, setLocale }),
    [locale, config, messages, landing, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}

export function useLandingContent(): LandingContent {
  return useLocale().landing;
}
