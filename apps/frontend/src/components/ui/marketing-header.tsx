'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/base/input';
import { AccountNav } from '@/components/ui/account-nav';
import { CartNavDropdown } from '@/components/ui/cart-nav-dropdown';
import { LanguageSwitch } from '@/components/ui/language-switch';
import { useLocale } from '@/i18n';
import { buildProductsHref } from '@/lib/product-catalog';
import { STOREFRONT_CONTENT_FRAME } from '@/lib/storefront-layout';

const iconMuted = 'text-muted shrink-0';
const iconNav = 'shrink-0';

export function MarketingHeader() {
  const { messages } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (pathname === '/products') {
      setQuery(searchParams.get('q') ?? '');
    }
  }, [pathname, searchParams]);

  const submitSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      router.push(
        trimmed
          ? buildProductsHref({ q: trimmed, page: 1 })
          : buildProductsHref({ page: 1 }),
      );
    },
    [router],
  );

  const searchInput = (
    <form
      className="w-full min-w-0"
      onSubmit={(event) => {
        event.preventDefault();
        submitSearch(query);
      }}
    >
      <Input
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={messages.header.search}
        aria-label={messages.header.search}
        startContent={
          <Icon
            icon="lucide:search"
            width={18}
            height={18}
            className={iconMuted}
            aria-hidden
          />
        }
      />
    </form>
  );

  return (
    <header className="w-full min-w-0 bg-background py-3 sm:py-4">
      <div
        className={`${STOREFRONT_CONTENT_FRAME} flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4`}
      >
        <div className="flex min-w-0 items-center justify-between gap-2 sm:min-w-0 sm:flex-1 sm:justify-start sm:gap-8">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-foreground sm:text-xl"
            prefetch={false}
          >
            {messages.header.brand}
          </Link>

          <HeaderActions className="sm:hidden" />

          <div className="hidden min-w-0 flex-1 sm:block sm:max-w-xl">
            {searchInput}
          </div>
        </div>

        <HeaderActions className="hidden sm:flex" />

        <div className="w-full min-w-0 sm:hidden">{searchInput}</div>
      </div>
    </header>
  );
}

function HeaderActions({ className }: { className?: string }) {
  const { messages } = useLocale();

  return (
    <div
      className={`flex shrink-0 items-center gap-0.5 text-foreground sm:gap-3 ${className ?? ''}`}
    >
      <LanguageSwitch />
      <IconButton label={messages.header.notifications}>
        <Icon
          icon="lucide:bell"
          width={22}
          height={22}
          className={iconNav}
          aria-hidden
        />
      </IconButton>
      <CartNavDropdown />
      <AccountNav />
    </div>
  );
}

function IconButton({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`rounded-lg p-2 text-foreground transition hover:bg-surface-secondary ${className ?? ''}`}
    >
      {children}
    </button>
  );
}
