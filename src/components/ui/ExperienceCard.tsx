import { getLocale, getTranslations } from 'next-intl/server';
import { formatDuration, formatMonthYear } from '@/lib/date';
import { TechBadge } from '@/components/ui/TechBadge';
import type { IExperience } from '@/interfaces/experience.interface';

interface IExperienceCardProps {
  experience: IExperience;
}

export const ExperienceCard = async ({ experience }: IExperienceCardProps) => {
  const locale = await getLocale();
  const t = await getTranslations('experience');

  const startLabel = formatMonthYear(experience.startDate, locale);
  const endLabel = experience.endDate
    ? formatMonthYear(experience.endDate, locale)
    : t('present');
  const duration = formatDuration(
    experience.startDate,
    experience.endDate,
    locale
  );

  return (
    <article className="border-border-subtle space-y-6 border-s ps-4">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">
          <span className="text-accent">{experience.role}</span>
          <span className="text-text-primary"> — {experience.company}</span>
        </h3>

        <p className="text-text-secondary flex flex-wrap items-center gap-x-2 font-mono text-sm">
          <span>{experience.location}</span>
          <span aria-hidden="true">·</span>
          <span>
            {startLabel} – {endLabel}
          </span>
          <span aria-hidden="true">·</span>
          <span>{duration}</span>
        </p>
      </div>

      <p className="text-text-primary">{experience.description}</p>

      {experience.projects.length > 0 && (
        <ul className="space-y-1">
          {experience.projects.map((project) => (
            <li key={project.name}>
              <span className="text-accent font-semibold">{project.name}</span>
              <span className="text-text-primary">
                {' '}
                — {project.description}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {experience.technologies.map((technology) => (
          <TechBadge key={technology.name} name={technology.name} />
        ))}
      </div>
    </article>
  );
};
