interface ISidebarNavItemProps {
  label: string;
  translatedLabel: string;
  isActive: boolean;
  onClick: () => void;
}

export const SidebarNavItem = ({
  label,
  translatedLabel,
  isActive,
  onClick,
}: ISidebarNavItemProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
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
      </button>
    </li>
  );
};
