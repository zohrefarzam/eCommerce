import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { CartPageContent } from './cart-page-content';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);

  return { title: messages.cart.metaTitle };
}

export default function CartPage() {
  return <CartPageContent />;
}
