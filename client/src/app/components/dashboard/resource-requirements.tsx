"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceRequirementsProps {
  className?: string;
  district: string;
  farmSize?: number;
  soilType?: string;
}

export function ResourceRequirements({ className, district, farmSize, soilType }: ResourceRequirementsProps) {
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!district) return;
    const fetchResources = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/api/best-farmers/${district}`, {
          params: { farm_size: farmSize, soil_type: soilType },
        });
        const topFarmers = response.data.topFarmers;
        const avgData = {
          seed_quantity: topFarmers.reduce((sum: number, f: any) => sum + f.seed_quantity, 0) / topFarmers.length,
          water_usage: topFarmers.reduce((sum: number, f: any) => sum + f.water_usage, 0) / topFarmers.length,
          labor_hours: topFarmers.reduce((sum: number, f: any) => sum + f.labor_hours, 0) / topFarmers.length,
          seed_cost: topFarmers.reduce((sum: number, f: any) => sum + f.seed_cost, 0) / topFarmers.length,
          irrigation_cost: topFarmers.reduce((sum: number, f: any) => sum + f.irrigation_cost, 0) / topFarmers.length,
          labor_wages: topFarmers.reduce((sum: number, f: any) => sum + f.labor_wages, 0) / topFarmers.length,
        };
        // Scale resources based on farmSize if provided, otherwise use average farm size from top farmers
        const avgFarmSize = topFarmers.reduce((sum: number, f: any) => sum + f.farm_size, 0) / topFarmers.length;
        const scaleFactor = farmSize ? farmSize / avgFarmSize : 1;
        setResources({
          seeds: {
            quantity: (avgData.seed_quantity * scaleFactor).toFixed(2),
            cost: (avgData.seed_cost * scaleFactor).toFixed(2),
            source: "Department of Agriculture (DOA)", // Placeholder
          },
          water: {
            quantity: (avgData.water_usage * scaleFactor).toFixed(2),
            cost: (avgData.irrigation_cost * scaleFactor).toFixed(2),
            source: "Local Irrigation Schemes", // Placeholder
          },
          labor: {
            quantity: (avgData.labor_hours * scaleFactor).toFixed(2),
            cost: (avgData.labor_wages * scaleFactor).toFixed(2),
            source: "Local Labor Pool", // Placeholder
          },
        });
      } catch (error) {
        console.error('Error fetching resource requirements:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [district, farmSize, soilType]);

  if (loading) return <Card><CardContent>Loading...</CardContent></Card>;
  if (!resources) return <Card><CardContent>No data available</CardContent></Card>;

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Resource Requirements</CardTitle>
        <CardDescription>Estimated resources needed for your crop</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="seeds" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-green-100 rounded-lg">
            <TabsTrigger value="seeds" className="data-[state=active]:bg-green-400 data-[state=active]:shadow-sm">
              Seeds
            </TabsTrigger>
            <TabsTrigger value="water" className="data-[state=active]:bg-green-400 data-[state=active]:shadow-sm">
              Water
            </TabsTrigger>
            <TabsTrigger value="labor" className="data-[state=active]:bg-green-400 data-[state=active]:shadow-sm">
              Labor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="seeds" className="mt-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium">Recommended Source: {resources.seeds.source}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="border rounded-lg p-3 text-center bg-green-100">
                  <p className="text-sm font-medium">Quantity Needed</p>
                  <p className="text-lg font-semibold">{resources.seeds.quantity} kg</p>
                </div>
                <div className="border rounded-lg p-3 text-center bg-blue-100">
                  <p className="text-sm font-medium">Estimated Cost</p>
                  <p className="text-lg font-semibold">Rs. {resources.seeds.cost}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="water" className="mt-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium">Recommended Source: {resources.water.source}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="border rounded-lg p-3 text-center bg-green-100">
                  <p className="text-sm font-medium">Quantity Needed</p>
                  <p className="text-lg font-semibold">{resources.water.quantity} liters</p>
                </div>
                <div className="border rounded-lg p-3 text-center bg-blue-100">
                  <p className="text-sm font-medium">Estimated Cost</p>
                  <p className="text-lg font-semibold">Rs. {resources.water.cost}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="labor" className="mt-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium">Recommended Source: {resources.labor.source}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="border rounded-lg p-3 text-center bg-green-100">
                  <p className="text-sm font-medium">Quantity Needed</p>
                  <p className="text-lg font-semibold">{resources.labor.quantity} hours</p>
                </div>
                <div className="border rounded-lg p-3 text-center bg-blue-100">
                  <p className="text-sm font-medium">Estimated Cost</p>
                  <p className="text-lg font-semibold">Rs. {resources.labor.cost}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}