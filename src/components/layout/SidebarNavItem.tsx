interface ISidebarNavItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export const SidebarNavItem = ({
  href,
  label,
  isActive,
  onClick,
}: ISidebarNavItemProps) => {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        className={`flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm ${
          isActive ? 'bg-sidebar-active-bg' : ''
        }`}
      >
        <span className={isActive ? 'text-accent' : 'text-text-secondary'}>
          {'>'}
        </span>
        <span
          className={isActive ? 'text-text-primary' : 'text-text-secondary'}
        >
          {label}
        </span>
      </a>
    </li>
  );
};
