import { MetadataRoute } from 'next'
import clientPromise from '@/lib/mongodb'
import type { LotteryDraw } from '@/types/lottery'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Get all lottery results for dynamic routes
    const client = await clientPromise
    const db = client.db("lottery")
    const results = await db
      .collection<LotteryDraw>("lottoresults")
      .find({})
      .sort({ drawDate: -1 })
      .toArray()

    // Base URL for all routes
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://www.irishlottoresults.co.uk'
      : 'http://localhost:3000'

    // Create URLs for each lottery result
    const resultUrls = results.map((result) => ({
      url: `${baseUrl}/results/${result._id}`,
      lastModified: new Date(result.drawDate),
      changeFrequency: 'never' as const,
      priority: 0.7,
    }))

    // Static routes
    const routes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/results/history`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.4,
      },
    ]

    // Combine all routes
    return [...routes, ...resultUrls]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return only static routes if database connection fails
    return [
      {
        url: 'https://www.irishlottoresults.co.uk',
        lastModified: new Date(),
        changeFrequency: 'always' as const,
        priority: 1,
      }
    ]
  }
}
