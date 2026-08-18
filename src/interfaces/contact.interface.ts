export interface ISocialLink {
  platform: 'github' | 'linkedin' | 'email';
  label: string;
  url: string;
  icon: 'Github' | 'Linkedin' | 'Mail';
}

export interface IContactInfo {
  email: string;
  cvDownloadUrl: string;
  socialLinks: ISocialLink[];
}
