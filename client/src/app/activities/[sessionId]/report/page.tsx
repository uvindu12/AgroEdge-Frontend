"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart2, DollarSign, Download, Droplet, Sprout, Tractor, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"


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

            <div className ="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className ="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Harvest Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <h3 className ="text-lg font-medium mb-2">Harvest Details</h3>
                                    <div className ="space-y-2">
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Expected Harvest:</span>
                                            <span>{sessionData.expectedHarvest}</span>
                                        </div>
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Actual Harvest:</span>
                                            <span>{sessionData.actualHarvest}</span>
                                        </div>
                                        <div className=" flex justify-between">
                                            <span className ="text-gray-500">Yield Rate:</span>
                                            <span>{Math.round(
                                                (Number.parseInt(sessionData.actualHarvest) / Number.parseInt (sessionData.farmSize)) * 100,
                                            ) / 100 }{" "} kg/acre</span>
                                        </div>
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Selling Price:</span>
                                            <span>{sessionData.sellingPrice} / kg</span>
                                        </div>
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Buyer Type:</span>
                                            <span>{sessionData.buyerType}</span>
                                        </div>
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Storage Method:</span>
                                            <span>{sessionData.storageMethod}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className ="text-lg font-medium mb-2">Farm Details</h3>
                                    <div className ="space-y-2">
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Farm Size:</span>
                                            <span>{sessionData.farmSize}</span>
                                        </div>
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Farm Type:</span>
                                            <span>{sessionData.farmType}</span>
                                        </div>
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Village:</span>
                                            <span>{sessionData.village}</span>
                                        </div>
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">District:</span>
                                            <span>{sessionData.district}</span>
                                        </div>
                                        <div className ="flex justify-between">
                                            <span className ="text-gray-500">Duration</span>
                                            <span>{Math.round (
                                                (new Date(sessionData.endDate).getTime () - new Date (sessionData.startDate) .getTime())/
                                                (1000 * 60 * 60 * 24),
                                            )}{" "} days
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Expense Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className ="space-y-4">
                                {Object.entries(sessionData.expenses).map(([category, amount]) => (
                                    <div key={category} className ="space-y-1">
                                        <div className ="flex justify-between items-center">
                                            <span className ="capitalize">{category}</span>
                                            <span>Rs. {amount.toLocaleString()}</span>
                                        </div>
                                        <div className ="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className ="bg-blue-600 h-2.5 rounded-full" style ={{width: `${(amount / sessionData.totalExpenses) * 100} 
                                            %`}}></div>
                                        </div>
                                        <p className ="text-xs text-gray-500 text-right">
                                            {Math.round ((amount / sessionData.totalExpenses) * 100)} % of total expenses
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Input Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sprout className="h-5 w-5 text-green-600" />
                                        <h3 className="font-medium">Fertilizer</h3>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Applications:</span>
                                            <span>{sessionData.inputs.fertilizer.count}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Quantity:</span>
                                            <span>{sessionData.inputs.fertilizer.totalQuantity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Cost:</span>
                                            <span>Rs. {sessionData.inputs.fertilizer.totalCost.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Droplet className="h-5 w-5 text-blue-600" />
                                        <h3 className="font-medium">Irrigation</h3>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Applications:</span>
                                            <span>{sessionData.inputs.irrigation.count}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Quantity:</span>
                                            <span>{sessionData.inputs.irrigation.totalQuantity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Cost:</span>
                                            <span>Rs. {sessionData.inputs.irrigation.totalCost.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="h-5 w-5 text-orange-600" />
                                        <h3 className="font-medium">Labor</h3>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Work Days:</span>
                                            <span>{sessionData.inputs.labor.count}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Hours:</span>
                                            <span>{sessionData.inputs.labor.totalHours}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Cost:</span>
                                            <span>Rs. {sessionData.inputs.labor.totalCost.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tractor className="h-5 w-5 text-purple-600" />
                                        <h3 className="font-medium">Machinery</h3>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Uses:</span>
                                            <span>{sessionData.inputs.machinery.count}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Total Cost:</span>
                                            <span>Rs. {sessionData.inputs.machinery.totalCost.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profitability Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>Return on Investment (ROI)</span>
                                        <span className="font-medium">{sessionData.roi}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                        className="bg-green-600 h-2.5 rounded-full"
                                        style={{ width: `${Math.min(sessionData.roi, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>Profit Margin</span>
                                        <span className="font-medium">
                                        {Math.round((sessionData.profit / sessionData.totalRevenue) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${(sessionData.profit / sessionData.totalRevenue) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>Cost per kg</span>
                                        <span className="font-medium">
                                        Rs. {Math.round(sessionData.totalExpenses / Number.parseInt(sessionData.actualHarvest))}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>Profit per kg</span>
                                        <span className="font-medium">
                                        Rs. {Math.round(sessionData.profit / Number.parseInt(sessionData.actualHarvest))}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>Profit per acre</span>
                                        <span className="font-medium">
                                        Rs. {Math.round(sessionData.profit / Number.parseInt(sessionData.farmSize)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recommendations</CardTitle>
                        </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-3 bg-green-50 rounded-md">
                                        <h3 className="font-medium text-green-800">Yield Improvement</h3>
                                        <p className="text-sm text-gray-700 mt-1">
                                            Consider using improved seed varieties and optimizing fertilizer application timing to increase
                                            yield by up to 15% in your next session.
                                        </p>
                                    </div>

                                    <div className="p-3 bg-blue-50 rounded-md">
                                        <h3 className="font-medium text-blue-800">Cost Reduction</h3>
                                        <p className="text-sm text-gray-700 mt-1">
                                            Implement drip irrigation to reduce water usage by 30% and lower irrigation costs in your next crop
                                            cycle.
                                        </p>
                                    </div>

                                    <div className="p-3 bg-amber-50 rounded-md">
                                        <h3 className="font-medium text-amber-800">Market Timing</h3>
                                        <p className="text-sm text-gray-700 mt-1">
                                            Based on historical data, selling your harvest in February could increase your selling price by
                                            10-15%.
                                        </p>
                                    </div>
                                </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Comparison with District Average</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>Yield</span>
                                        <div className="flex items-center gap-1">
                                        <span className="font-medium">+12%</span>
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Your yield was 12% higher than the district average</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>Profit Margin</span>
                                        <div className="flex items-center gap-1">
                                        <span className="font-medium">+8%</span>
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Your profit margin was 8% higher than the district average</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span>Input Costs</span>
                                        <div className="flex items-center gap-1">
                                        <span className="font-medium">-5%</span>
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Your input costs were 5% lower than the district average</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}