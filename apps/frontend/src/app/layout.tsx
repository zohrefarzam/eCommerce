import type { Metadata } from 'next';
import localFont from 'next/font/local';
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

export const metadata: Metadata = {
  title: 'هوشمندسازان | فروشگاه',
  description: 'فروشگاه آنلاین محصولات دیجیتال',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`light ${iranSansX.variable} h-full bg-background text-foreground antialiased`}
    >
      <body
        className={`${iranSansX.className} min-h-full flex flex-col bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
