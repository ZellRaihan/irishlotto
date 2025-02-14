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
        <div key={draw._id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in" role="region" aria-label="Latest lottery results">
          {/* Main Draw */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300" role="article" aria-labelledby="main-draw-heading">
            <h2 id="main-draw-heading" className="text-2xl font-bold text-gray-800 mb-4">Main Draw</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2" role="list" aria-label="Winning numbers">
                {draw.mainDraw.winningNumbers.standard.map((number, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow"
                    role="listitem"
                  >
                    {number}
                  </div>
                ))}
                {draw.mainDraw.winningNumbers.bonus && (
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow"
                    role="listitem"
                    aria-label="Bonus number"
                  >
                    {draw.mainDraw.winningNumbers.bonus}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <div className="text-gray-600">Jackpot Amount:</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(draw.mainDraw.jackpotAmount)}
                </div>
              </div>
            </div>
          </div>

          {/* Plus Draws */}
          {(['plusOne', 'plusTwo'] as const).map((drawType) => {
            const plusDraw = drawType === 'plusOne' ? draw.plusOne : draw.plusTwo;
            return (
              <div key={drawType} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300" role="article" aria-labelledby={`${drawType}-heading`}>
                <h2 id={`${drawType}-heading`} className="text-2xl font-bold text-gray-800 mb-4">{drawType.charAt(0).toUpperCase() + drawType.slice(1)}</h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2" role="list" aria-label={`${drawType} winning numbers`}>
                    {plusDraw.winningNumbers.standard.map((number, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow"
                        role="listitem"
                      >
                        {number}
                      </div>
                    ))}
                    {plusDraw.winningNumbers.bonus && (
                      <div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow"
                        role="listitem"
                        aria-label={`${drawType} bonus number`}
                      >
                        {plusDraw.winningNumbers.bonus}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="text-gray-600">Jackpot Amount:</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(plusDraw.jackpotAmount)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Raffle */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 animate-fade-in-up" role="region" aria-labelledby="raffle-heading">
          <h2 id="raffle-heading" className="text-2xl font-bold text-gray-800 mb-4">Raffle Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" role="table">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 border-b border-gray-200 font-semibold text-gray-600">Raffle ID</th>
                  <th className="p-4 border-b border-gray-200 font-semibold text-gray-600">Message</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 border-b border-gray-200">{draw.raffle.id}</td>
                  <td className="p-4 border-b border-gray-200">{draw.raffle.message}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}
