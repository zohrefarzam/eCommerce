import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { AdminProductsPage } from './products-page';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return {
    title: `${messages.admin.productsTitle} | ${messages.admin.panelTitle}`,
  };
}

export default function ProductsAdminPage() {
  return <AdminProductsPage />;
}
