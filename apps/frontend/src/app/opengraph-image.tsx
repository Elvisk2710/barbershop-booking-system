import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Gentleman's Grooming Bar | Harare";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          padding: '80px 88px',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.03em' }}>Gentleman’s</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 112, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>
            The hour is yours.
          </span>
          <span style={{ fontSize: 32, color: 'rgba(245,245,247,0.6)', marginTop: 28, letterSpacing: '-0.01em' }}>
            Barbershop in Avondale, Harare. Appointments only.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
