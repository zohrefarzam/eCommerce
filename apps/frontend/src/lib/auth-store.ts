'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
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
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accounts: {},
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
    }),
    { name: 'storefront-auth' },
  ),
);
