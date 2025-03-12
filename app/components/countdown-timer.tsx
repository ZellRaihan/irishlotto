'use client';

import { useEffect, useState, useRef } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Store server time offset for client-side updates
  const serverTimeOffsetRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);

  // Function to update time locally between API calls
  const updateTimeLocally = () => {
    if (isExpired) return;
    
    // Calculate time difference using the server time offset
    const now = Date.now() + serverTimeOffsetRef.current;
    const difference = targetTimeRef.current - now;
    
    if (difference <= 0) {
      setIsExpired(true);
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      return;
    }
    
    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    });
  };

  useEffect(() => {
    // Function to fetch time from the server
    const fetchTimeRemaining = async () => {
      try {
        // Convert the target date to ISO string for the API
        const targetDateISO = targetDate.toISOString();
        
        // Fetch the time remaining from the server
        const response = await fetch(`/api/timer?targetDate=${encodeURIComponent(targetDateISO)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch time remaining');
        }
        
        const data = await response.json();
        
        if (data.expired) {
          setIsExpired(true);
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          });
        } else {
          setTimeLeft(data.timeLeft);
          
          // Calculate and store the server time offset
          const serverTime = new Date(data.serverTime).getTime();
          const clientTime = Date.now();
          serverTimeOffsetRef.current = serverTime - clientTime;
          
          // Store the target time for local updates
          targetTimeRef.current = new Date(data.targetTime).getTime();
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching time remaining:', err);
        setError('Failed to load countdown timer');
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchTimeRemaining();

    // Set up interval to update locally every second
    const localTimer = setInterval(() => {
      updateTimeLocally();
    }, 1000);
    
    // Set up interval to fetch from server every 10 seconds
    const serverTimer = setInterval(() => {
      fetchTimeRemaining();
    }, 10000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(localTimer);
      clearInterval(serverTimer);
    };
  }, [targetDate]);

  // Format numbers to always have two digits
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  if (isLoading) {
    return (
      <div className={`my-8 text-center ${className || ''}`}>
        <p className="text-gray-600">Loading countdown...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`my-8 text-center ${className || ''}`}>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className={`text-center ${className || ''}`}>
        <p className="text-lg text-blue-600 font-medium">Results should be available now!</p>
        <p className="text-sm text-gray-500 mt-1">Try refreshing the page to see the latest results.</p>
      </div>
    );
  }

  return (
    <div className={`my-8 ${className || ''}`}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Next Draw Countdown</h2>
      <p className="text-center text-sm text-gray-500 mb-4">Time shown in Irish Standard Time (IST)</p>
      
      <div className="flex justify-center gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {formatNumber(timeLeft.days)}
          </div>
          <span className="text-sm text-gray-600 mt-1">Days</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {formatNumber(timeLeft.hours)}
          </div>
          <span className="text-sm text-gray-600 mt-1">Hours</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {formatNumber(timeLeft.minutes)}
          </div>
          <span className="text-sm text-gray-600 mt-1">Minutes</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {formatNumber(timeLeft.seconds)}
          </div>
          <span className="text-sm text-gray-600 mt-1">Seconds</span>
        </div>
      </div>
    </div>
  );
}