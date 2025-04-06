"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ExpectedOutcomesProps {
  className?: string;
  district: string;
}

export function ExpectedOutcomes({ className, district }: ExpectedOutcomesProps) {
  const [harvestData, setHarvestData] = useState<any>(null);

  useEffect(() => {
    if (!district) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/best-farmers/${district}`);
        const topFarmers = response.data.topFarmers;
        const avgActual = topFarmers.reduce((sum: number, f: any) => sum + f.actual_harvest, 0) / topFarmers.length;
        const avgExpected = topFarmers.reduce((sum: number, f: any) => sum + f.expected_harvest, 0) / topFarmers.length || avgActual * 0.8; // Fallback
        setHarvestData({
          expected_harvest: avgExpected,
          actual_harvest: avgActual,
          difference_percentage: ((avgActual - avgExpected) / avgExpected * 100).toFixed(1),
          monthly_data: [
            { month: "Month 1", expected: 0, actual: 0 },
            { month: "Month 2", expected: avgExpected * 0.25, actual: avgActual * 0.25 },
            { month: "Month 3", expected: avgExpected * 0.5, actual: avgActual * 0.5 },
            { month: "Month 4", expected: avgExpected * 0.75, actual: avgActual * 0.75 },
            { month: "Month 5", expected: avgExpected, actual: avgActual },
          ],
        });
      } catch (error) {
        console.error('Error fetching outcomes:', error);
      }
    };
    fetchData();
  }, [district]);

  if (!harvestData) return <Card><CardContent>Loading...</CardContent></Card>;

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Expected Outcomes</CardTitle>
        <CardDescription>Projected vs. actual harvest from top farms in {district}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <p className="text-sm font-medium">Expected Harvest</p>
            <p className="text-lg font-semibold">{harvestData.expected_harvest.toLocaleString()} kg</p>
          </div>
          <div className="rounded-lg border p-3 bg-green-50">
            <p className="text-sm font-medium">Actual Harvest (avg.)</p>
            <p className="text-lg font-semibold text-green-700">
              {harvestData.actual_harvest.toLocaleString()} kg
              <span className="ml-1 text-xs">(+{harvestData.difference_percentage}%)</span>
            </p>
          </div>
        </div>
        <div className="h-[360px] border rounded-lg p-4">
          <ChartContainer config={{
            expected: {
              label: "Expected Harvest",
              color: "#16a34a", // Green
            },
            actual: {
              label: "Actual Harvest",
              color: "#67ff93", // Orange
            },
          }} className="w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart accessibilityLayer data={harvestData.monthly_data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="expected" stackId="a" fill="var(--color-expected)" radius={[10, 10, 10, 10]} />
                <Bar dataKey="actual" stackId="a" fill="var(--color-actual)" radius={[10, 10, 10, 10]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}