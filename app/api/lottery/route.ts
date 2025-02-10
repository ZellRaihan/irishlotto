import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { LotteryDraw } from '@/types/lottery';
import { WithId } from 'mongodb';

export async function GET(request: Request) {
  try {
    console.log('Attempting to connect to MongoDB...');
    const client = await clientPromise;
    console.log('MongoDB connection successful');
    
    const db = client.db('lottery');
    console.log('Accessing lottery database');
    
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let query = {};
    if (date) {
      query = { _id: date };
    }
    
    console.log('Executing query:', JSON.stringify(query));
    const results = await db
      .collection<LotteryDraw>('lottoresults')
      .find(query)
      .sort({ drawDate: -1 })
      .limit(limit)
      .toArray() as WithId<LotteryDraw>[];
    
    console.log(`Found ${results.length} results`);
    
    if (!results || results.length === 0) {
      return NextResponse.json({ error: 'No results found' }, { status: 404 });
    }
      
    return NextResponse.json(results);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lottery results', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
