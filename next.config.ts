import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  agentRules: false,
  // The downloadable CVs (`/cv-lautaro-fernandez-{en|es}.pdf`) must keep
  // working from the Contact button but stay out of search results.
  headers: async () => {
    return [
      {
        source: '/:file(cv-lautaro-fernandez-.+\\.pdf)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
