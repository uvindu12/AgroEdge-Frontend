"use client"

import React, { useState, useEffect }  from "react"
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
  Calendar ,
  TrendingUp,
  Sprout,
  BarChart2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  
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
      title: "Activity",
      description: "See your recent farming activities",
      icon: Sprout,
      color: "bg-yellow-500",
      path: "/activities", 
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
      hover: "hover:bg-red-800",
    },
  ]

  const router = useRouter()

  const handleFeatureClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className= "min-h-screen bg-gray-50">
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/images/dashboard.png"
          alt="Farmers shaking hands in field at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to <span className= "text-green-600">Agro</span><span className= "text-green-400">Edge</span></h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Join our community of forward-thinking farmers. Get access to real-time insights, expert knowledge, and
              connect with fellow agricultural professionals.
            </p>
          </div>
        </div>
      </div>
      <div className= " container mx-auto px-4 py-8">
        <div className= "mb-8">
          <h2 className= " text-2xl font-semibold mb-4 "><span className="text-green-400">AgroEdge</span> System Features and Tools</h2>
          <div className= " grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5">
          {features.map((feature) => (
              <Card
                key={feature.title}
                className="hover:shadow-2xl transition-shadow cursor-pointer hover:bg-green-100"
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
      </div>
    </div>
  )
}

