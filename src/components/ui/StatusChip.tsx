import type { ReactNode } from 'react';

interface IStatusChipProps {
  children: ReactNode;
  ariaLabel?: string;
}

export const StatusChip = ({ children, ariaLabel }: IStatusChipProps) => {
  return (
    <span
      aria-label={ariaLabel}
      className="border-border-subtle text-text-secondary inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs"
    >
      {children}
    </span>
  );
};
