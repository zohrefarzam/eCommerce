import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { ProfileNotificationsPage } from './notifications-page';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return { title: messages.notifications.metaTitle };
}

export default function NotificationsPage() {
  return <ProfileNotificationsPage />;
}
