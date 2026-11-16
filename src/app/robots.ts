import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The CV PDFs are also served with `X-Robots-Tag: noindex`
      // (see next.config.ts).
      disallow: '/cv-lautaro-fernandez-*.pdf',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};

export default robots;
