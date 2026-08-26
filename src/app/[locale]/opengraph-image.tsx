import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { profile } from '@/content/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface IOpengraphImageProps {
  params: Promise<{ locale: string }>;
}

const OpengraphImage = async ({ params }: IOpengraphImageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#050608',
        padding: '80px',
        fontFamily: 'monospace',
      }}
    >
      <div style={{ display: 'flex', color: '#f5a623', fontSize: 28 }}>
        {'> portfolio --whoami'}
      </div>
      <div
        style={{
          display: 'flex',
          color: '#f5a623',
          fontSize: 72,
          fontWeight: 700,
          marginTop: 24,
        }}
      >
        {profile.name}
      </div>
      <div
        style={{
          display: 'flex',
          color: '#f2f0ea',
          fontSize: 40,
          marginTop: 12,
        }}
      >
        {t('ogRole')}
      </div>
      <div
        style={{
          display: 'flex',
          color: 'rgba(242,240,234,0.6)',
          fontSize: 26,
          marginTop: 40,
        }}
      >
        {t('ogStack')}
      </div>
      <div
        style={{
          display: 'flex',
          color: 'rgba(242,240,234,0.35)',
          fontSize: 22,
          marginTop: 8,
        }}
      >
        {profile.location}
      </div>
    </div>,
    { ...size }
  );
};

export default OpengraphImage;
