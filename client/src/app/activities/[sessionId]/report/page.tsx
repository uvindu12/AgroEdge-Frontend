"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, BarChart2, DollarSign, Download, TrendingUp } from "lucide-react"
import Link from "next/link"


const sessionData = {
    id: "3",
    cropType: "Rice",
    variety: "BG 352",
    startDate: "2023-09-01",
    endDate: "2024-01-15",
    farmSize: "4 acres",
    district: "Anuradhapura",
    village: "Mihintale",
    farmType: "Paddy",
    expectedHarvest: "8000 kg",
    actualHarvest: "7500 kg",
    sellingPrice: "120",
    buyerType: "Wholesaler",
    storageMethod: "Bags",
    totalRevenue: 900000,
    totalExpenses: 675000,
    profit: 225000,
    roi: 33,
    status: "completed",
    expenses: {
        fertilizer: 180000,
        pesticide: 75000,
        irrigation: 120000,
        labor: 200000,
        machinery: 80000,
        seeds: 20000,
    },
    inputs: {
        fertilizer: {
            count: 8,
            totalQuantity: "400 kg",
            totalCost: 180000,
        },
        pesticide: {
            count: 5,
            totalQuantity: "10 kg",
            totalCost: 75000,
        },
        irrigation: {
            count: 15,
            totalQuantity: "30000 liters",
            totalCost: 120000,
        },
        labor: {
            count: 20,
            totalHours: "160 hours",
            totalCost: 200000,
        },
        machinery: {
            count: 6,
            totalCost: 80000,
        },
    },
}

export default function SessionReportPage() {
    const params = useParams()
    const router = useRouter()
    const sessionId = params.sessionId as string

    return (
        <div className ="container mx-auto px-4 py-6 md:py-8">
            <div className ="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className = "flex-items-center gap-2">
                    <Link href ={`/activities/${sessionId}`}>
                        <Button variant ="ghost" size ="icon">
                            <ArrowLeft className ="h-5 w-5"/>
                        </Button>
                    </Link>
                    <div>
                        <div className ="flex items-center gap-2">
                            <h1 className ="text-2xl md:text-3xl font-bold">
                                {sessionData.cropType} - {sessionData.variety}
                            </h1>
                            <Badge className ="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>
                        </div>
                        <p className ="text-gray-500 mt-1">
                            {new Date(sessionData.startDate).toLocaleDateString()} -{" "}
                            {new Date(sessionData.endDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className ="flex flex-col sm:flex-row gap-3">
                    <Button variant ="outline" className="flex items-center gap-2">
                        <Download className ="h-4 w-4"/>
                        <span>Download Report</span>
                    </Button>
                </div>
            </div>

            <div className ="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className ="bg-green-50">
                    <CardContent className ="pt-6">
                        <div className ="flex items-center justify-between">
                            <div className ="flex items-center gap-2">
                                <DollarSign className ="h-5 w-5 text-green-600"/>
                                <h3 className ="font-medium">Total Revenue</h3>
                            </div>
                            <span className ="text-2xl font-bold">Rs. {sessionData.totalRevenue.toLocaleString()}</span>
                        </div>
                        <p className ="text-sm text-gray-500 mt-2">
                            {sessionData.actualHarvest} × Rs. {sessionData.sellingPrice} /kg
                        </p>
                    </CardContent>
                </Card>

                <Card className =" bg-red-50">
                    <CardContent className ="pt-6">
                        <div className ="flex items-center justify-between">
                            <div className ="flex items-center gap-2">
                                <BarChart2 className ="h-5 w-5 text-red-600"/>
                                <h3 className ="font-medium">Total Expenese</h3>
                            </div>
                            <span className ="text-2xl font-bold">Rs. {sessionData.totalExpenses. toLocaleString()}</span>
                        </div>
                        <p className ="text-sm text-gray-500 mt-2">All costs including input and labor</p>
                    </CardContent>
                </Card>

                <Card className ="bg-blue-50">
                    <CardContent className ="pt-6">
                        <div className ="flex items-center justify-between">
                            <div className ="flex items-center gap-2">
                                <TrendingUp className ="h-5 w-5 text-blue-600"/>
                                <h3 className ="font-medium">Net Profit</h3>
                            </div>
                            <span className ="text-2xl font-bold">Rs. {sessionData.profit.toLocaleString()}</span>
                        </div>
                        <p className ="text-sm text-gray-500 mt-2">ROI: {sessionData.roi}%</p>
                    </CardContent>
                </Card>
            </div>

            
        </div>
    )
}