'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { LotteryDraw } from '@/types/lottery';
import { formatCurrency } from '@/utils/formatters';

type PlusDrawType = 'plusOne' | 'plusTwo';

export default function LotteryResults() {
  const [results, setResults] = useState<LotteryDraw[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/lottery');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError('Failed to load lottery results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-600 p-4">
      {error}
    </div>
  );

  return (
    <div className="space-y-8">
      {results.map((draw) => (
        <div key={draw._id} className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Draw Date: {format(new Date(draw.drawDate), 'PPP')}
          </h2>
          
          {/* Main Draw */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{draw.mainDraw.gameType}</h3>
              <div className="text-green-600 font-semibold">
                Jackpot: {formatCurrency(draw.mainDraw.jackpotAmount)}
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              {draw.mainDraw.winningNumbers.standard.map((num: number, i: number) => (
                <span 
                  key={i} 
                  className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-lg"
                >
                  {num}
                </span>
              ))}
              <div className="flex items-center">
                <span className="mx-2 text-gray-500">Bonus</span>
                <span className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-white rounded-full font-bold text-lg">
                  {draw.mainDraw.winningNumbers.bonus}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm">{draw.mainDraw.prizeMessage}</p>
          </div>

          {/* Plus Draws */}
          <div className="space-y-6">
            {(['plusOne', 'plusTwo'] as const).map((drawType) => {
              const plusDraw = drawType === 'plusOne' ? draw.plusOne : draw.plusTwo;
              return (
                <div key={drawType} className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{plusDraw.gameType}</h3>
                    <div className="text-green-600 font-semibold">
                      Jackpot: {formatCurrency(plusDraw.jackpotAmount)}
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    {plusDraw.winningNumbers.standard.map((num: number, i: number) => (
                      <span 
                        key={i} 
                        className="w-8 h-8 flex items-center justify-center bg-blue-400 text-white rounded-full font-bold"
                      >
                        {num}
                      </span>
                    ))}
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-500 text-sm">Bonus</span>
                      <span className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-white rounded-full font-bold">
                        {plusDraw.winningNumbers.bonus}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{plusDraw.prizeMessage}</p>
                </div>
              );
            })}
          </div>

          {/* Raffle */}
          <div className="border-t mt-6 pt-6">
            <h3 className="text-lg font-semibold mb-2">Raffle Results</h3>
            <p className="text-gray-600 text-sm">
              Raffle ID: {draw.raffle.id} - {draw.raffle.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
