import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { ProfileOrdersPage } from './orders-page';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return { title: messages.account.ordersMetaTitle };
}

export default function OrdersPage() {
  return <ProfileOrdersPage />;
}
