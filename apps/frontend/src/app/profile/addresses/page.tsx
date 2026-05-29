import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocaleFromCookie, getMessages } from '@/i18n';
import { ProfileAddressesPage } from './addresses-page';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);
  return { title: messages.account.addressesMetaTitle };
}

export default function AddressesPage() {
  return <ProfileAddressesPage />;
}
