import { getLocale, getTranslations } from 'next-intl/server';
import { ExperienceCard } from '@/components/ui/ExperienceCard';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { EXPERIENCES as EXPERIENCES_EN } from '@/content/en/experience';
import { EXPERIENCES as EXPERIENCES_ES } from '@/content/es/experience';
import type { IExperience } from '@/interfaces/experience.interface';

const EXPERIENCES_BY_LOCALE: Record<string, IExperience[]> = {
  en: EXPERIENCES_EN,
  es: EXPERIENCES_ES,
};

export const ExperienceSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('nav');
  const experiences = EXPERIENCES_BY_LOCALE[locale] ?? EXPERIENCES_EN;

  return (
    <section
      aria-labelledby="experience-heading"
      className="min-h-[40vh] space-y-8"
    >
      <div className="space-y-1">
        <SectionEyebrow label="experience" />
        <h2
          id="experience-heading"
          className="text-text-primary text-3xl font-bold tracking-tight"
        >
          {t('experience')}
        </h2>
      </div>

      <div>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.role}
            experience={experience}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </section>
  );
};
