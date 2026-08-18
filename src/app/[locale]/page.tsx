import { setRequestLocale } from 'next-intl/server';
import { PortfolioShell } from '@/components/layout/PortfolioShell';
import { HomeSection } from '@/components/sections/HomeSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

interface IHomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: IHomePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const sections = {
    home: <HomeSection />,
    experience: <ExperienceSection />,
    projects: <ProjectsSection />,
    contact: <ContactSection />,
  };

  return <PortfolioShell sections={sections} />;
};

export default HomePage;
