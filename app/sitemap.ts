import { MetadataRoute } from 'next'
import clientPromise from '@/lib/mongodb'
import type { LotteryDraw } from '@/types/lottery'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all lottery results for dynamic routes
  const client = await clientPromise
  const db = client.db("lottery")
  const results = await db
    .collection<LotteryDraw>("lottoresults")
    .find({})
    .sort({ drawDate: -1 })
    .toArray()

  // Create URLs for each lottery result
  const resultUrls = results.map((result) => ({
    url: `https://irishlottoresults.co.uk/results/${result._id}`,
    lastModified: new Date(result.drawDate),
    changeFrequency: 'never' as const,
    priority: 0.7,
  }))

  // Static routes
  const routes = [
    {
      url: 'https://irishlottoresults.co.uk',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://irishlottoresults.co.uk/results/history',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://irishlottoresults.co.uk/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://irishlottoresults.co.uk/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://irishlottoresults.co.uk/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: 'https://irishlottoresults.co.uk/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
  ]

  return [...routes, ...resultUrls]
}
