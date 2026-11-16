import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { buildMetadata } from '@/lib/seo';

interface IProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({
  params,
}: IProjectsPageProps): Promise<Metadata> => {
  const { locale } = await params;
  return buildMetadata({ locale, section: 'projects' });
};

const ProjectsPage = async ({ params }: IProjectsPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsSection />;
};

export default ProjectsPage;
