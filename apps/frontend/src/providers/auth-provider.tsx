'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useAuthStore,
  type AuthUser,
  type UserRole,
} from '@/providers/_lib/auth-store';

type SignInResult = { ok: true } | { ok: false; error: 'invalid' };

type SignUpResult = { ok: true } | { ok: false; error: 'exists' };

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isReady: boolean;
  signIn: (email: string, password: string) => SignInResult;
  signUp: (input: {
    name: string;
    email: string;
    password: string;
  }) => SignUpResult;
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

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const signInStore = useAuthStore((s) => s.signIn);
  const signUpStore = useAuthStore((s) => s.signUp);
  const signOutStore = useAuthStore((s) => s.signOut);
  const updateProfileStore = useAuthStore((s) => s.updateProfile);
  const setUserRoleStore = useAuthStore((s) => s.setUserRole);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setIsReady(true);
    });
    if (useAuthStore.persist.hasHydrated()) {
      setIsReady(true);
    }
    return unsub;
  }, []);

  const signIn = useCallback(
    (email: string, password: string) => signInStore(email, password),
    [signInStore],
  );

  const signUp = useCallback(
    (input: { name: string; email: string; password: string }) =>
      signUpStore(input),
    [signUpStore],
  );

  const signOut = useCallback(() => signOutStore(), [signOutStore]);

  const updateProfile = useCallback(
    (input: { name: string; email: string }) => updateProfileStore(input),
    [updateProfileStore],
  );

  const setUserRole = useCallback(
    (email: string, role: UserRole) => setUserRoleStore(email, role),
    [setUserRoleStore],
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      isReady,
      signIn,
      signUp,
      signOut,
      updateProfile,
      setUserRole,
    }),
    [user, isReady, signIn, signUp, signOut, updateProfile, setUserRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
