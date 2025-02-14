import { MongoClient } from 'mongodb'
import { withCache, CACHE_KEYS } from './cache'
import { LotteryDraw } from '@/types/lottery'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Database functions with caching
export async function getLotteryResults() {
  return withCache(
    CACHE_KEYS.LATEST_RESULTS,
    async () => {
      const client = await clientPromise
      const db = client.db()
      
      // Get the latest result
      const latest = await db
        .collection<LotteryDraw>("lottoresults")
        .findOne({}, { sort: { drawDate: -1 } })

      // Get past results (excluding the latest)
      const pastResults = await db
        .collection<LotteryDraw>("lottoresults")
        .find({})
        .sort({ drawDate: -1 })
        .skip(1)
        .limit(5)
        .toArray()

      return { latest, pastResults }
    },
    ['results']
  )
}

export async function getResultByDate(date: string) {
  return withCache(
    CACHE_KEYS.RESULT_BY_DATE(date),
    async () => {
      const client = await clientPromise
      const db = client.db()
      
      return db
        .collection<LotteryDraw>("lottoresults")
        .findOne({ drawDate: date })
    },
    ['results', `date-${date}`]
  )
}

export async function getLatestResult() {
  return withCache(
    'latest-result',
    async () => {
      const client = await clientPromise
      const db = client.db()
      
      return db
        .collection<LotteryDraw>("lottoresults")
        .findOne({}, { sort: { drawDate: -1 } })
    },
    ['results']
  )
}

export async function getHistoryResults() {
  return withCache(
    CACHE_KEYS.HISTORY_RESULTS,
    async () => {
      const client = await clientPromise
      const db = client.db()
      
      return db
        .collection<LotteryDraw>("lottoresults")
        .find({})
        .sort({ drawDate: -1 })
        .toArray()
    },
    ['results']
  )
}
