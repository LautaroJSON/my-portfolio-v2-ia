'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { NAV_ITEMS } from '@/lib/navigation';
import type { SectionId } from '@/interfaces/navigation.interface';

interface ITabStripProps {
  activeSection: SectionId;
}

// Visually a row of editor tabs, semantically a navigation landmark: each tab
// is a real link to its own route, so `role="tab"` would be misleading here.
export const TabStrip = ({ activeSection }: ITabStripProps) => {
  const t = useTranslations('nav');

  return (
    <nav
      aria-label={t('tabsAria')}
      className="bg-sidebar-bg border-border-subtle flex shrink-0 overflow-x-auto border-b"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            aria-label={t(item.labelKey)}
            className={`border-border-subtle focus-visible:outline-accent border-r px-4 py-2 font-mono text-xs whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 ${
              isActive
                ? 'bg-panel-bg text-text-primary border-t-accent border-t-2'
                : 'text-text-muted hover:text-text-secondary border-t-2 border-t-transparent'
            }`}
          >
            {item.fileName}
          </Link>
        );
      })}
    </nav>
  );
};
