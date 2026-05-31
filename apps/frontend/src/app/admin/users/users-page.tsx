'use client';

import { useEffect, useMemo, useState } from 'react';
import { Select } from '@/components/base/select';
import { useLocale } from '@/i18n';
import { useAuthStore, type UserRole } from '@/providers/_lib/auth-store';
import { useAuth } from '@/providers/auth-provider';
import { AdminContentCard } from '../_components/admin-shell';

export function AdminUsersPage() {
  const { messages } = useLocale();
  const labels = messages.admin;
  const accounts = useAuthStore((s) => s.accounts);
  const { user, setUserRole } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const users = useMemo(
    () =>
      Object.values(accounts)
        .map((account) => account.user)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [accounts],
  );

  const roleOptions: { id: UserRole; label: string }[] = [
    { id: 'admin', label: labels.roleAdmin },
    { id: 'customer', label: labels.roleCustomer },
  ];

  return (
    <AdminContentCard title={labels.usersTitle}>
      {!mounted ? (
        <div className="flex justify-center py-16">
          <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-muted/15 text-xs font-semibold uppercase text-muted">
                <th className="px-3 py-3 text-start">{labels.userColName}</th>
                <th className="px-3 py-3 text-start">{labels.userColEmail}</th>
                <th className="px-3 py-3 text-start">{labels.userColRole}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((account) => {
                const isSelf = account.email === user?.email;
                return (
                  <tr
                    key={account.email}
                    className="border-b border-muted/10 last:border-0"
                  >
                    <td className="px-3 py-3 font-medium text-foreground">
                      <span className="flex items-center gap-2">
                        {account.name}
                        {isSelf ? (
                          <span className="rounded-md bg-surface-secondary px-1.5 py-0.5 text-xs font-normal text-muted">
                            {labels.youBadge}
                          </span>
                        ) : null}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-muted">{account.email}</td>
                    <td className="px-3 py-3">
                      <div className="max-w-[12rem]">
                        <Select
                          options={roleOptions}
                          selectedKey={account.role}
                          onSelectionChange={(role) =>
                            setUserRole(account.email, role)
                          }
                          isDisabled={isSelf}
                          aria-label={labels.userColRole}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminContentCard>
  );
}
