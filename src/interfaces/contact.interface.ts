export interface ISocialLink {
  platform: 'github' | 'linkedin' | 'email';
  label: string;
  url: string;
  icon: 'Github' | 'Linkedin' | 'Mail';
}

export interface ICvDownload {
  url: string; // path in /public, e.g. "/cv-lautaro-fernandez-en.pdf"
  fileName: string; // name suggested to the browser via `download`
}

export interface IContactInfo {
  email: string;
  cvDownloads: Record<'en' | 'es', ICvDownload>;
  socialLinks: ISocialLink[];
}
