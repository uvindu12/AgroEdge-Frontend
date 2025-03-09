"use client"

import { useState } from "react"
import { 
    MapPin,
    Phone,
    Mail, 
    Calendar,
    Edit,
    Tractor,
    Leaf,
    BarChart2,
    Settings,
    Camera,
    ChevronRight,
    Award,
    TrendingUp,
    Clock,
    Droplet,
} from "lucide-react"
import { Badge } from "../components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Progress } from "../components/ui/Progress"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Card } from "../components/ui/Card"
import CardHeader from "../components/ui/CardHeader"
import CardTitle from "../components/ui/CardTitle"
import CardContent from "../components/ui/CardContent"
import CardFooter from "../components/ui/CardFooter"
import CardDescription from "../components/ui/CardDescription"


const farmerData = {
    personal: {
        name: "Rajitha Gamage",
        avatar:"",
        location:"Anuradhapura, Sri Lanka",
        phone: "+94 77 123 4567",
        email: "rajith.gamage@example.com",
        memberSince:"March 2024",
        bio: " I am a farmer who has been farming for over 10 years. I have a small farm in Anuradhapura and I grow a variety of crops including rice, vegetables, and fruits. I am passionate about farming and I am always looking for ways to improve my farming practices.",
    },
    farm: {
        name: "Green Vally Farm",
        size: "12 acres",
        soilType:" Loamy",
        waterSource: "Irrigation Canal",
        mainCrops: ["Rice", "Vegetables", "Fruits"],
        certifications: ["Organic Certified", "Good Agricultural Practices"],
        equipment: ["Tractor", "Water Pump", "Harvester"],
    },
    crops: [
        { name: "Rice", area: "8 acres", yield: "5.2 tons/acre", season: "Maha", profit: "High" },
        { name: "Vegetables", area: "3 acres", yield: "Varied", season: "Year-round", profit: "Medium" },
        { name: "Fruits", area: "1 acre", yield: "Varied", season: "Year-round", profit: "Medium" },
    ],
    statistics: {
    totalHarvests: 42,
    averageYield: "4.8 tons/acre",
    profitMargin: "32%",
    waterUsage: "Efficient",
    sustainability: "85%",
    },
    achievements: [
    { title: "Top Rice Producer 2022", date: "December 2022" },
    { title: "Sustainable Farming Award", date: "June 2023" },
    { title: "Community Leader", date: "January 2023" },
    ],
    recentActivity: [
    { action: "Updated crop data", date: "2 days ago" },
    { action: "Added new harvest record", date: "1 week ago" },
    { action: "Completed soil analysis", date: "2 weeks ago" },
    ],
}

