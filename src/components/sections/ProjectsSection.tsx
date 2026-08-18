import { getTranslations } from 'next-intl/server';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

export const ProjectsSection = async () => {
  const t = await getTranslations('projects');
  const tNav = await getTranslations('nav');

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

      <p className="text-text-muted font-mono text-sm">
        {'// TODO: '}
        {t('comingSoon')}
      </p>
    </section>
  );
};
