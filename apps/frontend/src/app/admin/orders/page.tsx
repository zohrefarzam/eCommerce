import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { AdminOrdersPage } from './orders-page';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return {
    title: `${messages.admin.ordersTitle} | ${messages.admin.panelTitle}`,
  };
}

export default function OrdersAdminPage() {
  return <AdminOrdersPage />;
}
