import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { RateLimiter } from '../../../lib/rate-limiter'

// Rate limiting constants from environment variables with fallbacks
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10); // Default: 1 minute (in seconds)
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.MAX_REQUESTS_PER_WINDOW || '5', 10); // Default: 5 requests
const DISABLE_RATE_LIMIT = process.env.DISABLE_RATE_LIMIT === 'true'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// List of valid cache tags to prevent arbitrary tag revalidation
const VALID_CACHE_TAGS = ['results', 'latest-results', 'history-results'];

// Initialize rate limiter
const rateLimiter = new RateLimiter(RATE_LIMIT_WINDOW, MAX_REQUESTS_PER_WINDOW);

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    // Skip rate limiting if disabled (for development)
    if (!DISABLE_RATE_LIMIT) {
      // Check rate limit
      const { success, limit, reset, remaining } = rateLimiter.check(clientIp);
      
      if (!success) {
        console.warn(`Rate limit exceeded for ${clientIp}`);
        
        // Calculate retry-after time
        const retryAfter = Math.ceil(reset / 1000);
        
        // Return rate limit response with headers
        return NextResponse.json(
          {
            success: false,
            error: "Too many requests",
            message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
            retryAfter,
            timestamp: new Date().toISOString()
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
              ...corsHeaders
            }
          }
        );
      }
    }
    
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const rawTags = searchParams.get("tags")?.split(",") || []
    
    // Log the request (without sensitive information)
    console.log(`Cache revalidation request from ${clientIp} with ${rawTags.length} tags`);
    
    // Validate token
    if (token !== process.env.REVALIDATE_TOKEN) {
      console.warn(`Invalid revalidation token from ${clientIp}`);
      return NextResponse.json(
        {
          success: false,
          error: "Authentication failed",
          message: "Invalid revalidation token",
          timestamp: new Date().toISOString()
        },
        { 
          status: 401,
          headers: corsHeaders
        }
      );
    }

    // Filter tags to only allow valid ones
    const tags = rawTags
      .filter(tag => {
        // Allow specific date tags (result-YYYY-MM-DD)
        if (tag.startsWith('result-') && /^result-\d{4}-\d{2}-\d{2}$/.test(tag)) {
          return true;
        }
        // Allow predefined valid tags
        return VALID_CACHE_TAGS.includes(tag.trim());
      })
      .map(tag => tag.trim())
      .filter(Boolean);
      
    // If invalid tags were provided, log it
    const invalidTags = rawTags.filter(tag => !tags.includes(tag));
    if (invalidTags.length > 0) {
      console.warn(`Attempted to revalidate invalid tags: ${invalidTags.join(', ')} from ${clientIp}`);
    }

    try {
      // If specific tags are provided, only revalidate those
      if (tags.length > 0) {
        console.log(`Revalidating specific tags: ${tags.join(", ")}`);
        tags.forEach(tag => {
          revalidateTag(tag)
        })
      } else {
        // Otherwise revalidate all result-related tags
        console.log("Revalidating all results tags");
        VALID_CACHE_TAGS.forEach(tag => {
          revalidateTag(tag);
        });
      }

      return NextResponse.json({
        success: true,
        revalidated: true,
        message: tags.length > 0 
          ? `Cache cleared for tags: ${tags.join(", ")}` 
          : "All results cache cleared",
        tags: tags.length > 0 ? tags : VALID_CACHE_TAGS,
        timestamp: new Date().toISOString()
      }, { 
        headers: corsHeaders
      });
    } catch (err) {
      console.error("Error during cache revalidation:", err);
      return NextResponse.json(
        { 
          success: false,
          error: "Cache revalidation failed",
          message: "Error revalidating cache", 
          timestamp: new Date().toISOString() 
        },
        { status: 500, headers: corsHeaders }
      )
    }
  } catch (error) {
    console.error('Cache revalidation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Cache revalidation failed",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}
