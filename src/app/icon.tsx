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
        color: '#f5a623',
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 700,
      }}
    >
      LF
    </div>,
    { ...size }
  );
};

export default Icon;
