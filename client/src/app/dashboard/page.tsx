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

// Mock data for district-based crop recommendations
// In a real app, this would come from an API call after user authentication
const districtRecommendations = {
  district: "Anuradhapura",
  mostGrown: {
    crop: "Rice",
    percentage: 68,
    averageYield: "5.2 tons/hectare",
    totalFarmers: 1245,
    growthRate: 12,
  },
  mostProfitable: {
    crop: "Chili",
    averageProfit: "Rs. 350,000/hectare",
    roi: 215,
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

export default function DashboardPage() {
  const [weather, setWeather] = useState<WeatherData>({
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

  const router = useRouter()

  const handleFeatureClick = (path: string) => {
    router.push(path)
  }

  // In a real application, this would fetch the user data and district recommendations
  useEffect(() => {
    // Simulating API call to get user data and district recommendations
    const fetchUserData = async () => {
      try {
        // This would be an actual API call in a real application
        // const response = await fetch('/api/user-data');
        // const data = await response.json();
        // setUserData(data.userData);
        // setDistrictRecommendations(data.recommendations);
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner for New Users */}
        {showWelcomeCard && (
          <Card className="mb-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to AgroEdge, {userData.name}!</h2>
                  <p className="mb-4">
                    Based on successful farmers in {userData.district}, we've prepared personalized crop recommendations
                    for you.
                  </p>
                </div>
                <Button
                  
                  className="bg-white text-green-700 hover:bg-green-50 mt-4 md:mt-0"
                  onClick={() => setShowWelcomeCard(false)}
                >
                  Got it
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* District-based Crop Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recommended Crops for {userData.district}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Most Grown Crop Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Most Grown Crop</CardTitle>
                  <Sprout className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>
                  Based on {districtRecommendations.mostGrown.totalFarmers} farmers in your district
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-green-600">{districtRecommendations.mostGrown.crop}</h3>
                    <span className="text-sm font-medium bg-green-100 text-green-800 py-1 px-2 rounded-full">
                      {districtRecommendations.mostGrown.percentage}% of farms
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Average Yield</span>
                      <span className="font-medium">{districtRecommendations.mostGrown.averageYield}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Growth Rate</span>
                      <span className="font-medium text-green-600">
                        +{districtRecommendations.mostGrown.growthRate}% this year
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  View Detailed Guide
                </Button>
              </CardFooter>
            </Card>

            {/* Most Profitable Crop Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Most Profitable Crop</CardTitle>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>Highest return on investment in your district</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-green-600">{districtRecommendations.mostProfitable.crop}</h3>
                    <span className="text-sm font-medium bg-green-100 text-green-800 py-1 px-2 rounded-full">
                      {districtRecommendations.mostProfitable.roi}% ROI
                    </span>
                  </div>
                  <div className="space-y-2">
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
                <Button className="w-full">
                  View Profit Analysis
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Other Recommended Crops */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Other Recommended Crops</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {districtRecommendations.otherRecommendations.map((crop) => (
              <Card key={crop.crop}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{crop.crop}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Profitability</span>
                        <span className="text-sm font-medium">{crop.profitability}%</span>
                      </div>
                      <Progress value={crop.profitability} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Popularity</span>
                        <span className="text-sm font-medium">{crop.popularity}%</span>
                      </div>
                      <Progress value={crop.popularity} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Explanation of the recommendation system */}
        <Card className="mb-8">
          <CardHeader className="">
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              How We Generate Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Our recommendation system analyzes data from all farmers in your district to identify:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>The most commonly grown crops (based on acreage and number of farmers)</li>
              <li>The most profitable crops (based on income vs. expenses)</li>
              <li>Market trends and demand forecasts</li>
              <li>Environmental suitability for your specific location</li>
            </ul>
            <p className="text-gray-700 mt-4">
              These recommendations are updated quarterly to ensure you always have the most current information.
            </p>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Features & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleFeatureClick(feature.path)}
              >
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className={`p-2 rounded-lg ${feature.color}`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="ml-4 text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dashboard Overview */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Daily Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Weather Card */}
            <Card>
              <CardHeader className="">
                <CardTitle className="flex items-center">
                  <Cloud className="mr-2 h-5 w-5" />
                  Weather Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {React.createElement(weatherIcons[weather.condition], {
                      className: "h-12 w-12 text-blue-500",
                    })}
                    <div className="ml-4">
                      <p className="text-3xl font-bold">{weather.temperature}°C</p>
                      <p className="text-gray-600">Humidity: {weather.humidity}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Wind Speed</p>
                    <p className="font-semibold">{weather.windSpeed} km/h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Updates Card */}
            <Card>
              <CardHeader className="">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
                    Irrigation scheduled for 2 PM
                  </li>
                  <li className="flex items-center text-blue-600">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
                    Check soil moisture levels
                  </li>
                  <li className="flex items-center text-yellow-600">
                    <div className="w-2 h-2 rounded-full bg-yellow-600 mr-2" />
                    Fertilizer application due
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Monthly Income Card */}
            <Card>
              <CardHeader className="">
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Monthly Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-green-600">$12,450</p>
                    <p className="text-sm text-gray-600">Current Month</p>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span>8.2% increase from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

