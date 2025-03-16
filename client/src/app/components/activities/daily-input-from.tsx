"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Sprout } from "lucide-react"
import { useState } from "react"



interface DailyInputFormProps {
    sessionId: string
}

export function DailyInputForm ({ sessionId} : DailyInputFormProps) {
    const [activeTab, setActiveTab] = useState ("fertilizer")
    const [isSubmitting, setIsSubmitting] = useState (false)

    const [fertilizerData, setFertilizerData] = useState ({
        type: "",
        brand: "",
        quantity: "",
        npkRatio: "",
        applicationMethod: "",
        cost: "",
    })
    const [pesticideData, setPesticideData] = useState({
        type: "",
        name: "",
        quantity: "",
        applicationFrequency: "",
        applicationMethod: "",
        cost: "",
      })
    
      const [irrigationData, setIrrigationData] = useState({
        waterSource: "",
        irrigationMethod: "",
        waterUsage: "",
        irrigationSchedule: "",
        irrigationCost: "",
      })
    
      const [laborData, setLaborData] = useState({
        laborHours: "",
        laborWages: "",
      })
    
      const [machineryData, setMachineryData] = useState({
        machineryUsed: "",
        machineryUsageFrequency: "",
      })
    
      const [diseaseData, setDiseaseData] = useState({
        majorDiseasesObserved: "",
      })
    
      const handleFertilizerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFertilizerData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleFertilizerSelectChange = (name: string, value: string) => {
        setFertilizerData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handlePesticideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPesticideData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handlePesticideSelectChange = (name: string, value: string) => {
        setPesticideData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleIrrigationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setIrrigationData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleIrrigationSelectChange = (name: string, value: string) => {
        setIrrigationData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleLaborChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLaborData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleMachineryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setMachineryData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleDiseaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDiseaseData((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
    
        try {
          // In a real app, this would be an API call to save the daily input data
          await new Promise((resolve) => setTimeout(resolve, 1500))
    
          // Reset form based on active tab
          if (activeTab === "fertilizer") {
            setFertilizerData({
              type: "",
              brand: "",
              quantity: "",
              npkRatio: "",
              applicationMethod: "",
              cost: "",
            })
          } else if (activeTab === "pesticide") {
            setPesticideData({
              type: "",
              name: "",
              quantity: "",
              applicationFrequency: "",
              applicationMethod: "",
              cost: "",
            })
          } else if (activeTab === "irrigation") {
            setIrrigationData({
              waterSource: "",
              irrigationMethod: "",
              waterUsage: "",
              irrigationSchedule: "",
              irrigationCost: "",
            })
          } else if (activeTab === "labor") {
            setLaborData({
              laborHours: "",
              laborWages: "",
            })
          } else if (activeTab === "machinery") {
            setMachineryData({
              machineryUsed: "",
              machineryUsageFrequency: "",
            })
          } else if (activeTab === "diseases") {
            setDiseaseData({
              majorDiseasesObserved: "",
            })
          }
        } catch (error) {
          console.error("Error saving input data:", error)
        } finally {
          setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Input Data</CardTitle>
                <CardDescription>Record your daily farming activities</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value ={activeTab} onValueChange = {setActiveTab} className ="space-y-4">
                    <TabsList className ="grid grid-cols-3 md:grid-cols-6">
                        <TabsTrigger value ="fertilizer" className ="flex items-center gap-2">
                            <Sprout className =" h-4 w-4"/>
                            <span className ="hidden md:inline">Fertilizer</span>
                        </TabsTrigger>
                        <TabsTrigger value ="pesticide" className ="flex items-center gap-2">
                            <AlertTriangle className ="h-4 w-4"/>
                            <span className ="hidden md:inline">Pesticide</span>
                        </TabsTrigger>
                        <TabsTrigger value ="irrigation" className ="flex items-center gap-2">
                            <AlertTriangle className ="h-4 w-4"/>
                            <span className ="hidden md:inline">Irrigation</span>
                        </TabsTrigger>
                        <TabsTrigger value ="labor" className ="flex items-center gap-2">
                            <AlertTriangle className ="h-4 w-4"/>
                            <span className ="hidden md:inline">Labor</span>
                        </TabsTrigger>
                        <TabsTrigger value ="machinery" className ="flex items-center gap-2">
                            <AlertTriangle className ="h-4 w-4"/>
                            <span className ="hidden md:inline">Machinery</span>
                        </TabsTrigger>
                        <TabsTrigger value ="diseases" className ="flex items-center gap-2">
                            <AlertTriangle className ="h-4 w-4"/>
                            <span className ="hidden md:inline">Diseases</span>
                        </TabsTrigger>
                    </TabsList>

                    <form onSubmit ={handleSubmit}>
                        <TabsContent value ="fertilizer">
                            <div className ="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className ="space-y-2">
                                    <Label htmlFor ="type">Fertilizer Type</Label>
                                    <Input id="type" name="type" value={fertilizerData.type} onChange = {handleFertilizerChange} required/>
                                </div>
                                <div className ="space-y-2">
                                    <Label htmlFor ="brand">Fertilizer Brand</Label>
                                    <Input 
                                       id="brand"
                                       name ="brand"
                                       value={fertilizerData.brand}
                                       onChange={handleFertilizerChange}
                                       required 
                                    />
                                </div>
                                <div className ="space-y-2">
                                    <Label htmlFor="quantity">Fertilizer Quantity (kg)</Label>
                                    <Input 
                                       id="quantity"
                                       name="quantity"
                                       value={fertilizerData.quantity}
                                       onChange={handleFertilizerChange}
                                       required
                                    />
                                </div>
                                <div className ="space-y-2">
                                    <Label htmlFor="npkRatio">Fertilizer N-P-K Ratio</Label>
                                    <Input
                                        id="npkRatio"
                                        name="npkRatio"
                                        value={fertilizerData.npkRatio}
                                        onChange={handleFertilizerChange}
                                        required
                                    />
                                </div>
                                <div className ="space-y-2">
                                    <Label htmlFor="applicationMethod">Fertilizer Application Method</Label>
                                    <Select onValueChange={(value) => handleFertilizerSelectChange ("applicatonMethod", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="broadcast">Brodcast</SelectItem>
                                            <SelectItem value="broadcast">Foliar Spray</SelectItem>
                                            <SelectItem value="broadcast">Fertigation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className ="space-y-2">
                                    <Label htmlFor ="cost">Fertilizer Cost (Rs.)</Label>
                                    <Input
                                        id="cost"
                                        name="cost"
                                        value={fertilizerData.cost}
                                        onChange={handleFertilizerChange}
                                        required
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </form>
                </Tabs>
            </CardContent>
        </Card>
    )
}