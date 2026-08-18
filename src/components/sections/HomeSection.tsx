import { getLocale, getTranslations } from 'next-intl/server';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { HeroCtaButton } from '@/components/ui/HeroCtaButton';
import { TextFragmentParagraph } from '@/components/ui/TextFragmentParagraph';
import { TechBadge } from '@/components/ui/TechBadge';
import { homeContentEn } from '@/content/en/home';
import { homeContentEs } from '@/content/es/home';
import { aboutContentEn } from '@/content/en/about';
import { aboutContentEs } from '@/content/es/about';
import { profile } from '@/content/profile';
import { coreTechnologies } from '@/content/core-technologies';
import type { ITextFragment } from '@/interfaces/text-fragment.interface';

const HOME_CONTENT_BY_LOCALE: Record<string, ITextFragment[]> = {
  en: homeContentEn,
  es: homeContentEs,
};

const ABOUT_CONTENT_BY_LOCALE: Record<string, ITextFragment[]> = {
  en: aboutContentEn,
  es: aboutContentEs,
};

export const HomeSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('home');
  const fragments = HOME_CONTENT_BY_LOCALE[locale] ?? homeContentEn;
  const aboutFragments = ABOUT_CONTENT_BY_LOCALE[locale] ?? aboutContentEn;
  const stack = fragments
    .filter((fragment) => fragment.accent)
    .map((fragment) => fragment.text)
    .join(' · ');
  const credentials = [
    t('yearsExperience'),
    t('focusArea'),
    t('bilingual'),
  ].join(' · ');

  return (
    <section aria-labelledby="home-heading" className="min-h-[40vh] space-y-8">
      <div className="space-y-4">
        <div className="space-y-3">
          <SectionEyebrow label="whoami" />

          <span className="border-border-subtle text-text-secondary inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs">
            <span className="text-accent" aria-hidden="true">
              ●
            </span>
            {t('availability')}
          </span>
        </div>

        <div className="space-y-1">
          <h1
            id="home-heading"
            className="text-text-primary font-sans text-4xl font-bold tracking-tight md:text-5xl"
          >
            {profile.name}
          </h1>
          <p className="text-text-secondary font-sans text-lg font-medium md:text-xl">
            {profile.role}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <TextFragmentParagraph
          fragments={fragments}
          className="text-text-primary text-lg leading-relaxed"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <HeroCtaButton
          target="experience"
          variant="primary"
          ariaLabel={t('ctaPrimaryAria')}
        >
          {t('ctaPrimary')}
        </HeroCtaButton>
        <HeroCtaButton
          target="contact"
          variant="secondary"
          ariaLabel={t('ctaSecondaryAria')}
        >
          {t('ctaSecondary')}
        </HeroCtaButton>
      </div>

      <div className="space-y-4">
        <h2
          id="about-heading"
          className="text-text-primary font-sans text-2xl font-bold tracking-tight"
        >
          {t('aboutHeading')}
        </h2>

        <TextFragmentParagraph
          fragments={aboutFragments}
          className="text-text-primary text-lg leading-relaxed"
        />
      </div>

      <div className="space-y-3">
        <p className="text-text-muted text-sm">{t('aboutNote')}</p>

        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {coreTechnologies.map((technology, index) => [
            <TechBadge key={technology.name} name={technology.name} />,
            index < coreTechnologies.length - 1 && (
              <span key={`separator-${index}`} className="text-text-muted">
                -
              </span>
            ),
          ])}
        </div>
      </div>
    </section>
  );
};
