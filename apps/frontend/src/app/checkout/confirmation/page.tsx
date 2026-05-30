import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { CheckoutConfirmationContent } from './checkout-confirmation-content';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return { title: messages.checkout.confirmationTitle };
}

function ConfirmationFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-background">
      <div className="size-8 animate-pulse rounded-full bg-surface-secondary" />
    </div>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationFallback />}>
      <CheckoutConfirmationContent />
    </Suspense>
  );
}
