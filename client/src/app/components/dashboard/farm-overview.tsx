import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, FlaskRoundIcon as Flask, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

interface FarmOverviewProps {
  className? : string;
  farmData: {farm_size? : number; district? : string; soil_type?: string; soil_ph?: number; water_source?: string };
}

export function FarmOverview ({ className, farmData } : FarmOverviewProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Farm Overview</CardTitle>
        <CardDescription>Key details about your farm</CardDescription>
      </CardHeader>
      <CardContent>
        <div className =" grid gap-4 md:grid-cols-2">
          <div className ="flex items-center gap-3">
            <div className ="flex h-10 w-10 items-center justify-center rounded-full bg-green-200">
              <MapPin className = "h-5 w-5 text-green-900"/>
            </div>
            <div >
              <p className ="text-sm font-medium leading-none">Location</p>
              <p className ="text-sm text-muted-foreground">{farmData.district || 'Not set'}</p>
            </div>
          </div>
          <div className ="flex items-center gap-3">
            <div className ="flex h-10 w-10 items-center justify-center rounded-full bg-green-200">
              <Ruler className ="h-5 w-5 text-green-900"/>
            </div>
            <div>
              <p className ="text-sm font-medium leading-none">Farm Size</p>
              <p className ="text-sm text-muted-foreground">{farmData.farm_size ? `${farmData.farm_size} acres` : 'Not set'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-200">
              <Flask className="h-5 w-5 text-green-900" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Soil Information</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{farmData.soil_type || 'Not set'}</p>
                {farmData.soil_ph && <Badge variant="outline">pH {farmData.soil_ph}</Badge>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-200">
              <Droplet className="h-5 w-5 text-green-900" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Water Source</p>
              <p className="text-sm text-muted-foreground">{farmData.water_source || 'Not set'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}