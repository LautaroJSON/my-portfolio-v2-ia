import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Image from 'next/image';
import backgroundMountain from '../../../public/background-mountain.png';
import { routing } from '@/i18n/routing';
import { plexMono, plexSans } from '@/lib/fonts';
import { buildMetadata, buildPersonJsonLd } from '@/lib/seo';
import './globals.css';

interface ILocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async ({
  params,
}: Omit<ILocaleLayoutProps, 'children'>): Promise<Metadata> => {
  const { locale } = await params;
  return buildMetadata({ locale });
};

const LocaleLayout = async ({ children, params }: ILocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const personJsonLd = buildPersonJsonLd({ locale });

  return (
    <html lang={locale} className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="relative min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
