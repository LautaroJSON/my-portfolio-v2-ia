import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import backgroundMountain from '../../../public/background-mountain.png';
import { routing } from '@/i18n/routing';
import { plexMono, plexSans } from '@/lib/fonts';
import { PortfolioShell } from '@/components/layout/PortfolioShell';
import { SITE_URL } from '@/lib/seo';
import './globals.css';

interface ILocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

// Page-level metadata (title, description, canonical, hreflang, Open Graph)
// lives in each route's `generateMetadata`; the layout only sets the base URL.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

const LocaleLayout = async ({ children, params }: ILocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="relative min-h-screen font-sans">
        <Image
          src={backgroundMountain}
          alt=""
          fill
          priority
          className="fixed inset-0 -z-10 object-cover"
        />
        <div className="bg-void/45 fixed inset-0 -z-10" />

        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col p-4">
            <PortfolioShell>{children}</PortfolioShell>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
