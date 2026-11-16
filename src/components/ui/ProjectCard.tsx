import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { TechBadge } from '@/components/ui/TechBadge';
import { LinkButton } from '@/components/ui/LinkButton';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { publicAssetExists } from '@/lib/public-asset';
import type { IProject } from '@/interfaces/project.interface';

interface IProjectCardProps {
  project: IProject;
}

export const ProjectCard = async ({ project }: IProjectCardProps) => {
  const t = await getTranslations('projects');
  // Without an image (or before its file is added to /public) the card drops
  // the media block entirely instead of showing an empty frame.
  const image =
    project.image && publicAssetExists(project.image) ? project.image : null;

  return (
    <article className="border-border-subtle flex flex-col overflow-hidden rounded-lg border landscape:flex-row">
      {image && (
        <div className="bg-sidebar-bg border-border-subtle relative aspect-video border-b landscape:aspect-auto landscape:w-64 landscape:shrink-0 landscape:border-e landscape:border-b-0">
          <Image
            src={image}
            alt=""
            fill
            sizes="(orientation: landscape) 256px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className="text-text-primary text-lg font-bold tracking-tight">
          {project.name}
        </h2>

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
          {project.backendRepoUrl && (
            <LinkButton
              href={project.backendRepoUrl}
              variant="secondary"
              ariaLabel={t('backendCodeAria', { name: project.name })}
            >
              <GithubIcon size={14} />
              {t('backendCode')}
            </LinkButton>
          )}
        </div>
      </div>
    </article>
  );
};
