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
          backgroundColor: '#16232B',
          padding: '72px 80px',
          color: '#F8F5EF',
          fontFamily: 'serif',
          border: '12px solid #2A4759',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(248, 245, 239, 0.15)',
            paddingBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 28,
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: '#F8F5EF',
              }}
            >
              GENTLEMAN’S
            </span>
            <span
              style={{
                fontSize: 13,
                letterSpacing: '0.25em',
                color: '#F79B72',
                fontFamily: 'sans-serif',
                marginTop: 4,
              }}
            >
              GROOMING BAR · HARARE
            </span>
          </div>

          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 14,
              letterSpacing: '0.15em',
              color: 'rgba(248, 245, 239, 0.6)',
              textTransform: 'uppercase',
            }}
          >
            Avondale Studio · Est. 2018
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px' }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 400,
              color: '#F8F5EF',
              letterSpacing: '-0.02em',
            }}
          >
            Looking sharp is only half the story.
          </div>
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              color: 'rgba(248, 245, 239, 0.75)',
              fontFamily: 'sans-serif',
              marginTop: 20,
              fontWeight: 300,
            }}
          >
            Traditional gentlemanly refinement interpreted through a modern African grooming lounge in Avondale. Precision cuts, beard sculpting, and hot towel rituals.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(248, 245, 239, 0.15)',
            paddingTop: '24px',
            fontFamily: 'sans-serif',
            fontSize: 14,
            color: 'rgba(248, 245, 239, 0.65)',
          }}
        >
          <span>12 Bath Road, Avondale, Harare</span>
          <span style={{ color: '#F79B72' }}>gentlemansbar.co.zw</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
