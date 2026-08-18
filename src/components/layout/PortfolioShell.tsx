'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { EditorPanel } from '@/components/layout/EditorPanel';
import { NavigationContext } from '@/lib/navigation-context';
import type { ISidebarItem } from '@/interfaces/navigation.interface';

interface IPortfolioShellProps {
  sections: Record<ISidebarItem['id'], ReactNode>;
}

export const PortfolioShell = ({ sections }: IPortfolioShellProps) => {
  const [activeSection, setActiveSection] =
    useState<ISidebarItem['id']>('home');

  return (
    <NavigationContext.Provider value={{ select: setActiveSection }}>
      <EditorPanel activeSection={activeSection} onSelect={setActiveSection}>
        {sections[activeSection]}
      </EditorPanel>
    </NavigationContext.Provider>
  );
};
