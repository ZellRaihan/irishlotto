'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { LotteryDraw } from '@/types/lottery';
import { formatCurrency } from '@/utils/formatters';

type PlusDrawType = 'plusOne' | 'plusTwo';

const LotteryResults: React.FC = () => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {results.map((draw) => (
        <div key={draw._id}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {/* Main Draw */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Main Draw</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {draw.mainDraw.winningNumbers.standard.map((number, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      {number}
                    </div>
                  ))}
                  {draw.mainDraw.winningNumbers.bonus && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow">
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
              const title = drawType === 'plusOne' ? 'Plus One' : 'Plus Two';
              
              return (
                <div key={drawType} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {plusDraw.winningNumbers.standard.map((number, index) => (
                        <div
                          key={index}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                          {number}
                        </div>
                      ))}
                      {plusDraw.winningNumbers.bonus && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow">
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
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Raffle Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
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
};

export default LotteryResults;
