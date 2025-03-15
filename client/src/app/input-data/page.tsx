"use client"

import type React from "react"

import { useState } from "react"




import Link from "next/link"


import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Toast from "@/components/ui/Toast"

interface InputData {
  [key: string]: string | number
}

export default function InputDataPage() {
  const [formData, setFormData] = useState<InputData>({
    fertilizerType: "",
    fertilizerBrand: "",
    fertilizerQuantity: 0,
    fertilizerNPKRatio: "",
    fertilizerApplicationSchedule: "",
    fertilizerApplicationMethod: "",
    fertilizerCost: 0,
    pesticideType: "",
    pesticideName: "",
    pesticideQuantity: 0,
    pesticideApplicationFrequency: "",
    pesticideApplicationMethod: "",
    pesticideCost: 0,
    majorDiseasesObserved: "",
    waterSource: "",
    irrigationMethod: "",
    waterUsage: 0,
    irrigationSchedule: "",
    irrigationCost: 0,
    laborForce: 0,
    laborWorkSchedule: "",
    laborWages: 0,
    machineryUsed: "",
    machineryUsageFrequency: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    Toast({
      title: "Data Submitted",
      description: "Your input has been successfully saved.",
      onClose: () => console.log("Toast closed")
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daily Crop Management Input</h1>
        <Link href="/dashboard">
          <Button >Back to Dashboard</Button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="fertilizer" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
            <TabsTrigger value="pesticide">Pesticide</TabsTrigger>
            <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
            <TabsTrigger value="labor">Labor & Machinery</TabsTrigger>
          </TabsList>
          <TabsContent value="fertilizer">
            <Card>
              <CardHeader className="">
                <CardTitle>Fertilizer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fertilizerType">Fertilizer Type</Label>
                    <Input
                      id="fertilizerType"
                      name="fertilizerType"
                      value={formData.fertilizerType}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fertilizerBrand">Fertilizer Brand</Label>
                    <Input
                      id="fertilizerBrand"
                      name="fertilizerBrand"
                      value={formData.fertilizerBrand}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fertilizerQuantity">Fertilizer Quantity (kg/acre)</Label>
                    <Input
                      type="number"
                      id="fertilizerQuantity"
                      name="fertilizerQuantity"
                      value={formData.fertilizerQuantity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fertilizerNPKRatio">Fertilizer N-P-K Ratio</Label>
                    <Input
                      id="fertilizerNPKRatio"
                      name="fertilizerNPKRatio"
                      value={formData.fertilizerNPKRatio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fertilizerApplicationSchedule">Fertilizer Application Schedule</Label>
                    <Input
                      id="fertilizerApplicationSchedule"
                      name="fertilizerApplicationSchedule"
                      value={formData.fertilizerApplicationSchedule}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fertilizerApplicationMethod">Fertilizer Application Method</Label>
                    <Select onValueChange={(value: string) => handleSelectChange("fertilizerApplicationMethod", value)}>
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
                    <Label htmlFor="fertilizerCost">Fertilizer Cost (Rs.)</Label>
                    <Input
                      type="number"
                      id="fertilizerCost"
                      name="fertilizerCost"
                      value={formData.fertilizerCost}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pesticide">
            <Card>
              <CardHeader className="">
                <CardTitle>Pesticide Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pesticideType">Pesticide Type</Label>
                    <Input
                      id="pesticideType"
                      name="pesticideType"
                      value={formData.pesticideType}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesticideName">Pesticide Name</Label>
                    <Input
                      id="pesticideName"
                      name="pesticideName"
                      value={formData.pesticideName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesticideQuantity">Pesticide Quantity (kg/acre)</Label>
                    <Input
                      type="number"
                      id="pesticideQuantity"
                      name="pesticideQuantity"
                      value={formData.pesticideQuantity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesticideApplicationFrequency">Pesticide Application Frequency</Label>
                    <Input
                      id="pesticideApplicationFrequency"
                      name="pesticideApplicationFrequency"
                      value={formData.pesticideApplicationFrequency}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesticideApplicationMethod">Pesticide Application Method</Label>
                    <Select onValueChange={(value: string) => handleSelectChange("pesticideApplicationMethod", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spray">Spray</SelectItem>
                        <SelectItem value="dusting">Dusting</SelectItem>
                        <SelectItem value="soil-application">Soil Application</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesticideCost">Pesticide Cost (Rs.)</Label>
                    <Input
                      type="number"
                      id="pesticideCost"
                      name="pesticideCost"
                      value={formData.pesticideCost}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="majorDiseasesObserved">Major Diseases Observed</Label>
                    <Input
                      id="majorDiseasesObserved"
                      name="majorDiseasesObserved"
                      value={formData.majorDiseasesObserved}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="irrigation">
            <Card>
              <CardHeader className="">
                <CardTitle>Irrigation Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="waterSource">Water Source</Label>
                    <Select onValueChange={(value: string) => handleSelectChange("waterSource", value)}>
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
                    <Label htmlFor="irrigationMethod">Irrigation Method</Label>
                    <Select onValueChange={(value: string) => handleSelectChange("irrigationMethod", value)}>
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
                    <Label htmlFor="waterUsage">Water Usage (liters/acre)</Label>
                    <Input
                      type="number"
                      id="waterUsage"
                      name="waterUsage"
                      value={formData.waterUsage}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="irrigationSchedule">Irrigation Schedule</Label>
                    <Input
                      id="irrigationSchedule"
                      name="irrigationSchedule"
                      value={formData.irrigationSchedule}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="irrigationCost">Irrigation Cost (Rs.)</Label>
                    <Input
                      type="number"
                      id="irrigationCost"
                      name="irrigationCost"
                      value={formData.irrigationCost}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="labor">
            <Card>
              <CardHeader className="">
                <CardTitle>Labor & Machinery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="laborForce">Labor Force (number of workers)</Label>
                    <Input
                      type="number"
                      id="laborForce"
                      name="laborForce"
                      value={formData.laborForce}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="laborWorkSchedule">Labor Work Schedule (hours/day)</Label>
                    <Input
                      id="laborWorkSchedule"
                      name="laborWorkSchedule"
                      value={formData.laborWorkSchedule}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="laborWages">Labor Wages (Rs./day)</Label>
                    <Input
                      type="number"
                      id="laborWages"
                      name="laborWages"
                      value={formData.laborWages}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="machineryUsed">Machinery Used</Label>
                    <Input
                      id="machineryUsed"
                      name="machineryUsed"
                      value={formData.machineryUsed}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="machineryUsageFrequency">Machinery Usage Frequency</Label>
                    <Input
                      id="machineryUsageFrequency"
                      name="machineryUsageFrequency"
                      value={formData.machineryUsageFrequency}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <Button type="submit" className="w-full">
            Save Data
          </Button>
        </div>
      </form>
    </div>
  )
}

