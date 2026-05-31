import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { AuthRedirectIfSignedIn } from '../_components/auth-redirect-if-signed-in';
import { SignInForm } from '../_components/sign-in-form';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return { title: messages.auth.signInMetaTitle };
}

function SignInFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <AuthRedirectIfSignedIn>
        <SignInForm />
      </AuthRedirectIfSignedIn>
    </Suspense>
  );
}
