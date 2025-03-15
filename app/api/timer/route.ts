import { NextRequest, NextResponse } from 'next/server';
import { getCurrentDublinTime, convertToDublinTime } from '@/utils/formatters';
import { format, isSameDay } from 'date-fns';

// Make this route dynamic to avoid static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 5;

export async function GET(request: NextRequest) {
  try {
    // Get the target date from the URL instead of using nextUrl.searchParams
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const targetDateParam = searchParams.get('targetDate');
    const forceShowParam = searchParams.get('forceShow');
    
    if (!targetDateParam) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing targetDate parameter',
          message: 'Please provide a targetDate parameter in ISO format',
          timestamp: new Date().toISOString()
        }, 
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store'
          }
        }
      );
    }
    
    // Parse the target date and convert to Dublin timezone
    const targetDate = convertToDublinTime(new Date(targetDateParam));
    
    // Get current time in Dublin timezone
    const dublinNow = getCurrentDublinTime();
    
    // Special handling for today's draw
    const isToday = isSameDay(targetDate, dublinNow);
    const forceShow = forceShowParam === 'true';
    
    // If it's today's draw and before 8 PM in Dublin, always show the timer
    // regardless of the user's local time
    if (isToday && dublinNow.getHours() < 20) {
      // Set target to today at 8 PM Dublin time
      const todayAt8PM = new Date(targetDate);
      todayAt8PM.setHours(20, 0, 0, 0);
      
      // Calculate time difference in milliseconds
      const difference = todayAt8PM.getTime() - dublinNow.getTime();
      
      // Calculate the time components
      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
      
      return NextResponse.json({
        success: true,
        expired: false,
        timeLeft,
        serverTime: dublinNow.toISOString(),
        targetTime: todayAt8PM.toISOString(),
        dublinTime: format(dublinNow, 'HH:mm:ss'),
        isToday: true,
        timestamp: new Date().toISOString()
      }, {
        headers: {
          // Cache for a short time (5 seconds)
          'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=3'
        }
      });
    }
    
    // Calculate time difference in milliseconds
    const difference = targetDate.getTime() - dublinNow.getTime();
    
    // Check if the target date has already passed
    if (difference <= 0 && !forceShow) {
      return NextResponse.json({
        success: true,
        expired: true,
        timeLeft: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        serverTime: dublinNow.toISOString(),
        targetTime: targetDate.toISOString(),
        dublinTime: format(dublinNow, 'HH:mm:ss'),
        timestamp: new Date().toISOString()
      }, {
        headers: {
          // Cache expired results for longer (1 minute)
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      });
    }
    
    // Calculate the time components
    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
    
    // Return the time left in JSON format
    return NextResponse.json({
      success: true,
      expired: false,
      timeLeft,
      serverTime: dublinNow.toISOString(),
      targetTime: targetDate.toISOString(),
      dublinTime: format(dublinNow, 'HH:mm:ss'),
      timestamp: new Date().toISOString()
    }, {
      headers: {
        // Cache for a short time (5 seconds)
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=3'
      }
    });
    
  } catch (error) {
    console.error('Error calculating time remaining:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Server error',
        message: 'An error occurred while calculating the time remaining',
        timestamp: new Date().toISOString()
      }, 
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
} 