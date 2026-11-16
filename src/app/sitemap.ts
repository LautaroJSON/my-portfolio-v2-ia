import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { NAV_ITEMS } from '@/lib/navigation';
import { buildLanguageAlternates, buildSectionUrl } from '@/lib/seo';

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  return NAV_ITEMS.flatMap((item) =>
    routing.locales.map((locale) => ({
      url: buildSectionUrl(locale, item.id),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: item.id === 'home' ? 1 : 0.8,
      alternates: {
        languages: buildLanguageAlternates(item.id),
      },
    }))
  );
};

export default sitemap;
