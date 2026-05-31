'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useLandingContent } from '@/i18n';
import { STOREFRONT_CONTENT_FRAME } from '@/app/(landing)/_lib/storefront-layout';

export function SiteFooter() {
  const { footerContent } = useLandingContent();
  const { brand, tagline, columns, contact, social, legal, copyright } =
    footerContent;

  return (
    <footer className="mt-auto w-full bg-foreground text-background">
      <div className={`${STOREFRONT_CONTENT_FRAME} py-8 sm:py-14`}>
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))] lg:gap-8">
          <div className="flex flex-col items-center gap-3 text-center sm:col-span-2 sm:items-start sm:gap-4 sm:text-start lg:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-background sm:text-xl"
              prefetch={false}
            >
              {brand}
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-background/70">
              {tagline}
            </p>
            <ul className="flex w-full max-w-xs flex-col gap-2 text-sm text-background/80 sm:max-w-none">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Icon
                  icon="lucide:phone"
                  width={16}
                  height={16}
                  className="shrink-0 text-background/60"
                  aria-hidden
                />
                <a
                  href={`tel:${contact.phone.replace(/\D/g, '')}`}
                  className="transition hover:text-background"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Icon
                  icon="lucide:mail"
                  width={16}
                  height={16}
                  className="shrink-0 text-background/60"
                  aria-hidden
                />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition hover:text-background"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <Icon
                  icon="lucide:map-pin"
                  width={16}
                  height={16}
                  className="mt-0.5 shrink-0 text-background/60"
                  aria-hidden
                />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>

          <div className="col-span-full grid grid-cols-2 gap-x-6 gap-y-6 text-center sm:contents sm:text-start">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-3 text-sm font-bold text-background sm:mb-4">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-2 sm:gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="text-sm text-background/70 transition hover:text-background"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5 border-t border-background/15 pt-6 text-center sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-8 sm:text-start">
          <p className="text-xs text-background/60 sm:text-sm">{copyright}</p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <nav
              aria-label="Social"
              className="flex items-center justify-center gap-1 sm:gap-2"
            >
              {social.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="rounded-lg p-2 text-background/70 transition hover:bg-background/10 hover:text-background"
                >
                  <Icon icon={item.icon} width={20} height={20} aria-hidden />
                </a>
              ))}
            </nav>

            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center justify-center gap-3 text-sm sm:justify-start sm:gap-4"
            >
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className="text-background/60 transition hover:text-background"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
