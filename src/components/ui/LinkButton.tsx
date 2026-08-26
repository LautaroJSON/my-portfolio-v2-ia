import type { ReactNode } from 'react';
import {
  BUTTON_VARIANT_CLASSES,
  type ButtonVariant,
} from '@/lib/button-variants';

interface ILinkButtonProps {
  href: string;
  variant: ButtonVariant;
  ariaLabel: string;
  download?: boolean;
  children: ReactNode;
}

export const LinkButton = ({
  href,
  variant,
  ariaLabel,
  download,
  children,
}: ILinkButtonProps) => {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      download={download}
      aria-label={ariaLabel}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`focus-visible:outline-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${BUTTON_VARIANT_CLASSES[variant]}`}
    >
      {children}
    </a>
  );
};