const SimpleBarChart = () => {
    return (
      <div className="w-full h-48 mt-4">
        <div className="flex h-full items-end gap-2">
          {[65, 40, 85, 55, 75, 90, 50, 80, 60, 70, 45, 95].map((value, index) => (
            <div key={index} className="relative flex-1 group">
              <div
                className="absolute bottom-0 w-full bg-green-500 rounded-t-sm transition-all duration-300 group-hover:bg-green-600"
                style={{ height: `${value}%` }}
              ></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {value}%
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    )
}

export default function FarmerProfilePage () {
    const [activeTab, setActiveTab] = useState ("overview")

    return(
        <div className= "container mx-auto px-4 py-8">
            <div className= " flex flex-col md:flex--row gap-6 mb-8">
                <div className= " relative group">
                    <Avatar className = " h-24 w-24 border-4 border-green-300 shadow-md">
                        <AvatarImage src= {farmerData.personal.avatar} alt={farmerData.personal.name}/>
                        <AvatarFallback>{farmerData.personal.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button className="h-6 w-6">
                            <Camera className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className= "flex-1">
                    <div className= "flex flex-col md:flex-row justify-berween items-start md:items-center">
                        <div>
                            <h1 className= "text-3xl font-bold">
                                {farmerData.personal.name}
                            </h1>
                            <div className= " flex items-center text-green-600 mt-1">
                                <MapPin className= "h-4 w-4 mr-1"/>
                                <span>{farmerData.personal.location}</span>
                            </div>
                            <div className= "flex flex-wrap gap-2 mt-2">
                                {farmerData.farm.certifications.map((cert, index) => (
                                    <Badge key={index} variant="outline" className= "bg-green-50 text-green-700 border-green-200">
                                        {cert}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className= "flex gap-2 mt-4 md:mt-0">
                            <Button className= "flex item-center gap-2">
                                <Edit className= "h-4 w-4"/>
                                Edit Profile
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button>
                                        <Settings className="h-5 w-5"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Profile Settings</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>Privacy Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
                                    <DropdownMenuItem>Account Security</DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem className= "tect-red-600">Delete Account</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className= "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className= "flex items-center gap-2">
                            <div className= "bg-blue-100 p-2 rounded-full">
                                <Phone className= "h-4 w-4 text-blue-600"/>
                            </div>
                            <div>
                                <p className = "text-sm text-gray-500">Phone</p>
                                <p className= "font-medium">{farmerData.personal.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className= "bg-green-100 p-2 rounded-full">
                                <Mail className= "h-4 w-4 text-green-600"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className = "font-medium">{farmerData.personal.email}</p>
                            </div>
                        </div>
                        <div className = "flex items-center gap-2">
                            <div className = "bg-amber-100 p-2 rounded-full">
                                <Calendar className = "h-4 w-4 text-amber-600"/>
                            </div>
                            <div>
                                <p className = "text-sm text-gray-500">Member Since</p>
                                <p className = "font-medium">{farmerData.personal.memberSince}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab section */}

            <Tabs value= {activeTab} onValueChange = { setActiveTab} className= "space-y-6">
                <TabsList className = "grid grid=cols-4 md:w - [600px]">
                    <TabsTrigger value = "overview">Overview</TabsTrigger>
                    <TabsTrigger value = "farm">Farm Details</TabsTrigger>
                    <TabsTrigger value = "crops">Crops</TabsTrigger>
                    <TabsTrigger value = "analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* overview tab section */}

                <TabsContent value= "overview" className= "space-y-6">
                    <div className = "grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Card className = "md:col-span-2">
                            <CardHeader className = "">
                                <CardTitle>About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className = "text-gray-700">{farmerData.personal.bio}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className = "">
                                <CardTitle>Statistics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <div className = "flex justify-between mb-1 mt-5">
                                        <span className= "text-sm text-gray-600 mb-2">Total Harvests</span>
                                        <span className = "text-sm font-medium">{farmerData.statistics.totalHarvests}</span>
                                    </div>
                                    <Progress value={60} className ="h-2"/>
                                </div>
                                <div>
                                    <div className = "flex justify-between mb-1 mt-5">
                                        <span className = "text-sm text-gray-600 mb-2">Average Yield</span>
                                        <span className = "text-sm font-medium"> {farmerData.statistics.averageYield}</span>
                                    </div>
                                    <Progress value={84} className= "h-2 "/>
                                </div>
                                <div>
                                    <div className ="flex justify-between mb-1 mt-5">
                                        <span className = "text-sm text-gray-600 mb-2">Profit Margin</span>
                                        <span className = "text-sm font-medium">{farmerData.statistics.profitMargin}</span>
                                    </div>
                                    <Progress value={62} className= "h-2"/>
                                </div>
                                <div>
                                    <div className = "flex justify-between mb-1  mt-5">
                                        <span className= "text-sm text-gray-600 mb-2">Sustainability</span>
                                        <span className = "text-sm font-medium">{farmerData.statistics.sustainability}</span>
                                    </div>
                                    <Progress value ={51} className = "h-2"/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    

                </TabsContent>
            </Tabs>
        </div>
    )
}