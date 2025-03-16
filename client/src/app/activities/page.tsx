"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Filter, Plus } from "lucide-react"
import { useState } from "react"




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
            </Tabs>
        </div>
    )
}