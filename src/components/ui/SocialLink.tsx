import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import type { ISocialLink } from '@/interfaces/contact.interface';

const ICONS = {
  Mail,
  Linkedin: LinkedinIcon,
  Github: GithubIcon,
} as const;

interface ISocialLinkProps {
  socialLink: ISocialLink;
}

export const SocialLink = ({ socialLink }: ISocialLinkProps) => {
  const Icon = ICONS[socialLink.icon];
  const isExternal = socialLink.platform !== 'email';

  return (
    <a
      href={socialLink.url}
      aria-label={`${socialLink.label} — Lautaro Fernandez`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="text-text-secondary hover:text-accent focus-visible:outline-accent rounded focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Icon size={20} strokeWidth={1.5} />
    </a>
  );
};
