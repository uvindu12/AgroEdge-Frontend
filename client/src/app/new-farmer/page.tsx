"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Cloud,
  Users,
  FileText,
  Settings,
  BookOpen,
  Database,
  User,
  Sun,
  CloudRain,
  Wind,
  DollarSign,
  Calendar,
  TrendingUp,
  Sprout,
  BarChart2,
} from "lucide-react"
import { Card } from "../components/ui/Card"
import CardContent from "../components/ui/CardContent"
import { Button } from "../components/ui/Button"
import CardHeader from "../components/ui/CardHeader"
import CardTitle from "../components/ui/CardTitle"
import CardDescription from "../components/ui/CardDescription"
import CardFooter from "../components/ui/CardFooter"
import { Progress } from "../components/ui/Progress"

const districtRecommendations = {
    district: "Anuradhapura",
    mostGrown: {
        crop: "Onion",
        percentage: 68,
        averageYield: "5.2 tons/hectare",
        totalFarmers:150,
        growthRate: 14,
    },
    mostProfitable: {
        crop: "Leeks",
        averageProfit: "Rs. 150,000 / hectare",
        roi: 134,
        marketDemand: "High",
        priceStability: "Medium",
    },
    otherRecommendations: [
        { crop: "Onions", profitability: 85, popularity: 62 },
        { crop: "Soybeans", profitability: 78, popularity: 45 },
        { crop: "Maize", profitability: 72, popularity: 58 },
    ],
}

const weatherIcons = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain,
    windy: Wind,
}
  
interface WeatherData {
condition: keyof typeof weatherIcons
temperature: number
humidity: number
windSpeed: number
}

