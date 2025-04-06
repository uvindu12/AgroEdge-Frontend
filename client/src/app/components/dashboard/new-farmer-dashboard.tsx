import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface NewFarmerDashboardProps {
  className?: string;
  district: string;
}

export function NewFarmerDashboard({ className, district }: NewFarmerDashboardProps) {
  const [bestFarmsData, setBestFarmsData] = useState<any>(null);

  useEffect(() => {
    if (!district) return;
    const fetchBestFarmers = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/best-farmers/${district}`);
        const farmers = response.data.topFarmers.map((f: any) => ({
          id: f.user_id,
          district: f.district,
          size: f.farm_size,
          soil_type: f.soil_type,
          irrigation: f.irrigation_method,
          yield: f.actual_harvest,
          yield_per_acre: f.actual_harvest / f.farm_size,
          success_factors: ["High performance score", "Efficient irrigation"], 
        }));
        setBestFarmsData({
          farms: farmers,
          comparison_chart: [
            { factor: "Seed Quality", your_farm: 65, top_farms: 90 },
            { factor: "Irrigation", your_farm: 80, top_farms: 85 },
            { factor: "Fertilizer", your_farm: 60, top_farms: 95 },
            { factor: "Pest Control", your_farm: 50, top_farms: 90 },
            { factor: "Labor Efficiency", your_farm: 70, top_farms: 80 },
          ],
        });
      } catch (error) {
        console.error('Error fetching best farmers:', error);
      }
    };
    fetchBestFarmers();
  }, [district]);

  if (!bestFarmsData) return <Card><CardContent>Loading...</CardContent></Card>;

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Welcome New Farmer</CardTitle>
        <CardDescription>Recommendations based on top-performing farms in {district}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="farms">
          <TabsList className="grid w-full grid-cols-2 bg-green-100">
            <TabsTrigger value="farms">Top Performing Farms</TabsTrigger>
            <TabsTrigger  value="factors">Success Factors</TabsTrigger>
          </TabsList>
          <TabsContent value="farms" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="hidden md:table-cell">Soil Type</TableHead>
                    <TableHead className="hidden md:table-cell">Irrigation</TableHead>
                    <TableHead>Yield</TableHead>
                    <TableHead className="hidden md:table-cell">Yield/Acre</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bestFarmsData.farms.map((farm: any) => (
                    <TableRow key={farm.id}>
                      <TableCell>{farm.district}</TableCell>
                      <TableCell>{farm.size} acres</TableCell>
                      <TableCell className="hidden md:table-cell">{farm.soil_type}</TableCell>
                      <TableCell className="hidden md:table-cell">{farm.irrigation}</TableCell>
                      <TableCell>{farm.yield.toLocaleString()} kg</TableCell>
                      <TableCell className="hidden md:table-cell">{farm.yield_per_acre.toFixed(1)} kg/acre</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Key Success Factors</h4>
              <div className="flex flex-wrap gap-2">
                {bestFarmsData.farms.flatMap((farm: any) =>
                  farm.success_factors.map((factor: string, idx: number) => (
                    <Badge key={`${farm.id}-${idx}`} variant="outline" className="bg-green-50 text-green-700">
                      {factor}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}