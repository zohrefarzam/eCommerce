'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'customer';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type StoredAccount = {
  user: AuthUser;
  password: string;
};

type AuthState = {
  user: AuthUser | null;
  accounts: Record<string, StoredAccount>;
  signIn: (
    email: string,
    password: string,
  ) => { ok: true } | { ok: false; error: 'invalid' };
  signUp: (input: {
    name: string;
    email: string;
    password: string;
  }) => { ok: true } | { ok: false; error: 'exists' };
  signOut: () => void;
  updateProfile: (input: {
    name: string;
    email: string;
  }) => { ok: true } | { ok: false; error: 'exists' | 'invalid' };
  setUserRole: (
    email: string,
    role: UserRole,
  ) => { ok: true } | { ok: false; error: 'invalid' };
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Hardcoded admin seeded on first load so the admin panel is always reachable. */
const SEED_ADMIN_EMAIL = 'admin@store.com';
const SEED_ADMIN_PASSWORD = 'admin1234';

function createSeedAdmin(): StoredAccount {
  return {
    user: {
      id: 'seed-admin',
      name: 'Store Admin',
      email: SEED_ADMIN_EMAIL,
      role: 'admin',
    },
    password: SEED_ADMIN_PASSWORD,
  };
}

function withSeedAdmin(
  accounts: Record<string, StoredAccount>,
): Record<string, StoredAccount> {
  if (accounts[SEED_ADMIN_EMAIL]) return accounts;
  return { ...accounts, [SEED_ADMIN_EMAIL]: createSeedAdmin() };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accounts: withSeedAdmin({}),
      signIn: (email, password) => {
        const key = normalizeEmail(email);
        const account = get().accounts[key];
        if (!account || account.password !== password) {
          return { ok: false, error: 'invalid' };
        }
        set({ user: account.user });
        return { ok: true };
      },
      signUp: ({ name, email, password }) => {
        const key = normalizeEmail(email);
        if (get().accounts[key]) {
          return { ok: false, error: 'exists' };
        }
        const user: AuthUser = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: key,
          role: 'customer',
        };
        set((state) => ({
          accounts: { ...state.accounts, [key]: { user, password } },
          user,
        }));
        return { ok: true };
      },
      signOut: () => set({ user: null }),

      updateProfile: ({ name, email }) => {
        const user = get().user;
        if (!user) return { ok: false, error: 'invalid' };

        const trimmedName = name.trim();
        const oldKey = user.email;
        const newKey = normalizeEmail(email);
        if (!trimmedName || !newKey) {
          return { ok: false, error: 'invalid' };
        }

        const account = get().accounts[oldKey];
        if (!account) {
          set({
            user: { ...user, name: trimmedName, email: newKey },
          });
          return { ok: true };
        }

        if (newKey !== oldKey && get().accounts[newKey]) {
          return { ok: false, error: 'exists' };
        }

        const updatedUser: AuthUser = {
          ...user,
          name: trimmedName,
          email: newKey,
        };
        const accounts = { ...get().accounts };
        delete accounts[oldKey];
        accounts[newKey] = { ...account, user: updatedUser };
        set({ user: updatedUser, accounts });
        return { ok: true };
      },

      setUserRole: (email, role) => {
        const key = normalizeEmail(email);
        const account = get().accounts[key];
        if (!account) return { ok: false, error: 'invalid' };

        const updatedUser: AuthUser = { ...account.user, role };
        const accounts = {
          ...get().accounts,
          [key]: { ...account, user: updatedUser },
        };
        const currentUser = get().user;
        set({
          accounts,
          user:
            currentUser && currentUser.email === key
              ? updatedUser
              : currentUser,
        });
        return { ok: true };
      },
    }),
    {
      name: 'storefront-auth',
      version: 2,
      migrate: (persisted) => {
        const state = (persisted ?? {}) as Partial<AuthState>;
        const accounts: Record<string, StoredAccount> = {};
        for (const [key, account] of Object.entries(state.accounts ?? {})) {
          accounts[key] = {
            ...account,
            user: { ...account.user, role: account.user.role ?? 'customer' },
          };
        }
        const user = state.user
          ? { ...state.user, role: state.user.role ?? 'customer' }
          : null;
        return { ...state, accounts: withSeedAdmin(accounts), user };
      },
      merge: (persisted, current) => {
        const merged = {
          ...current,
          ...(persisted as Partial<AuthState>),
        } as AuthState;
        return { ...merged, accounts: withSeedAdmin(merged.accounts ?? {}) };
      },
    },
  ),
);
