"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Badge } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"




const sessionData = {
    id: "1",
    cropType: "Rice",
    variety: "BG 300",
    startDate: "2024-03-01",
    expectedHarvestDate: "2024-06-15",
    farmSize: "5 acres",
    district: "Anuradhapura",
    village: "Mihintale",
    farmType: "Paddy",
    expectedHarvest: "10000 kg",
    seedType: "Certified",
    seedVariety: "BG 300",
    seedSource: "Department of Agriculture",
    seedQuantity: "125 kg",
    seedCost: "18750",
    soilType: "Loamy",
    soilPh: "6.5",
    lastUpdated: "2024-03-12",
    progress: 25,
    status: "active",
}

export default function SessionDetailPage () {
    const params = useParams()
    const sessionId = params.sessionId as string
    const [isEndSessionDialogOpen, setIsEndSessionDialogOpen] = useState (false)

    return (
        <div className = "container mx-auto px-4 py-6 md:py-8">
            <div className ="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className ="flex items-center gap-2">
                    <Link href="/activities">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className ="h-5 w-5"/>
                        </Button>
                    </Link>
                    <div>
                        <div className ="flex items-center gap-2">
                            <h1 className=" text-2xl md:text-3xl font-bold">
                                {sessionData.cropType} - {sessionData.variety}
                            </h1>
                            <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                        </div>
                        <p className =" text-gray-500 mt-1">
                            Session started on {new Date (sessionData.startDate). toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className ="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick= {()=> setIsEndSessionDialogOpen(true)}>
                        End Session
                    </Button>
                </div>
            </div>

            <div className ="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className= "lg:col-span-2">
                    <Tabs defaultValue ="overview" className="space-y-4">
                        <TabsList className ="w-full">
                            <TabsTrigger value ="overview" className="flex-1">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value ="daily-input" className ="flex-1">
                                Daily Input
                            </TabsTrigger>
                            <TabsTrigger value ="history" className ="flex-1">
                                Input History
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value ="overview">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Session Overview</CardTitle>
                                    <CardDescription>Details about your current crop session</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className=" space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Progress</h3>
                                            <div className ="flex justify-between text-sm mb-1">
                                                <span>Overall Progress</span>
                                                <span>{sessionData.progress}%</span>
                                            </div>
                                            <Progress value ={sessionData.progress} className="h-2"/>
                                            <div className ="flex justify-between text-xs text-gray-500 mt-1">
                                                <span> Started : {new Date (sessionData.startDate).toLocaleDateString()}</span>
                                                <span> Expected Harvest : {new Date(sessionData.expectedHarvestDate). toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )

}