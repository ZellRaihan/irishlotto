import { unstable_cache } from 'next/cache';

// Cache keys
export const CACHE_KEYS = {
  LATEST_RESULTS: 'latest-results',
  HISTORY_RESULTS: 'history-results',
  RESULT_BY_DATE: (date: string) => `result-${date}`,
} as const;

// Cache TTL in seconds (default: 1 hour)
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '3600', 10);

// Generic cache wrapper
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  tags: string[] = []
): Promise<T> {
  return unstable_cache(
    fn,
    [key],
    {
      tags,
      revalidate: CACHE_TTL,
    }
  )();
}

// Cache validation
export function validateCacheToken(token: string | null): boolean {
  const validToken = process.env.REVALIDATE_TOKEN;
  return token === validToken;
}
