import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { buildMetadata } from '@/lib/seo';

interface IExperiencePageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({
  params,
}: IExperiencePageProps): Promise<Metadata> => {
  const { locale } = await params;
  return buildMetadata({ locale, section: 'experience' });
};

const ExperiencePage = async ({ params }: IExperiencePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExperienceSection />;
};

export default ExperiencePage;
