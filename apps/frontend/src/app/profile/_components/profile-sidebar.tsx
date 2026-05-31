'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from '@/i18n';
import { cn } from '@/components/base/_lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { PROFILE_NAV } from '@/app/profile/_lib/profile-nav';
import {
  selectUnreadCount,
  useNotificationsStore,
} from '@/app/profile/_lib/notifications-store';
import { EditProfileModal } from './edit-profile-modal';

const ACTIVE_BAR = 'border-s-2 border-foreground';

type ProfileSidebarLinkProps = {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
  badgeCount?: number;
};

function ProfileSidebarLink({
  href,
  icon,
  label,
  isActive,
  badgeCount,
}: ProfileSidebarLinkProps) {
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
      <span className="min-w-0 flex-1">{label}</span>
      {badgeCount && badgeCount > 0 ? (
        <span className="flex min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 py-0.5 text-[10px] font-bold leading-none text-background">
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      ) : null}
    </Link>
  );
}

export function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { messages } = useLocale();
  const { user, signOut } = useAuth();
  const labels = messages.account;
  const unreadCount = useNotificationsStore(selectUnreadCount);
  const [editOpen, setEditOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.refresh();
    router.push('/');
  };

  return (
    <>
      <aside className="flex flex-col overflow-hidden rounded-2xl border border-muted/20 bg-surface">
        <div className="border-b border-muted/15 px-5 py-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-foreground">
                {user?.name}
              </p>
              <p className="mt-1 truncate text-sm text-muted">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              aria-label={labels.editProfile}
              className="shrink-0 rounded-lg p-1.5 text-muted transition hover:bg-surface-secondary hover:text-foreground"
            >
              <Icon icon="lucide:pencil" width={18} height={18} aria-hidden />
            </button>
          </div>
        </div>

        <nav className="flex flex-col py-2">
          {PROFILE_NAV.map((item) => (
            <ProfileSidebarLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={labels[item.labelKey]}
              isActive={pathname === item.href}
              badgeCount={
                item.labelKey === 'notifications' ? unreadCount : undefined
              }
            />
          ))}
        </nav>

        <div className="mt-auto border-t border-muted/15">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-sm text-foreground transition hover:bg-surface-secondary"
          >
            <Icon
              icon="lucide:log-out"
              width={20}
              height={20}
              className="shrink-0 text-muted"
              aria-hidden
            />
            <span>{labels.logout}</span>
          </button>
        </div>
      </aside>

      <EditProfileModal isOpen={editOpen} onOpenChange={setEditOpen} />
    </>
  );
}
