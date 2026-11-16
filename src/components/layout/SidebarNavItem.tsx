import { Link } from '@/i18n/navigation';

interface ISidebarNavItemProps {
  href: string;
  label: string;
  translatedLabel: string;
  isActive: boolean;
}

export const SidebarNavItem = ({
  href,
  label,
  translatedLabel,
  isActive,
}: ISidebarNavItemProps) => {
  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        aria-label={translatedLabel}
        className={`focus-visible:outline-accent flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 ${
          isActive ? 'bg-sidebar-active-bg' : ''
        }`}
      >
        <span className={isActive ? 'text-accent' : 'text-text-muted'}>
          {'>'}
        </span>
        <span
          className={isActive ? 'text-text-primary' : 'text-text-secondary'}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};
