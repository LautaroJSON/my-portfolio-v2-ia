'use client';

import { useTranslations } from 'next-intl';
import { NAV_ITEMS } from '@/lib/navigation';
import type { ISidebarItem } from '@/interfaces/navigation.interface';

interface ITabStripProps {
  activeSection: ISidebarItem['id'];
  onSelect: (id: ISidebarItem['id']) => void;
}

export const TabStrip = ({ activeSection, onSelect }: ITabStripProps) => {
  const t = useTranslations('nav');

  return (
    <div
      role="tablist"
      className="bg-sidebar-bg border-border-subtle flex shrink-0 overflow-x-auto border-b"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={t(item.labelKey)}
            onClick={() => onSelect(item.id)}
            className={`border-border-subtle focus-visible:outline-accent border-r px-4 py-2 font-mono text-xs whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 ${
              isActive
                ? 'bg-panel-bg text-text-primary border-t-accent border-t-2'
                : 'text-text-muted hover:text-text-secondary border-t-2 border-t-transparent'
            }`}
          >
            {item.fileName}
          </button>
        );
      })}
    </div>
  );
};
