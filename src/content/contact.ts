import type { IContactInfo } from '@/interfaces/contact.interface';

export const contactInfo: IContactInfo = {
  email: 'fernandez.n.lautaro@gmail.com',
  cvDownloadUrl: '/cv-lautaro-fernandez.pdf',
  socialLinks: [
    {
      platform: 'email',
      label: 'Email',
      url: 'mailto:fernandez.n.lautaro@gmail.com',
      icon: 'Mail',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lautaro-fernandez-json/',
      icon: 'Linkedin',
    },
    {
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/LautaroJSON',
      icon: 'Github',
    },
  ],
};
