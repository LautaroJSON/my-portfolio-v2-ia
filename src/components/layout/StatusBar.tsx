'use client';

import { useLocale } from 'next-intl';
import { NAV_ITEMS } from '@/lib/navigation';
import type { ISidebarItem } from '@/interfaces/navigation.interface';

interface IStatusBarProps {
  activeSection: ISidebarItem['id'];
  lineCount: number;
  className?: string;
}

export const StatusBar = ({
  activeSection,
  lineCount,
  className = '',
}: IStatusBarProps) => {
  const locale = useLocale();
  const activeItem = NAV_ITEMS.find((item) => item.id === activeSection);

  return (
    <div
      className={`bg-accent text-sidebar-bg flex items-center justify-between rounded-lg px-3 py-1.5 font-mono text-xs font-medium ${className}`}
    >
      <span>{activeItem?.fileName}</span>
      <span className="flex items-center gap-3">
        <span>{lineCount} lines</span>
        <span>UTF-8</span>
        <span>{locale.toUpperCase()}</span>
      </span>
    </div>
  );
};
