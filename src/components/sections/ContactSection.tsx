import { Download } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { SocialLink } from '@/components/ui/SocialLink';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { LinkButton } from '@/components/ui/LinkButton';
import { contactInfo } from '@/content/contact';

export const ContactSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('contact');
  const cvDownload =
    locale === 'es' ? contactInfo.cvDownloads.es : contactInfo.cvDownloads.en;
  const validSocialLinks = contactInfo.socialLinks.filter(
    (socialLink) => socialLink.url
  );

  return (
    <section
      aria-labelledby="contact-heading"
      className="flex min-h-[40vh] flex-col items-center gap-8 text-center"
    >
      <div className="space-y-1">
        <SectionEyebrow label="contact" />
        <h1
          id="contact-heading"
          className="text-text-primary text-3xl font-bold tracking-tight"
        >
          {t('heading')}
        </h1>
      </div>

      <p className="text-text-secondary max-w-md text-lg">{t('tagline')}</p>

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {validSocialLinks.map((socialLink) => (
            <SocialLink key={socialLink.platform} socialLink={socialLink} />
          ))}
        </div>

        <LinkButton
          href={cvDownload.url}
          variant="secondary"
          download={cvDownload.fileName}
          ariaLabel={t('downloadCvAria')}
        >
          <Download size={20} strokeWidth={1.5} />
          {t('downloadCv')}
        </LinkButton>
      </div>
    </section>
  );
};
