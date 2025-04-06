import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface CropRecommendationProps {
  className?: string;
  district: string;
  farmSize?: number;
  soilType?: string;
}

export function CropRecommendation({ className, district, farmSize, soilType }: CropRecommendationProps) {
  const [cropData, setCropData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!district) return;
    const fetchRecommendation = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/api/best-farmers/${district}`, {
          params: { farm_size: farmSize, soil_type: soilType },
        });
        const topFarmer = response.data.topFarmers[0]; // Use top farmer for recommendation
        setCropData({
          crop_type: topFarmer.crop_type,
          veg_variety: topFarmer.veg_variety,
          expected_harvest: topFarmer.actual_harvest, // Using actual_harvest as expected for simplicity
          confidence_score: Math.round(topFarmer.final_performance_score), // Map to percentage
        });
      } catch (error) {
        console.error('Error fetching recommendation:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendation();
  }, [district, farmSize, soilType]);

  if (loading) return <Card><CardContent>Loading...</CardContent></Card>;
  if (!cropData) return <Card><CardContent>No data available</CardContent></Card>;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Recommended Crop</CardTitle>
        <CardDescription>Based on top performers in {district}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-200">
            <Leaf className="h-10 w-10 text-green-900" />
          </div>
          <h3 className="text-2xl font-bold">{cropData.crop_type}</h3>
          <p className="text-muted-foreground">{cropData.veg_variety}</p>
          <div className="mt-4 flex w-full justify-between">
            <div>
              <p className="text-sm font-medium">Expected Yield</p>
              <p className="text-lg font-semibold">{cropData.expected_harvest.toLocaleString()} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium">Performance Score</p>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {cropData.confidence_score}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}