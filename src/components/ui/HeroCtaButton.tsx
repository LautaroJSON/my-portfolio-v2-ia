import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { getSectionHref } from '@/lib/navigation';
import {
  BUTTON_VARIANT_CLASSES,
  type ButtonVariant,
} from '@/lib/button-variants';
import type { SectionId } from '@/interfaces/navigation.interface';

interface IHeroCtaButtonProps {
  target: SectionId;
  variant: ButtonVariant;
  ariaLabel: string;
  children: ReactNode;
}

export const HeroCtaButton = ({
  target,
  variant,
  ariaLabel,
  children,
}: IHeroCtaButtonProps) => {
  return (
    <Link
      href={getSectionHref(target)}
      aria-label={ariaLabel}
      className={`focus-visible:outline-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${BUTTON_VARIANT_CLASSES[variant]}`}
    >
      {children}
    </Link>
  );
};
