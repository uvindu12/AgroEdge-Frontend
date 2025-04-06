// components/cards/forecast-card.tsx
"use client";

import React from 'react';
import { PriceTrendChart } from '../charts/line-chart';

type ForecastData = {
  district: string;
  vegetable: string;
  forecast: Array<{
    date: string;
    predicted_price: number;
  }>;
};

type ForecastCardProps = {
  data: ForecastData;
};

export const ForecastCard: React.FC<ForecastCardProps> = ({ data }) => {
  // Calculate some statistics
  const currentPrice = data.forecast[0].predicted_price;
  const lastPrice = data.forecast[data.forecast.length - 1].predicted_price;
  const priceChange = lastPrice - currentPrice;
  const priceChangePercentage = (priceChange / currentPrice) * 100;
  
  // Calculate min, max, and average prices
  const prices = data.forecast.map(item => item.predicted_price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  return (
    <div className="relative w-full max-w-4xl p-6 bg-white border shadow-lg rounded-2xl">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{data.vegetable}</h2>
            <p className="text-gray-600">{data.district} District</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-3xl font-bold text-gray-800">
              Rs {currentPrice.toFixed(2)}
            </p>
            <div className={`flex items-center ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              <span className="ml-1">{Math.abs(priceChangePercentage).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full mt-4">
          <PriceTrendChart data={data.forecast} />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Min Price</p>
            <p className="text-xl font-semibold text-gray-800">Rs {minPrice.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Max Price</p>
            <p className="text-xl font-semibold text-gray-800">Rs {maxPrice.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">Avg Price</p>
            <p className="text-xl font-semibold text-gray-800">Rs {avgPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};