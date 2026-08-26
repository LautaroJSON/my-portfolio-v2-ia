import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

const Icon = () => {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#050608',
        color: '#fdfdfc',
        fontFamily: 'monospace',
        fontSize: 20,
        fontWeight: 800,
        border: '1px solid #fdfdfc',
      }}
    >
      L.
    </div>,
    { ...size }
  );
};

export default Icon;
