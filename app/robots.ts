import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.irishlottoresults.co.uk'
    : 'http://localhost:3000'
    
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*', 
          '/admin/*', 
          '/_next/*',
          '/static/*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/*', '/admin/*'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/*', '/admin/*'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
