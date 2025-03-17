"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Filter, Plus } from "lucide-react"
import { useState } from "react"
import { NewSessionDialog } from "../components/activities/new-session-dialog"
import { SessionList } from "../components/activities/session-list"




export default function ActivitiesPage() {
    const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState (false)

    return (
        <div className= "container mx-auto px-4 py-6 md:py-8">
            <div className ="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className ="text-2xl md:text-3xl font-bold">Crop Activities</h1>
                    <p className ="text-gray-500 mt-1">Manage your crop sessions and track daily inputs</p>
                </div>

                <div className ="flex flex-col sm:flex-row gap-3">
                    <Button className ="bg-green-600 hover:bg-green-700" onClick ={() =>
                        setIsNewSessionDialogOpen(true)
                    }>
                        <Plus className ="h-4 w-4 mr-2"/> Start New Session
                    </Button>
                </div>
            </div>

            <Tabs defaultValue ="active" className ="space-y-4">
                <div className ="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="active" className ="flex gap-2 items-center">
                            <Clock className ="h-4 w-4"/>
                            <span>Active Sessions</span>
                        </TabsTrigger>
                        <TabsTrigger value="completed" className ="flex gap-2 items-cenetr">
                            <CheckCircle className ="h-4 w-4"/>
                            <span>Cpmpleted Sessions</span>
                        </TabsTrigger>
                    </TabsList>

                    <Button variant ="outline" size="sm">
                        <Filter className ="h-4 w-4 mr-2"/>Filter
                    </Button>
                </div>

                <TabsContent value="active" className ="space-y-4">
                    <SessionList
                    status ="active"
                    sessions ={[
                        {
                            id: "1",
                            cropType: "Cabbage",
                            variety: "BG 300",
                            startDate: "2024-03-01",
                            expectedHarvestDate: "2024-06-15",
                            farmSize: "5 acres",
                            district: "Anuradhapura",
                            lastUpdated: "2024-03-12",
                            progress: 25,
                            status: "active",
                        },
                        {
                            id: "2",
                            cropType: "Oinon",
                            variety: "Carrot",
                            startDate: "2024-02-15",
                            expectedHarvestDate: "2024-04-30",
                            farmSize: "2 acres",
                            district: "Anuradhapura",
                            lastUpdated: "2024-03-10",
                            progress: 45,
                            status: "active",
                        },
                    ]}
                    />
                </TabsContent>

                <TabsContent value ="completed" className ="space-y-4">
                    <SessionList 
                    status ="completed"
                    sessions ={[
                        {
                            id: "3",
                            cropType: "Beetroot",
                            variety: "BG 352",
                            startDate: "2023-09-01",
                            endDate: "2024-01-15",
                            farmSize: "4 acres",
                            district: "Anuradhapura",
                            profit: 125000,
                            roi: 32,
                            status: "completed",
                        },
                        {
                            id: "4",
                            cropType: "Potato",
                            variety: "MI-2",
                            startDate: "2023-10-15",
                            endDate: "2024-02-28",
                            farmSize: "3 acres",
                            district: "Anuradhapura",
                            profit: 210000,
                            roi: 45,
                            status: "completed",
                    },
                    ]}
                    />
                </TabsContent>
            </Tabs>

            <NewSessionDialog open={isNewSessionDialogOpen} onOpenChange={setIsNewSessionDialogOpen}/>
        </div>
    )
}