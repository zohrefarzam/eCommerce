import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { AdminCategoriesPage } from './categories-page';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return {
    title: `${messages.admin.categoriesTitle} | ${messages.admin.panelTitle}`,
  };
}

export default function CategoriesAdminPage() {
  return <AdminCategoriesPage />;
}