export default function NewFarmerPage (){
    const [weather, setWeather] = useState<WeatherData> ({
    condition: "sunny",
    temperature: 25,
    humidity: 65,
    windSpeed: 10,
    })
    const [userData, setUserData] = useState({
        name: "John Perera",
        district: districtRecommendations.district,
        memberSince: "March 2023",
    })
    const [showWelcomeCard, setShowWelcomeCard] = useState(true)
    
    const features = [
        {
            title: "Profile",
            description: "Manage your farm profile and preferences",
            icon: User,
            color: "bg-blue-500",
            path: "/profile",
        },
        {
            title: "Weather",
            description: "Real-time weather updates and forecasts",
            icon: Cloud,
            color: "bg-sky-500",
            path: "/weather",
        },
        {
            title: "Community",
            description: "Connect with other farmers",
            icon: Users,
            color: "bg-green-500",
            path: "/community",
        },
        {
            title: "Reports",
            description: "View and generate farm reports",
            icon: FileText,
            color: "bg-yellow-500",
            path: "/report",
        },
        {
            title: "Input Data",
            description: "Manage your farming data",
            icon: Database,
            color: "bg-purple-500",
            path: "/input-data",
        },
        {
            title: "Settings",
            description: "Configure your account settings",
            icon: Settings,
            color: "bg-gray-500",
            path: "/settings",
        },
        {
            title: "Learning",
            description: "Access farming resources and guides",
            icon: BookOpen,
            color: "bg-red-500",
            path: "/learning",
        },
    ]

    const router = useRouter () 

    const handleFeatureClick = (path: string) =>
    {
        router.push(path)
    }

    useEffect (() => {
        const fetchUserData = async () => {
            try {

            } catch (error) {
                console.error ("Error fetching user data :", error)
            }
        }

        fetchUserData () 
    }, [])

    return (
        <div className = "min-h-screen bg-gray-50">
            <div className= "container mx-auto px-4 py-8">
                {showWelcomeCard && (
                    <Card className ="mb-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
                        <CardContent>
                            <div className ="flex flec-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h2 className ="text-2xl font-bold mb-2">Welcome to AgroEedge, {userData.name} !</h2>
                                    <p className = "mb-4">
                                        Based on Successful farmers in {userData.district}, we've prepared personalized crop recommendations for you.
                                    </p>
                                </div>

                                <Button className="bg-white text-green-700 hover:bg-green-50 mt-4 md:mt-0" onClick={() => setShowWelcomeCard (false)}>
                                    Got it
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="mb-8">
                    <h2 className ="text-2xl font-bold mb-4">Recommended Crops for {userData.district}</h2>
                    <div className = "grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className ="pb-2">
                                <div className ="flex items-center justify-between">
                                    <CardTitle className ="text-xl">Most Grown Crop</CardTitle>
                                    <Sprout className ="h-5 w-5 text-green-500"/>
                                </div>
                                <CardDescription>
                                    Based on {districtRecommendations.mostGrown.totalFarmers} farmers in your district
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className ="space-y-4">
                                    <div className= "flex items-center justify-between">
                                        <h3 className ="text-3xl font-bold text-green-600">
                                            {districtRecommendations.mostGrown.crop}
                                        </h3>
                                        <span className = "text-sm font-medium bg-green-100 text-green-800 py-1 px-2 rounded-full">
                                            {districtRecommendations.mostGrown.percentage} % of farmers
                                        </span>
                                    </div>
                                    <div className ="space-y-2">
                                        <div className ="flex justify-between text-sm">
                                            <span className ="text-gary-500">Average Yeild</span>
                                            <span className ="font-medium">{districtRecommendations.mostGrown.averageYield}</span>
                                        </div>
                                        <div className ="flex justify-between text-sm">
                                            <span className ="text-gray-500">Growth Rate</span>
                                            <span className= "font=medium text-green-600">
                                                +{districtRecommendations.mostGrown.growthRate}% this year 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className= "w-full bg-green-400  hover:bg-green-300 hover:font-bold hover:text-green-800 mt-8">
                                    View Detailed Guide
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className ="pb-2">
                                <div className ="flex items-center justify-between">
                                    <CardTitle className ="text-xl">Most Profitable Crop</CardTitle>
                                    <TrendingUp className = "h-5 w-5 text-green-500"/>
                                </div>
                                <CardDescription>Highest return on investment in your district</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className = "space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-3xl font-bold text-green-600">{districtRecommendations.mostProfitable.crop}</h3>
                                        <span className="text-sm font-medium bg-green-100 text-green-800 py-1 px-2 rounded-full">
                                        {districtRecommendations.mostProfitable.roi}% ROI
                                        </span>
                                    </div>
                                    <div className  ="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Average Profit</span>
                                        <span className="font-medium">{districtRecommendations.mostProfitable.averageProfit}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Market Demand</span>
                                        <span className="font-medium">{districtRecommendations.mostProfitable.marketDemand}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Price Stability</span>
                                        <span className="font-medium">{districtRecommendations.mostProfitable.priceStability}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className ="w-full bg-green-400  hover:bg-green-300 hover:font-bold hover:text-green-800">
                                    View Profit Analysis
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                <div className ="mb-8">
                    <h2 className = "text-xl font-semibold mb-4">Other Recommendaed Crops</h2>
                    <div className ="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {districtRecommendations.otherRecommendations.map ((crop) => (
                            <Card key={crop.crop}>
                                <CardHeader className ="pb-2">
                                    <CardTitle className ="text-lg">{crop.crop}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className ="space-y-3">
                                        <div>
                                            <div className ="flex justify-between mb-1">
                                                <span className ="text-sm text-gray-500">Profitability</span>
                                                <span className ="text-sm font-medium">{crop.profitability}%</span>
                                            </div>
                                            <Progress value = {crop.profitability} className ="h-2"/>
                                        </div>
                                        <div>
                                            <div className ="flex justify-between mb-1 mt-5">
                                                <span className ="text-sm text-gray-500">Popuparity</span>
                                                <span className ="text-sm font-medium">{crop.popularity}%</span>
                                            </div>
                                            <Progress value ={crop.popularity} className ="h-2 "/>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}