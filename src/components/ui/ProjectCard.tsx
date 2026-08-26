import Image from 'next/image';
import { Code2, ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { TechBadge } from '@/components/ui/TechBadge';
import { LinkButton } from '@/components/ui/LinkButton';
import { GithubIcon } from '@/components/ui/BrandIcons';
import type { IProject } from '@/interfaces/project.interface';

interface IProjectCardProps {
  project: IProject;
}

export const ProjectCard = async ({ project }: IProjectCardProps) => {
  const t = await getTranslations('projects');

  return (
    <article className="border-border-subtle flex flex-col overflow-hidden rounded-lg border landscape:flex-row">
      <div className="bg-sidebar-bg border-border-subtle relative aspect-video border-b landscape:aspect-auto landscape:w-64 landscape:shrink-0 landscape:border-e landscape:border-b-0">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(orientation: landscape) 256px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="text-text-muted flex h-full flex-col items-center justify-center gap-2">
            <Code2 size={22} strokeWidth={1.5} aria-hidden="true" />
            <span className="font-mono text-xs tracking-wide">
              {t('noPreview')}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-text-primary text-lg font-bold tracking-tight">
          {project.name}
        </h3>

        <p className="text-text-secondary flex-1 text-sm leading-relaxed">
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {project.technologies.map((technology) => (
              <TechBadge key={technology} name={technology} />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {project.deployUrl && (
            <LinkButton
              href={project.deployUrl}
              variant="primary"
              ariaLabel={t('demoAria', { name: project.name })}
            >
              <ExternalLink size={14} strokeWidth={1.5} />
              {t('demo')}
            </LinkButton>
          )}
          <LinkButton
            href={project.repoUrl}
            variant="secondary"
            ariaLabel={t('codeAria', { name: project.name })}
          >
            <GithubIcon size={14} />
            {t('code')}
          </LinkButton>
        </div>
      </div>
    </article>
  );
};
