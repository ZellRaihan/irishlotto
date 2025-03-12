import { unstable_cache } from 'next/cache';
import crypto from 'crypto';

// Cache keys
export const CACHE_KEYS = {
  LATEST_RESULTS: 'latest-results',
  HISTORY_RESULTS: 'history-results',
  RESULT_BY_DATE: (date: string) => `result-${date}`,
} as const;

// Cache TTL in seconds (default: 1 hour)
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '3600', 10);

// Maximum cache TTL (24 hours) to prevent excessive caching
const MAX_CACHE_TTL = 86400;

// Ensure cache TTL is within reasonable limits
const VALIDATED_CACHE_TTL = Math.min(Math.max(CACHE_TTL, 60), MAX_CACHE_TTL);

// Generic cache wrapper with error handling
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  tags: string[] = []
): Promise<T> {
  try {
    return await unstable_cache(
      async () => {
        try {
          return await fn();
        } catch (error) {
          console.error(`Cache function execution error for key ${key}:`, error);
          throw error; // Re-throw to be caught by the outer try-catch
        }
      },
      [key],
      {
        tags,
        revalidate: VALIDATED_CACHE_TTL,
      }
    )();
  } catch (error) {
    console.error(`Cache retrieval error for key ${key}:`, error);
    // Fall back to direct function execution if caching fails
    return fn();
  }
}

// Secure cache token validation using constant-time comparison to prevent timing attacks
export function validateCacheToken(token: string | null): boolean {
  if (!token) return false;
  
  const validToken = process.env.REVALIDATE_TOKEN;
  if (!validToken) return false;
  
  // Use crypto.timingSafeEqual to prevent timing attacks
  try {
    const tokenBuffer = Buffer.from(token);
    const validTokenBuffer = Buffer.from(validToken);
    
    // If lengths differ, create a new buffer of the same length to prevent leaking length info
    if (tokenBuffer.length !== validTokenBuffer.length) {
      return false;
    }
    
    return crypto.timingSafeEqual(tokenBuffer, validTokenBuffer);
  } catch (error) {
    console.error('Error validating cache token:', error);
    return false;
  }
}

// Helper function to generate a secure revalidation token
export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
