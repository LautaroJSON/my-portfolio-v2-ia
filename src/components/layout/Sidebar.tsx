'use client';

import { useTranslations } from 'next-intl';
import { NAV_ITEMS } from '@/lib/navigation';
import { SidebarNavItem } from '@/components/layout/SidebarNavItem';
import type { SectionId } from '@/interfaces/navigation.interface';

interface ISidebarProps {
  activeSection: SectionId;
  className?: string;
}

export const Sidebar = ({ activeSection, className = '' }: ISidebarProps) => {
  const t = useTranslations('nav');

  return (
    <nav
      aria-label={t('sidebarAria')}
      className={`bg-sidebar-bg border-border-subtle h-fit w-full rounded-xl border md:w-56 ${className}`}
    >
      <ul className="space-y-1 p-3">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.id}
            href={item.href}
            label={item.fileName}
            translatedLabel={t(item.labelKey)}
            isActive={activeSection === item.id}
          />
        ))}
      </ul>
    </nav>
  );
};
