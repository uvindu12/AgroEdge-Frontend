"use client"

import { DailyInputForm } from "@/app/components/activities/daily-input-from"
import { EndSessionDialog } from "@/app/components/activities/end-session-dialog"
import { InputHistoryList } from "@/app/components/activities/input-history-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ArrowLeft, Badge, Calendar, Droplet, Leaf, Sprout, Users } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"




const sessionData = {
    id: "1",
    cropType: "Beetroot",
    variety: "BG 300",
    startDate: "2024-03-01",
    expectedHarvestDate: "2024-06-15",
    farmSize: "5 acres",
    district: "Anuradhapura",
    village: "Mihintale",
    farmType: "Vegitavle",
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

                                        <div className ="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-lg font-medium mb-2">Farm Details</h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Farm Size:</span>
                                                        <span>{sessionData.farmSize}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Farm Type:</span>
                                                        <span>{sessionData.farmType}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Village:</span>
                                                        <span>{sessionData.village}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">District:</span>
                                                        <span>{sessionData.district}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-medium mb-2">Crop Details</h3>
                                                <div className ="space-y-2">
                                                    <div className ="flex justify-between">
                                                        <span className ="text-gray-500">Crop Type :</span>
                                                        <span>{sessionData.cropType}</span>
                                                    </div>
                                                    <div className ="flex justify-between">
                                                        <span className ="text-gray-500">Variety :</span>
                                                        <span>{sessionData.variety}</span>
                                                    </div>
                                                    <div className ="flex justify-between">
                                                        <span className ="text-gray-500">Expected Harvest</span>
                                                        <span>{sessionData.expectedHarvest}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className ="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className ="text-lg font-medium mb-2">Seed Details</h3>
                                                <div className ="space-y-2">
                                                    <div className ="flex justify-between">
                                                        <span className ="text-gray-500">Seed Type :</span>
                                                        <span>{sessionData.seedType}</span>
                                                    </div>
                                                    <div className ="flex justify-between">
                                                        <span className ="text-gray-500">Seed Variety :</span>
                                                        <span>{sessionData.seedVariety}</span>
                                                    </div>
                                                    <div className ="flex justify-between">
                                                        <span className ="text-gray-500">Seed Source :</span>
                                                        <span>{sessionData.seedSource}</span>
                                                    </div>
                                                    <div className ="flex justify-between">
                                                        <span className ="text-gray-500">Seed Quantity :</span>
                                                        <span>{sessionData.seedQuantity}</span>
                                                    </div>
                                                    <div className ="flex justify-between">
                                                        <span className ="text-gray-500">Seed Cost :</span>
                                                        <span>{sessionData.seedCost}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className ="text-lg font-medium mb-2">
                                                    Soil Details
                                                </h3>
                                                <div className ="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className ="text-gray-500">Soil Type :</span>
                                                        <span>{sessionData.soilType}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className ="text-gray-500">Soil pH :</span>
                                                        <span>{sessionData.soilPh}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value ="daily-input">
                            <DailyInputForm sessionId={sessionId}/>
                        </TabsContent>

                        <TabsContent value="history">
                            <InputHistoryList sessionId={sessionId}/>
                        </TabsContent>
                    </Tabs>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Session Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className ="grid grid-cols-2 gap-4">
                                    <div className ="bg-blue-50 p-3 rounded-lg">
                                        <div className ="flex items-center gap-2">
                                            <Calendar className ="h-5 w-5 text-blue-600"/>
                                            <span className ="text-sm font-medium">Days Active</span>
                                        </div>
                                        <p className ="text-2xl font-bold mt-1">12</p>
                                    </div>
                                    <div className ="bg-green-50 p-3 rounded-lg">
                                        <div className ="flex items-center gap-2">
                                            <Leaf className ="h-5 w-5 text-green-600"/>
                                            <span className ="text-sm font-medium">Farm Size</span>
                                        </div>
                                        <p className ="text-2xl font-bold mt-1">{sessionData.farmSize}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium">Recent Activities</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-md">
                                        <Droplet className="h-4 w-4 text-blue-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">Irrigation</p>
                                                <p className="text-xs text-gray-500">2000 liters applied</p>
                                                <p className="text-xs text-gray-500">Today</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-md">
                                            <Sprout className="h-4 w-4 text-green-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">Fertilizer</p>
                                                <p className="text-xs text-gray-500">50kg NPK applied</p>
                                                <p className="text-xs text-gray-500">Yesterday</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-md">
                                            <Users className="h-4 w-4 text-orange-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">Labor</p>
                                                <p className="text-xs text-gray-500">8 hours of work</p>
                                                <p className="text-xs text-gray-500">2 days ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className ="space-y-2">
                                    <h3 className ="text-sm font-medium">Alerts</h3>
                                    <div className ="flex items-start gap-2 p-2 bg-red-50 rounded-md">
                                        <AlertTriangle className ="h-4 w-4 text-red-500 mt-0.5"/>
                                        <div>
                                            <p className ="text-sm font-medium">Irrigation Due</p>
                                            <p className ="text-xs text-gray-500">Recommended to irrigate within 2 days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className ="space-y-2">
                                    <h3 className ="text-sm font-medium">Weather Forecast</h3>
                                    <div className ="flex justify-between items-center p-2 bg-gray-500 rounded-md">
                                        <div>
                                            <p className ="text-sm">Today</p>
                                            <p className ="text-sm font-medium">32°C</p>
                                            <p className ="text-xs text-gray-500">10% rain</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <EndSessionDialog open={isEndSessionDialogOpen} onOpenChange ={setIsEndSessionDialogOpen} sessionId ={sessionId}/>
        </div>
    )

}