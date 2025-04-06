// components/activities/daily-input-form.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sprout, Droplet, Users, Tractor, AlertTriangle } from "lucide-react";
import api from "@/lib/api";

interface DailyInputFormProps {
  sessionId: string;
  onInputAdded?: () => void; // Callback to notify parent to refresh input history
}

export function DailyInputForm({ sessionId, onInputAdded }: DailyInputFormProps) {
  const [activeTab, setActiveTab] = useState("fertilizer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fertilizerData, setFertilizerData] = useState({
    fertilizer_type: "",
    application_method: "",
    quantity: "",
    cost: "",
    application_date: "",
  });

  const [pesticideData, setPesticideData] = useState({
    pesticide_type: "",
    quantity: "",
    cost: "",
    application_date: "",
  });

  const [irrigationData, setIrrigationData] = useState({
    water_source: "",
    irrigation_method: "",
    water_usage: "",
    cost: "",
    irrigation_date: "",
  });

  const [laborData, setLaborData] = useState({
    labor_hours: "",
    wages_per_day: "",
    labor_date: "",
  });

  const handleFertilizerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFertilizerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFertilizerSelectChange = (name: string, value: string) => {
    setFertilizerData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePesticideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPesticideData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIrrigationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIrrigationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIrrigationSelectChange = (name: string, value: string) => {
    setIrrigationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLaborChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLaborData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (activeTab === "fertilizer") {
        const payload = {
          session_id: sessionId,
          fertilizer_type: fertilizerData.fertilizer_type,
          application_method: fertilizerData.application_method,
          quantity: parseFloat(fertilizerData.quantity),
          cost: parseFloat(fertilizerData.cost),
          application_date: fertilizerData.application_date || new Date().toISOString().split("T")[0], // Default to today if not provided
        };
        await api.post("/fertilizer-inputs", payload);
        setFertilizerData({
          fertilizer_type: "",
          application_method: "",
          quantity: "",
          cost: "",
          application_date: "",
        });
      } else if (activeTab === "pesticide") {
        const payload = {
          session_id: sessionId,
          pesticide_type: pesticideData.pesticide_type,
          quantity: parseFloat(pesticideData.quantity),
          cost: parseFloat(pesticideData.cost),
          application_date: pesticideData.application_date || new Date().toISOString().split("T")[0],
        };
        await api.post("/pesticide-inputs", payload);
        setPesticideData({
          pesticide_type: "",
          quantity: "",
          cost: "",
          application_date: "",
        });
      } else if (activeTab === "irrigation") {
        const payload = {
          session_id: sessionId,
          water_source: irrigationData.water_source,
          irrigation_method: irrigationData.irrigation_method,
          water_usage: parseFloat(irrigationData.water_usage),
          cost: parseFloat(irrigationData.cost),
          irrigation_date: irrigationData.irrigation_date || new Date().toISOString().split("T")[0],
        };
        await api.post("/irrigation-inputs", payload);
        setIrrigationData({
          water_source: "",
          irrigation_method: "",
          water_usage: "",
          cost: "",
          irrigation_date: "",
        });
      } else if (activeTab === "labor") {
        const payload = {
          session_id: sessionId,
          labor_hours: parseFloat(laborData.labor_hours),
          wages_per_day: parseFloat(laborData.wages_per_day),
          labor_date: laborData.labor_date || new Date().toISOString().split("T")[0],
        };
        await api.post("/labor-inputs", payload);
        setLaborData({
          labor_hours: "",
          wages_per_day: "",
          labor_date: "",
        });
      }

      // Notify parent to refresh input history
      if (onInputAdded) {
        onInputAdded();
      }
    } catch (error: any) {
      console.error("Error saving input data:", error);
      setError(error.response?.data?.message || "Failed to save input data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Input Data</CardTitle>
        <CardDescription>Record your daily farming activities</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-3 bg-red-50 text-red-800 rounded-md mb-4">
            {error}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-green-100">
            <TabsTrigger value="fertilizer" className="flex items-center gap-2 data-[state=active]:bg-green-400 data-[state=active]:shadow-sm">
              <Sprout className="h-4 w-4" />
              <span className="hidden md:inline ">Fertilizer</span>
            </TabsTrigger>
            <TabsTrigger value="pesticide" className="flex items-center gap-2 data-[state=active]:bg-green-400 data-[state=active]:shadow-sm">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden md:inline">Pesticide</span>
            </TabsTrigger>
            <TabsTrigger value="irrigation" className="flex items-center gap-2 data-[state=active]:bg-green-400 data-[state=active]:shadow-sm">
              <Droplet className="h-4 w-4" />
              <span className="hidden md:inline">Irrigation</span>
            </TabsTrigger>
            <TabsTrigger value="labor" className="flex items-center gap-2 data-[state=active]:bg-green-400 data-[state=active]:shadow-sm">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Labor</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="fertilizer">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fertilizer_type">Fertilizer Type</Label>
                  <Input
                    id="fertilizer_type"
                    name="fertilizer_type"
                    value={fertilizerData.fertilizer_type}
                    onChange={handleFertilizerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Fertilizer Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={fertilizerData.quantity}
                    onChange={handleFertilizerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application_method">Fertilizer Application Method</Label>
                  <Select onValueChange={(value) => handleFertilizerSelectChange("application_method", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="broadcast">Broadcast</SelectItem>
                      <SelectItem value="foliar">Foliar Spray</SelectItem>
                      <SelectItem value="fertigation">Fertigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Fertilizer Cost (Rs.)</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    value={fertilizerData.cost}
                    onChange={handleFertilizerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application_date">Application Date</Label>
                  <Input
                    id="application_date"
                    name="application_date"
                    type="date"
                    value={fertilizerData.application_date}
                    onChange={handleFertilizerChange}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pesticide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pesticide_type">Pesticide Type</Label>
                  <Input
                    id="pesticide_type"
                    name="pesticide_type"
                    value={pesticideData.pesticide_type}
                    onChange={handlePesticideChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Pesticide Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={pesticideData.quantity}
                    onChange={handlePesticideChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Pesticide Cost (Rs.)</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    value={pesticideData.cost}
                    onChange={handlePesticideChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application_date">Application Date</Label>
                  <Input
                    id="application_date"
                    name="application_date"
                    type="date"
                    value={pesticideData.application_date}
                    onChange={handlePesticideChange}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="irrigation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="water_source">Water Source</Label>
                  <Select onValueChange={(value) => handleIrrigationSelectChange("water_source", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="well">Well</SelectItem>
                      <SelectItem value="canal">Canal</SelectItem>
                      <SelectItem value="rainwater">Rainwater Harvesting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigation_method">Irrigation Method</Label>
                  <Select onValueChange={(value) => handleIrrigationSelectChange("irrigation_method", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      <SelectItem value="flood">Flood Irrigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="water_usage">Water Usage (liters)</Label>
                  <Input
                    id="water_usage"
                    name="water_usage"
                    type="number"
                    value={irrigationData.water_usage}
                    onChange={handleIrrigationChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Irrigation Cost (Rs.)</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    value={irrigationData.cost}
                    onChange={handleIrrigationChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigation_date">Irrigation Date</Label>
                  <Input
                    id="irrigation_date"
                    name="irrigation_date"
                    type="date"
                    value={irrigationData.irrigation_date}
                    onChange={handleIrrigationChange}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="labor">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="labor_hours">Number of Labor Hours</Label>
                  <Input
                    id="labor_hours"
                    name="labor_hours"
                    type="number"
                    value={laborData.labor_hours}
                    onChange={handleLaborChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wages_per_day">Labor Wages (Rs./day)</Label>
                  <Input
                    id="wages_per_day"
                    name="wages_per_day"
                    type="number"
                    value={laborData.wages_per_day}
                    onChange={handleLaborChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="labor_date">Labor Date</Label>
                  <Input
                    id="labor_date"
                    name="labor_date"
                    type="date"
                    value={laborData.labor_date}
                    onChange={handleLaborChange}
                    required
                  />
                </div>
              </div>
            </TabsContent>
          </form>

          <div className="mt-6">
            <Button className="bg-green-500 hover:bg-green-300 hover:font-bold hover:text-green-800" type="submit" disabled={isSubmitting} onClick={handleSubmit}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Input Data"
              )}
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}