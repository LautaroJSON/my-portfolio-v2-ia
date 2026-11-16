import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware wrappers around Next.js navigation APIs. `usePathname` returns
// the pathname without the locale prefix (`/en/experience` → `/experience`).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
