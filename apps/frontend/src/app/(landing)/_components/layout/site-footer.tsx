import { Icon } from '@iconify/react';
import Link from 'next/link';
import { footerContent } from '@/landing/_content/landing';
import { STOREFRONT_CONTENT_FRAME } from '@/landing/_components/layout/site-shell';

export function SiteFooter() {
  const { brand, tagline, columns, contact, social, legal, copyright } =
    footerContent;

  return (
    <footer className="mt-auto w-full bg-foreground text-background">
      <div className={`${STOREFRONT_CONTENT_FRAME} py-12 sm:py-14`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-background"
              prefetch={false}
            >
              {brand}
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-background/70">
              {tagline}
            </p>
            <ul className="flex flex-col gap-2 text-sm text-background/80">
              <li className="flex items-center gap-2">
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
              <li className="flex items-center gap-2">
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
              <li className="flex items-start gap-2">
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

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-bold text-background">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
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

        <div className="mt-10 flex flex-col gap-6 border-t border-background/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-background/60">{copyright}</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <nav
              aria-label="شبکه‌های اجتماعی"
              className="flex items-center gap-2"
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
              aria-label="قوانین"
              className="flex flex-wrap items-center gap-4 text-sm"
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
