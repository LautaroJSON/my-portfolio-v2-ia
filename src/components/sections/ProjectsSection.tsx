import { getLocale, getTranslations } from 'next-intl/server';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { PROJECTS as PROJECTS_EN } from '@/content/en/projects';
import { PROJECTS as PROJECTS_ES } from '@/content/es/projects';
import type { IProject } from '@/interfaces/project.interface';

const PROJECTS_BY_LOCALE: Record<string, IProject[]> = {
  en: PROJECTS_EN,
  es: PROJECTS_ES,
};

export const ProjectsSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('projects');
  const tNav = await getTranslations('nav');
  const projects = PROJECTS_BY_LOCALE[locale] ?? PROJECTS_EN;

  return (
    <section
      aria-labelledby="projects-heading"
      className="min-h-[40vh] space-y-12"
    >
      <div className="space-y-1">
        <SectionEyebrow label="projects" />
        <h2
          id="projects-heading"
          className="text-text-primary text-3xl font-bold tracking-tight"
        >
          {tNav('projects')}
        </h2>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-text-muted font-mono text-sm">
          {'// TODO: '}
          {t('comingSoon')}
        </p>
      )}
    </section>
  );
};
