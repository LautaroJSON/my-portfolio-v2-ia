import { Download } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SocialLink } from '@/components/ui/SocialLink';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { LinkButton } from '@/components/ui/LinkButton';
import { contactInfo } from '@/content/contact';

export const ContactSection = async () => {
  const t = await getTranslations('contact');
  const validSocialLinks = contactInfo.socialLinks.filter(
    (socialLink) => socialLink.url
  );

  return (
    <section
      aria-labelledby="contact-heading"
      className="min-h-[40vh] space-y-6"
    >
      <div className="space-y-1">
        <SectionEyebrow label="contact" />
        <h2
          id="contact-heading"
          className="text-text-primary text-3xl font-bold tracking-tight"
        >
          {t('heading')}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-6">
          {validSocialLinks.map((socialLink) => (
            <SocialLink key={socialLink.platform} socialLink={socialLink} />
          ))}
        </div>

        <LinkButton
          href={contactInfo.cvDownloadUrl}
          variant="secondary"
          download
          ariaLabel={t('downloadCvAria')}
        >
          <Download size={20} strokeWidth={1.5} />
          {t('downloadCv')}
        </LinkButton>
      </div>
    </section>
  );
};
