'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { sanitizeReturnUrl } from '@/app/auth/_lib/return-url';
import { useAuth } from '@/providers/auth-provider';

export function AuthRedirectIfSignedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isReady } = useAuth();
  const returnUrl = sanitizeReturnUrl(searchParams.get('returnUrl'));

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace(returnUrl);
    }
  }, [isReady, isAuthenticated, returnUrl, router]);

  if (!isReady || isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
      </div>
    );
  }

  return children;
}
