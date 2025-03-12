'use client';

import { formatDistanceToNow, format, isAfter, formatDistanceStrict, isSameDay, isToday as isDateToday } from 'date-fns';
import { Calendar, Clock, Info } from 'lucide-react';
import { CountdownTimer } from './countdown-timer';
import { Button } from './ui/button';
import Link from 'next/link';
import { formatDublinDate, getCurrentDublinTime, convertToDublinTime } from '@/utils/formatters';
import { formatInTimeZone } from 'date-fns-tz';
import { useState, useEffect } from 'react';

interface NextDrawInfoProps {
  requestedDate: Date;
  latestResultDate: Date | null;
  nextDrawDate: Date;
  className?: string;
}

export function NextDrawInfo({ 
  requestedDate, 
  latestResultDate, 
  nextDrawDate, 
  className 
}: NextDrawInfoProps) {
  const [dublinTime, setDublinTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch current Dublin time from the server
  useEffect(() => {
    const fetchDublinTime = async () => {
      try {
        const response = await fetch('/api/timer?targetDate=' + new Date().toISOString());
        if (response.ok) {
          const data = await response.json();
          setDublinTime(data.dublinTime);
        }
      } catch (error) {
        console.error('Error fetching Dublin time:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDublinTime();
    
    // Refresh Dublin time every minute
    const timer = setInterval(fetchDublinTime, 60000);
    return () => clearInterval(timer);
  }, []);
  
  // Get current time in Dublin timezone
  const now = getCurrentDublinTime();
  
  // Convert all dates to Dublin timezone using our utility function
  const requestedDateDublin = convertToDublinTime(requestedDate);
  const latestResultDateDublin = latestResultDate ? convertToDublinTime(latestResultDate) : null;
  const nextDrawDateDublin = convertToDublinTime(nextDrawDate);
  
  // Determine if the requested date is today's draw
  const isToday = isSameDay(requestedDateDublin, now);
  
  // Determine if we should use the requested date for the timer
  // Use requested date if it's today and before 8 PM
  const useRequestedDateForTimer = isToday && now.getHours() < 20;
  
  // Set the draw time to 8:00 PM IST
  // If the requested date is today and before 8 PM, use that for the timer
  // Otherwise, use the next draw date
  const timerDate = useRequestedDateForTimer ? requestedDateDublin : nextDrawDateDublin;
  const drawTime = new Date(timerDate);
  drawTime.setHours(20, 0, 0, 0);
  
  // Calculate time since last result if available
  const timeSinceLastResult = latestResultDateDublin 
    ? formatDistanceStrict(now, latestResultDateDublin)
    : null;
  
  // Determine if this is a future draw or a pending update
  const isFutureDraw = isAfter(requestedDateDublin, now);
  
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
        <h2 className="text-xl font-bold text-white text-center">
          Results Coming Soon
        </h2>
        {dublinTime && (
          <p className="text-center text-white text-sm mt-1">
            Current Irish Time: {dublinTime}
          </p>
        )}
      </div>
      
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          
          <p className="text-lg text-gray-700">
            The lottery results for <span className="font-semibold">{format(requestedDateDublin, 'MMMM d, yyyy')}</span> are not available yet.
          </p>
          
          {useRequestedDateForTimer ? (
            <p className="text-gray-600">
              Today's draw will take place at <span className="font-semibold">8:00 PM IST</span>.
            </p>
          ) : (
            <p className="text-gray-600">
              The next draw will be on <span className="font-semibold">{format(nextDrawDateDublin, 'EEEE, MMMM d')} at 8:00 PM IST</span>.
            </p>
          )}
        </div>
        
        {/* Countdown Timer */}
        <CountdownTimer targetDate={drawTime} />
        
        {/* Additional Information */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-blue-800">About This Page</h3>
              
              {isFutureDraw ? (
                <p className="text-sm text-blue-700">
                  You're viewing a future draw date. Results will be available shortly after the draw takes place.
                </p>
              ) : useRequestedDateForTimer ? (
                <p className="text-sm text-blue-700">
                  You're viewing today's draw. Results will be available shortly after the draw takes place at 8:00 PM IST.
                </p>
              ) : (
                <p className="text-sm text-blue-700">
                  {latestResultDateDublin ? (
                    <>
                      The most recent results in our database are from {format(latestResultDateDublin, 'MMMM d, yyyy')} ({timeSinceLastResult} ago).
                      We're waiting for the latest results to be published.
                    </>
                  ) : (
                    <>
                      We're waiting for the results to be published. Results are typically available within 15-30 minutes after the draw.
                    </>
                  )}
                </p>
              )}
              
              <p className="text-sm text-blue-700">
                <Clock className="inline-block h-4 w-4 mr-1 mb-1" />
                Irish Lotto draws take place every Wednesday and Saturday at 8:00 PM IST.
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/" className="gap-2">
              <Calendar className="w-4 h-4" />
              View Latest Results
            </Link>
          </Button>
          <Button asChild>
            <Link href="/results/archive" className="gap-2">
              <Calendar className="w-4 h-4" />
              Browse Past Results
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 