"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface SimilarFarmsComparisonProps {
  className?: string
}

export function SimilarFarmsComparison({ className }: SimilarFarmsComparisonProps) {
  // This would come from your API/database in a real application
  const similarFarmsData = {
    farms: [
      {
        id: 1,
        district: "Kandy",
        size: 425,
        soil_type: "Regosol Soil",
        irrigation: "Drip Irrigation",
        yield: 51200,
        yield_per_acre: 120.5,
        success_factors: ["Optimal fertilizer timing", "Disease prevention"],
      },
      {
        id: 2,
        district: "Kandy",
        size: 450,
        soil_type: "Regosol Soil",
        irrigation: "Drip Irrigation",
        yield: 54000,
        yield_per_acre: 120.0,
        success_factors: ["Quality seeds", "Proper spacing"],
      },
      {
        id: 3,
        district: "Nuwara Eliya",
        size: 430,
        soil_type: "Regosol Soil",
        irrigation: "Drip Irrigation",
        yield: 53320,
        yield_per_acre: 124.0,
        success_factors: ["Pest management", "Soil preparation"],
      },
    ],
    comparison_chart: [
      { factor: "Seed Quality", your_farm: 65, top_farms: 90 },
      { factor: "Irrigation", your_farm: 80, top_farms: 85 },
      { factor: "Fertilizer", your_farm: 60, top_farms: 95 },
      { factor: "Pest Control", your_farm: 50, top_farms: 90 },
      { factor: "Labor Efficiency", your_farm: 70, top_farms: 80 },
    ],
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Similar Farms Comparison</CardTitle>
        <CardDescription>Learn from successful farms with similar conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="farms">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="farms">Top Performing Farms</TabsTrigger>
            <TabsTrigger value="factors">Success Factors</TabsTrigger>
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
                  {similarFarmsData.farms.map((farm) => (
                    <TableRow key={farm.id}>
                      <TableCell>{farm.district}</TableCell>
                      <TableCell>{farm.size} acres</TableCell>
                      <TableCell className="hidden md:table-cell">{farm.soil_type}</TableCell>
                      <TableCell className="hidden md:table-cell">{farm.irrigation}</TableCell>
                      <TableCell>{farm.yield.toLocaleString()} kg</TableCell>
                      <TableCell className="hidden md:table-cell">{farm.yield_per_acre} kg/acre</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium">Key Success Factors</h4>
              <div className="flex flex-wrap gap-2">
                {similarFarmsData.farms.flatMap((farm) =>
                  farm.success_factors.map((factor, idx) => (
                    <Badge key={`${farm.id}-${idx}`} variant="outline" className="bg-green-50 text-green-700">
                      {factor}
                    </Badge>
                  )),
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="factors" className="mt-4">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                This chart compares your projected farm practices with top performing farms in your area. Focus on
                improving the areas with the biggest gaps.
              </p>
            </div>

            <div className="h-[300px]">
              <ChartContainer
                config={{
                  your_farm: {
                    label: "Your Farm (Projected)",
                    color: "hsl(var(--chart-1))",
                  },
                  top_farms: {
                    label: "Top Performing Farms",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={similarFarmsData.comparison_chart}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="factor" type="category" width={100} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="your_farm" fill="var(--color-your_farm)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="top_farms" fill="var(--color-top_farms)" radius={[0, 0, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

