export type SectionId = 'home' | 'experience' | 'projects' | 'contact';

export interface ISidebarItem {
  id: SectionId;
  labelKey: string;
  fileName: string;
  href: string;
}
