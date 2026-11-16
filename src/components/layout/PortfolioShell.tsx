'use client';

import type { ReactNode } from 'react';
import { EditorPanel } from '@/components/layout/EditorPanel';
import { usePathname } from '@/i18n/navigation';
import { getSectionFromPathname } from '@/lib/navigation';

interface IPortfolioShellProps {
  children: ReactNode;
}

// The active section is derived from the URL: every section is its own route
// (`/[locale]`, `/[locale]/experience`, …), so the server already sends the
// full HTML of the page and the shell only highlights the matching tab.
export const PortfolioShell = ({ children }: IPortfolioShellProps) => {
  const pathname = usePathname();
  const activeSection = getSectionFromPathname(pathname);

  return <EditorPanel activeSection={activeSection}>{children}</EditorPanel>;
};
