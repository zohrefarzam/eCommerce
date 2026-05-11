"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { navLinks } from "@/content/landing";

const iconMuted = "text-muted shrink-0";
const iconNav = "shrink-0";

export function MarketingHeader() {
  return (
    <header className="w-full bg-background py-4">
      <div className="flex w-full flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
          prefetch={false}
        >
          cyber
        </Link>

        <div className="order-last flex w-full max-w-md flex-1 sm:order-none sm:max-w-none sm:px-4 lg:max-w-md">
          <label className="relative w-full">
            <span className="sr-only">جستجو</span>
            <span
              className="pointer-events-none absolute inset-y-0 flex items-center ps-3 text-muted"
              aria-hidden
            >
              <Icon
                icon="lucide:search"
                width={18}
                height={18}
                className={iconMuted}
                aria-hidden
              />
            </span>
            <input
              type="search"
              placeholder="جستجو"
              className="w-full rounded-lg border border-transparent bg-surface-secondary py-2.5 pe-3 ps-10 text-sm text-foreground outline-none ring-foreground/15 transition placeholder:text-muted focus:ring-2"
            />
          </label>
        </div>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition hover:text-foreground"
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-foreground">
          <IconButton label="علاقه‌مندی‌ها">
            <Icon
              icon="lucide:heart"
              width={22}
              height={22}
              className={iconNav}
              aria-hidden
            />
          </IconButton>
          <IconButton label="سبد خرید">
            <Icon
              icon="lucide:shopping-cart"
              width={22}
              height={22}
              className={iconNav}
              aria-hidden
            />
          </IconButton>
          <IconButton label="حساب کاربری">
            <Icon
              icon="lucide:user"
              width={22}
              height={22}
              className={iconNav}
              aria-hidden
            />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="rounded-lg p-2 text-foreground transition hover:bg-surface-secondary"
    >
      {children}
    </button>
  );
}
