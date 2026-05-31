'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ADMIN_NAV } from '@/app/admin/_lib/admin-nav';
import { useLocale } from '@/i18n';
import { cn } from '@/components/base/_lib/utils';
import { useAuth } from '@/providers/auth-provider';

const ACTIVE_BAR = 'border-s-2 border-foreground';

type AdminSidebarLinkProps = {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
};

function AdminSidebarLink({
  href,
  icon,
  label,
  isActive,
}: AdminSidebarLinkProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        'flex items-center gap-3 px-4 py-3.5 text-sm transition',
        isActive
          ? cn(ACTIVE_BAR, 'bg-surface-secondary font-semibold text-foreground')
          : 'text-foreground hover:bg-surface-secondary/80',
      )}
    >
      <Icon
        icon={icon}
        width={20}
        height={20}
        className={cn('shrink-0', isActive ? 'text-foreground' : 'text-muted')}
        aria-hidden
      />
      <span>{label}</span>
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { messages } = useLocale();
  const { user, signOut } = useAuth();
  const labels = messages.admin;

  const handleSignOut = () => {
    signOut();
    router.refresh();
    router.push('/');
  };

  return (
    <aside className="flex flex-col overflow-hidden rounded-2xl border border-muted/20 bg-surface">
      <div className="border-b border-muted/15 px-5 py-5">
        <p className="text-base font-bold text-foreground">
          {labels.panelTitle}
        </p>
        <p className="mt-1 truncate text-sm text-muted">{user?.email}</p>
      </div>

      <nav className="flex flex-col py-2">
        {ADMIN_NAV.map((item) => (
          <AdminSidebarLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={labels[item.labelKey]}
            isActive={
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </nav>

      <div className="mt-auto border-t border-muted/15">
        <Link
          href="/"
          prefetch={false}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-sm text-foreground transition hover:bg-surface-secondary"
        >
          <Icon
            icon="lucide:store"
            width={20}
            height={20}
            className="shrink-0 text-muted"
            aria-hidden
          />
          <span>{labels.backToStore}</span>
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 border-t border-muted/15 px-4 py-3.5 text-sm text-foreground transition hover:bg-surface-secondary"
        >
          <Icon
            icon="lucide:log-out"
            width={20}
            height={20}
            className="shrink-0 text-muted"
            aria-hidden
          />
          <span>{messages.account.logout}</span>
        </button>
      </div>
    </aside>
  );
}
