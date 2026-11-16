import type { IProfile } from '@/interfaces/profile.interface';

// The visible professional title is localized ("Full Stack Engineer" /
// "Desarrollador Full Stack") and lives in `messages/{locale}.json` under
// `home.role`. `jobTitle` is the canonical title used in the Person JSON-LD,
// identical in every locale so it matches the CV and LinkedIn.
export const profile: IProfile = {
  name: 'Lautaro Fernandez',
  location: 'Buenos Aires, Argentina',
  jobTitle: 'Full Stack Engineer',
};
