import { NextResponse } from 'next/server';
import clientPromise, { DB_NAME, safeDbOperation } from '../../../lib/mongodb';
import type { LotteryDraw } from '../../../types/lottery';
import { WithId } from 'mongodb';
import { format } from "date-fns";
import { headers } from "next/headers";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    // Get client IP for logging
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Validate required parameters
    if (!date) {
      console.warn(`Missing date parameter in request from ${clientIp}`);
      return NextResponse.json(
        { 
          success: false,
          error: "Date parameter is required",
          timestamp: new Date().toISOString()
        },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }
    
    console.log(`Lottery API request for date: ${date} from ${clientIp}`);
    
    // Use safeDbOperation for consistent error handling
    const results = await safeDbOperation(async () => {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      
      const query = { _id: date };
      
      return db
        .collection<LotteryDraw>('lottoresults')
        .find(query)
        .sort({ drawDate: -1 })
        .limit(limit)
        .toArray() as Promise<WithId<LotteryDraw>[]>;
    }, []);
    
    // Handle no results found
    if (!results || results.length === 0) {
      console.log(`No results found for date: ${date}`);
      return NextResponse.json(
        { 
          success: false,
          error: 'No results found',
          params: { date },
          timestamp: new Date().toISOString()
        },
        { 
          status: 404,
          headers: corsHeaders
        }
      );
    }
    
    console.log(`Found ${results.length} results for date: ${date}`);
    return NextResponse.json(
      {
        success: true,
        data: results,
        timestamp: new Date().toISOString()
      },
      {
        headers: corsHeaders
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch lottery results',
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

export const dynamic = "force-dynamic";
