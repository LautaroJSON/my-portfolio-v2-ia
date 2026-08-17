import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { routing } from '@/i18n/routing';
import { inter } from '@/lib/fonts';
import { Sidebar } from '@/components/layout/Sidebar';
import { EditorPanel } from '@/components/layout/EditorPanel';
import './globals.css';

interface ILocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const LocaleLayout = async ({ children, params }: ILocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="relative min-h-screen font-sans">
        <Image
          src="/image.png"
          alt=""
          fill
          priority
          className="fixed inset-0 -z-10 object-cover"
        />
        <div className="fixed inset-0 -z-10 bg-black/20" />

        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col gap-4 p-4 md:flex-row">
            <Sidebar />
            <EditorPanel>{children}</EditorPanel>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
