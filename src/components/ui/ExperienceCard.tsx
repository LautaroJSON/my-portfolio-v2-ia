import { getLocale, getTranslations } from 'next-intl/server';
import { formatDuration } from '@/lib/date';
import type { IExperience } from '@/interfaces/experience.interface';

interface IExperienceCardProps {
  experience: IExperience;
  isLast: boolean;
}

export const ExperienceCard = async ({
  experience,
  isLast,
}: IExperienceCardProps) => {
  const locale = await getLocale();
  const t = await getTranslations('experience');

  const startYear = new Date(experience.startDate).getFullYear();
  const endYear = experience.endDate
    ? new Date(experience.endDate).getFullYear()
    : t('present');
  const duration = formatDuration(
    experience.startDate,
    experience.endDate,
    locale
  );

  return (
    <article className="flex gap-4">
      <div className="flex w-3 shrink-0 flex-col items-center">
        <span
          aria-hidden="true"
          className="border-accent mt-1.5 h-3 w-3 shrink-0 rounded-full border-2"
        />
        {!isLast && <span className="bg-border-subtle w-px flex-1" />}
      </div>

      <div className={`flex-1 space-y-4 ${isLast ? '' : 'pb-10'}`}>
        <p className="text-text-secondary font-mono text-sm">
          {startYear} – {endYear}
        </p>

        <div className="space-y-1">
          <h3 className="text-text-primary text-lg font-bold">
            {experience.role}
          </h3>
          <p className="text-text-secondary text-sm">{experience.company}</p>
          <p className="text-text-muted font-mono text-xs">
            {experience.location} ({duration})
          </p>
        </div>

        <p className="text-text-primary">{experience.description}</p>

        {experience.projects.length > 0 && (
          <ul className="space-y-1">
            {experience.projects.map((project) => (
              <li key={project.name}>
                <span className="text-accent font-semibold">
                  {project.name}
                </span>
                <span className="text-text-primary">
                  {' '}
                  — {project.description}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="font-mono text-sm">
          <span className="text-text-muted">[</span>
          {experience.technologies.map((technology, index) => (
            <span key={technology.name}>
              <span className="text-accent">{technology.name}</span>
              {index < experience.technologies.length - 1 && (
                <span className="text-text-muted">, </span>
              )}
            </span>
          ))}
          <span className="text-text-muted">]</span>
        </p>
      </div>
    </article>
  );
};
