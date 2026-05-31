import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { AuthRedirectIfSignedIn } from '../_components/auth-redirect-if-signed-in';
import { SignUpForm } from '../_components/sign-up-form';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return { title: messages.auth.signUpMetaTitle };
}

function SignUpFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpFallback />}>
      <AuthRedirectIfSignedIn>
        <SignUpForm />
      </AuthRedirectIfSignedIn>
    </Suspense>
  );
}
