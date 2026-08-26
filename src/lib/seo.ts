import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';
import { contactInfo } from '@/content/contact';
import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://my-portfolio-v2-ia.vercel.app';

interface IBuildMetadataParams {
  locale: string;
}

export const buildMetadata = async ({
  locale,
}: IBuildMetadataParams): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...languages,
        'x-default': `${SITE_URL}/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      url: `${SITE_URL}/${locale}`,
      siteName: `${profile.name} — Portfolio`,
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

interface IBuildPersonJsonLdParams {
  locale: string;
}

export const buildPersonJsonLd = ({ locale }: IBuildPersonJsonLdParams) => {
  const linkedin = contactInfo.socialLinks.find(
    (link) => link.platform === 'linkedin'
  )?.url;
  const github = contactInfo.socialLinks.find(
    (link) => link.platform === 'github'
  )?.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: `${SITE_URL}/${locale}`,
    email: contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
    sameAs: [linkedin, github].filter(Boolean),
  };
};
