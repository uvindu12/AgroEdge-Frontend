// components/charts/line-chart.tsx
"use client";

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

type PriceDataPoint = {
  date: string;
  predicted_price: number;
};

type LineChartProps = {
  data: PriceDataPoint[];
};

export const PriceTrendChart: React.FC<LineChartProps> = ({ data }) => {
  // Format the data for better display
  const formattedData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    price: item.predicted_price
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.split(' ')[0]}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            formatter={(value) => [`Rs ${value}`, 'Price']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#16a34a" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};