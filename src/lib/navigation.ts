import type {
  ISidebarItem,
  SectionId,
} from '@/interfaces/navigation.interface';

export const NAV_ITEMS: ISidebarItem[] = [
  { id: 'home', labelKey: 'home', fileName: 'home.tsx', href: '/' },
  {
    id: 'experience',
    labelKey: 'experience',
    fileName: 'experience.tsx',
    href: '/experience',
  },
  {
    id: 'projects',
    labelKey: 'projects',
    fileName: 'projects.tsx',
    href: '/projects',
  },
  {
    id: 'contact',
    labelKey: 'contact',
    fileName: 'contact.tsx',
    href: '/contact',
  },
];

const DEFAULT_SECTION: SectionId = 'home';

export const getSectionHref = (id: SectionId): string => {
  return NAV_ITEMS.find((item) => item.id === id)?.href ?? '/';
};

// `pathname` comes from next-intl's `usePathname`, so it never carries the
// locale prefix (`/experience`, `/`).
export const getSectionFromPathname = (pathname: string): SectionId => {
  const firstSegment = `/${pathname.split('/').filter(Boolean)[0] ?? ''}`;
  const match = NAV_ITEMS.find((item) => item.href === firstSegment);

  return match?.id ?? DEFAULT_SECTION;
};
