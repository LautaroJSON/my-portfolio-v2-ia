import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HomeSection } from '@/components/sections/HomeSection';
import { buildMetadata, buildPersonJsonLd } from '@/lib/seo';

interface IHomePageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({
  params,
}: IHomePageProps): Promise<Metadata> => {
  const { locale } = await params;
  return buildMetadata({ locale, section: 'home' });
};

const HomePage = async ({ params }: IHomePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // The Person JSON-LD describes the site owner, so it only ships with the
  // home page of each locale instead of being repeated on every route.
  const personJsonLd = await buildPersonJsonLd({ locale });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HomeSection />
    </>
  );
};

export default HomePage;
