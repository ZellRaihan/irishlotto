/**
 * Simple in-memory rate limiter for API routes
 * Note: This implementation is suitable for serverless environments with short-lived instances
 * For production use with multiple instances, consider using Redis or another distributed cache
 */

interface RateLimitCheck {
  success: boolean;    // Whether the request is allowed
  limit: number;       // Maximum requests allowed per window
  remaining: number;   // Remaining requests in current window
  reset: number;       // Milliseconds until the rate limit resets
}

interface RateLimitRecord {
  count: number;       // Number of requests made
  timestamp: number;   // When the window started
}

export class RateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private cache: Map<string, RateLimitRecord>;

  /**
   * Create a new rate limiter
   * @param windowSeconds Time window in seconds
   * @param maxRequests Maximum number of requests allowed per window
   */
  constructor(windowSeconds: number, maxRequests: number) {
    this.windowMs = windowSeconds * 1000;
    this.maxRequests = maxRequests;
    this.cache = new Map<string, RateLimitRecord>();

    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  /**
   * Check if a request should be rate limited
   * @param identifier Unique identifier (usually IP address)
   * @returns Rate limit check result
   */
  public check(identifier: string): RateLimitCheck {
    const now = Date.now();
    const record = this.cache.get(identifier) || { count: 0, timestamp: now };
    
    // Reset if window has expired
    if (now - record.timestamp > this.windowMs) {
      record.count = 1;
      record.timestamp = now;
    } else {
      record.count += 1;
    }
    
    // Update cache
    this.cache.set(identifier, record);
    
    // Calculate remaining requests and reset time
    const remaining = Math.max(0, this.maxRequests - record.count);
    const reset = Math.max(0, this.windowMs - (now - record.timestamp));
    
    return {
      success: record.count <= this.maxRequests,
      limit: this.maxRequests,
      remaining,
      reset
    };
  }

  /**
   * Remove expired entries from the cache
   */
  private cleanup(): void {
    const now = Date.now();
    // Use Array.from to avoid iterator issues
    const keys = Array.from(this.cache.keys());
    
    keys.forEach(key => {
      const record = this.cache.get(key);
      if (record && now - record.timestamp > this.windowMs) {
        this.cache.delete(key);
      }
    });
  }
} 