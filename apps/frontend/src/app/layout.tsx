import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import localFont from 'next/font/local';
import { getLocaleConfig, getLocaleFromCookie, getMessages } from '@/i18n';
import { Providers } from './providers';
import './globals.css';

const iranSansX = localFont({
  src: [
    {
      path: './../assets/fonts/IRANSansX-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../assets/fonts/IRANSansX-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iran-sans-x',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const messages = getMessages(locale);

  return {
    title: messages.meta.title,
    description: messages.meta.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore);
  const { lang, dir } = getLocaleConfig(locale);

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
      className={`light ${iranSansX.variable} h-full overflow-x-hidden bg-background text-foreground antialiased`}
    >
      <body
        className={`${iranSansX.className} flex min-h-full min-w-0 flex-col overflow-x-hidden bg-background text-foreground`}
      >
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
