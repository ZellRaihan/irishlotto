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
    url: `https://irishlottoresults.ie/results/${result._id}`,
    lastModified: new Date(result.drawDate),
    changeFrequency: 'never' as const,
    priority: 0.7,
  }))

  // Static routes
  const routes = [
    {
      url: 'https://irishlottoresults.ie',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://irishlottoresults.ie/results/history',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  return [...routes, ...resultUrls]
}
