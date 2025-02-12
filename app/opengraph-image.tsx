import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Irish Lotto Results'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              background: 'linear-gradient(to right, #2563eb, #3b82f6)',
              padding: '1.5rem 3rem',
              borderRadius: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h1
              style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                background: 'white',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Irish Lotto
            </h1>
          </div>
          <p
            style={{
              fontSize: '2rem',
              color: '#4b5563',
            }}
          >
            Check Latest Results & Winning Numbers
          </p>
        </div>
      </div>
    )
  )
}
