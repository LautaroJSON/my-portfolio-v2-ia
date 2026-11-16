import type { IProfile } from '@/interfaces/profile.interface';

// The professional title is localized ("Full Stack Engineer" /
// "Desarrollador Full Stack"), so it lives in `messages/{locale}.json`
// under `home.role` and `metadata.jobTitle`, not here.
export const profile: IProfile = {
  name: 'Lautaro Fernandez',
  location: 'Buenos Aires, Argentina',
};
