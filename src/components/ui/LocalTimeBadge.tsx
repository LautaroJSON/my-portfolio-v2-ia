'use client';

import { useSyncExternalStore } from 'react';
import { Clock } from 'lucide-react';
import { StatusChip } from '@/components/ui/StatusChip';

const TIME_ZONE = 'America/Argentina/Buenos_Aires';

const formatLocalTime = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

const subscribe = (onChange: () => void) => {
  const interval = setInterval(onChange, 1000);
  return () => clearInterval(interval);
};

const getServerSnapshot = () => null;

interface ILocalTimeBadgeProps {
  ariaLabel: string;
}

export const LocalTimeBadge = ({ ariaLabel }: ILocalTimeBadgeProps) => {
  const time = useSyncExternalStore(
    subscribe,
    formatLocalTime,
    getServerSnapshot
  );

  return (
    <StatusChip ariaLabel={ariaLabel}>
      <Clock size={14} strokeWidth={1.5} aria-hidden="true" />
      <span aria-hidden="true" className="tabular-nums">
        {time ?? '--:--:--'}
      </span>
    </StatusChip>
  );
};
