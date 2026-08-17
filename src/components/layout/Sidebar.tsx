'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { NAV_ITEMS } from '@/lib/navigation';
import { SidebarNavItem } from '@/components/layout/SidebarNavItem';
import type { ISidebarItem } from '@/interfaces/navigation.interface';

export const Sidebar = () => {
  const t = useTranslations('nav');
  const [activeId, setActiveId] = useState<ISidebarItem['id']>('home');

  return (
    <nav className="bg-sidebar-bg w-full flex-none rounded-3xl md:w-[300px]">
      <ul className="space-y-1 p-4">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.id}
            href={item.href}
            label={t(item.labelKey)}
            isActive={activeId === item.id}
            onClick={() => setActiveId(item.id)}
          />
        ))}
      </ul>
    </nav>
  );
};
