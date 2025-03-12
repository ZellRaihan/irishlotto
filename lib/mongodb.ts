import { MongoClient, MongoClientOptions } from 'mongodb'
import { withCache, CACHE_KEYS } from './cache'
import { LotteryDraw } from '@/types/lottery'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
// Improved MongoDB connection options with connection pooling and timeout settings
const options: MongoClientOptions = {
  maxPoolSize: 10, // Maximum number of connections in the connection pool
  minPoolSize: 5,  // Minimum number of connections in the connection pool
  connectTimeoutMS: 10000, // Connection timeout
  socketTimeoutMS: 45000, // Socket timeout
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Connection retry logic
const connectWithRetry = async (uri: string, options: MongoClientOptions): Promise<MongoClient> => {
  const MAX_RETRIES = 3;
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const client = new MongoClient(uri, options);
      return await client.connect();
    } catch (error) {
      retries++;
      console.error(`MongoDB connection attempt ${retries} failed:`, error);
      
      if (retries >= MAX_RETRIES) {
        console.error('Max retries reached. Unable to connect to MongoDB.');
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
    }
  }
  
  throw new Error('Failed to connect to MongoDB after multiple retries');
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = connectWithRetry(uri, options)
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = connectWithRetry(uri, options)
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Helper function to safely execute database operations with error handling
export async function safeDbOperation<T>(operation: () => Promise<T>, fallback: T | null = null): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    return fallback;
  }
}

// Database name constant to ensure consistency
export const DB_NAME = process.env.DB_NAME || "lottery";

// Database functions with caching
export async function getLotteryResults() {
  return withCache(
    CACHE_KEYS.LATEST_RESULTS,
    async () => {
      const client = await clientPromise
      const db = client.db(DB_NAME)
      
      // Get the latest result with error handling
      const latest = await safeDbOperation(
        () => db
          .collection<LotteryDraw>("lottoresults")
          .findOne({}, { sort: { drawDate: -1 } }),
        null
      );

      // Get past results (excluding the latest) with error handling
      const pastResults = await safeDbOperation(
        () => db
          .collection<LotteryDraw>("lottoresults")
          .find({})
          .sort({ drawDate: -1 })
          .skip(1)
          .limit(5)
          .toArray(),
        []
      );

      return { latest, pastResults }
    },
    ['results']
  )
}

export async function getResultByDate(date: string) {
  return withCache(
    CACHE_KEYS.RESULT_BY_DATE(date),
    async () => {
      return safeDbOperation(async () => {
        const client = await clientPromise
        const db = client.db(DB_NAME)
        
        return db
          .collection<LotteryDraw>("lottoresults")
          .findOne({ drawDate: date })
      });
    },
    ['results', `date-${date}`]
  )
}

export async function getLatestResult() {
  return withCache(
    'latest-result',
    async () => {
      return safeDbOperation(async () => {
        const client = await clientPromise
        const db = client.db(DB_NAME)
        
        return db
          .collection<LotteryDraw>("lottoresults")
          .findOne({}, { sort: { drawDate: -1 } })
      });
    },
    ['results']
  )
}

export async function getHistoryResults(page = 1, limit = 20) {
  return withCache(
    `${CACHE_KEYS.HISTORY_RESULTS}-page-${page}-limit-${limit}`,
    async () => {
      return safeDbOperation(async () => {
        const client = await clientPromise
        const db = client.db(DB_NAME)
        
        // Add pagination to prevent loading all results at once
        const skip = (page - 1) * limit;
        
        const results = await db
          .collection<LotteryDraw>("lottoresults")
          .find({})
          .sort({ drawDate: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
          
        // Get total count for pagination
        const totalCount = await db
          .collection<LotteryDraw>("lottoresults")
          .countDocuments();
          
        return {
          results,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalItems: totalCount
          },
          isDataAvailable: results.length > 0
        };
      }, { 
        results: [], 
        pagination: { currentPage: 1, totalPages: 1, totalItems: 0 },
        isDataAvailable: false
      });
    },
    ['results', `page-${page}`]
  )
}
