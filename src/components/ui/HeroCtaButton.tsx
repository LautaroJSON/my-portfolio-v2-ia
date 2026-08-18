'use client';

import type { ReactNode } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import type { ISidebarItem } from '@/interfaces/navigation.interface';

interface IHeroCtaButtonProps {
  target: ISidebarItem['id'];
  variant: 'primary' | 'secondary';
  ariaLabel: string;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<IHeroCtaButtonProps['variant'], string> = {
  primary:
    'border-accent bg-accent-dim text-accent hover:border-accent-hover hover:text-accent-hover',
  secondary:
    'border-border-subtle text-text-secondary hover:bg-accent-dim hover:text-text-primary',
};

export const HeroCtaButton = ({
  target,
  variant,
  ariaLabel,
  children,
}: IHeroCtaButtonProps) => {
  const { select } = useNavigation();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => select(target)}
      className={`focus-visible:outline-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </button>
  );
};
