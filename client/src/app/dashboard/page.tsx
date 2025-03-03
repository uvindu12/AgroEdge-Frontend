"use client"

import React from "react"

import { useState } from "react"
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
} from "lucide-react"
import { useRouter } from "next/navigation";
import { Card } from "../components/ui/Card"
import CardHeader from "../components/ui/CardHeader"
import CardTitle from "../components/ui/CardTitle"
import CardContent from "../components/ui/CardContent"


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

  const features = [
    {
      title: "Profile",
      description: "Manage your farm profile and preferences",
      icon: User,
      color: "bg-blue-500",
    },
    {
      title: "Weather",
      description: "Real-time weather updates and forecasts",
      icon: Cloud,
      color: "bg-sky-500",
    },
    {
      title: "Community",
      description: "Connect with other farmers",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Reports",
      description: "View and generate farm reports",
      icon: FileText,
      color: "bg-yellow-500",
    },
    {
      title: "Input Data",
      description: "Manage your farming data",
      icon: Database,
      color: "bg-purple-500",
    },
    {
      title: "Settings",
      description: "Configure your account settings",
      icon: Settings,
      color: "bg-gray-500",
    },
    {
      title: "Learning",
      description: "Access farming resources and guides",
      icon: BookOpen,
      color: "bg-red-500",
    },
  ]

  const router = useRouter()

  const handleFeatureClick = (path: string) => {
    router.push(path)
  }
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner with Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Close%20up%20farmers%20handshake%20outdoor%20on%20a%20field%20%281%29.jpg-6lE5X5SdkYRPbhFR4Zdl6IRvNbQnd0.jpeg"
          alt="Farmers shaking hands in field at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to AgroEdge</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Join our community of forward-thinking farmers. Get access to real-time insights, expert knowledge, and
              connect with fellow agricultural professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Features & Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature) => (
            <Card
              key={feature.title}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick(feature.title.toLowerCase().replace(" ", "-"))}
            >
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className={`p-2 rounded-lg ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="ml-4 text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Daily Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  )
}

