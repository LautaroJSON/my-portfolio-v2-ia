import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactSection } from '@/components/sections/ContactSection';
import { buildMetadata } from '@/lib/seo';

interface IContactPageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({
  params,
}: IContactPageProps): Promise<Metadata> => {
  const { locale } = await params;
  return buildMetadata({ locale, section: 'contact' });
};

const ContactPage = async ({ params }: IContactPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactSection />;
};

export default ContactPage;
