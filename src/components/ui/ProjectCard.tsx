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
    // Every card has the same height (fixed in landscape; fixed info block in
    // portrait, under a media block whose 16:9 height is the same for all), so
    // the list reads as a uniform column. A description longer than that
    // scrolls inside its own box instead of stretching the card.
    <article className="border-border-subtle flex flex-col overflow-hidden rounded-lg border landscape:h-68 landscape:flex-row">
      {image && (
        <div className="group/media bg-sidebar-bg border-border-subtle relative aspect-video overflow-hidden border-b landscape:aspect-auto landscape:w-64 landscape:shrink-0 landscape:border-e landscape:border-b-0">
          <Image
            src={image}
            alt=""
            fill
            // Landscape crops a 16:9 image into a 256px-wide column as tall as
            // the card, so the rendered width follows the card height
            // (~16/9 of it), not 256px.
            sizes="(orientation: landscape) 1024px, 100vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover/media:scale-110"
          />
        </div>
      )}

      <div className="flex h-116 min-h-0 flex-none flex-col gap-3 p-4 landscape:h-auto landscape:flex-1">
        <h2 className="text-text-primary text-lg font-bold tracking-tight">
          {project.name}
        </h2>

        {/* Focusable so keyboard users can scroll it when it overflows. */}
        <div
          role="region"
          aria-label={t('descriptionAria', { name: project.name })}
          tabIndex={0}
          className="focus-visible:outline-accent min-h-0 flex-1 overflow-y-auto pe-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <p className="text-text-secondary text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

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
