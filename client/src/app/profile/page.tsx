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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"




// Mock data for the farmer profile
const farmerData = {
  personal: {
    name: "Rajith Kumara",
    avatar:
      "",
    location: "Anuradhapura, Sri Lanka",
    phone: "+94 71 234 5678",
    email: "rajith.kumara@example.com",
    memberSince: "March 2021",
    bio: "Third-generation rice farmer with 15 years of experience. Specializing in sustainable farming practices and organic rice varieties.",
  },
  farm: {
    name: "Green Valley Farm",
    size: "12 acres",
    soilType: "Loamy",
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

// Chart component (simplified for this example)
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

export default function FarmerProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-green-300 shadow-md">
            <AvatarImage src={farmerData.personal.avatar} alt={farmerData.personal.name} />
            <AvatarFallback>{farmerData.personal.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{farmerData.personal.name}</h1>
              <div className="flex items-center text-green-700 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{farmerData.personal.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {farmerData.farm.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Profile Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Privacy Settings</DropdownMenuItem>
                  <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
                  <DropdownMenuItem>Account Security</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Delete Account</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{farmerData.personal.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Mail className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{farmerData.personal.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">{farmerData.personal.memberSince}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[600px] bg-green-200">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="farm">Farm Details</TabsTrigger>
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bio Card */}
            <Card className="md:col-span-2">
              <CardHeader className="">
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{farmerData.personal.bio}</p>
              </CardContent>
            </Card>

            {/* Statistics Card */}
            <Card>
              <CardHeader className="">
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Total Harvests</span>
                    <span className="text-sm font-medium">{farmerData.statistics.totalHarvests}</span>
                  </div>
                  <Progress value={70} className="h-2 bg-green-200" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 mt-5">Average Yield</span>
                    <span className="text-sm font-medium">{farmerData.statistics.averageYield}</span>
                  </div>
                  <Progress value={85}  className="h-2 bg-green-200 " />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 mt-5">Profit Margin</span>
                    <span className="text-sm font-medium">{farmerData.statistics.profitMargin}</span>
                  </div>
                  <Progress value={65} className="h-2 bg-green-200"/>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 mt-5">Sustainability</span>
                    <span className="text-sm font-medium">{farmerData.statistics.sustainability}</span>
                  </div>
                  <Progress value={85} className="h-2 bg-green-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Achievements Card */}
            <Card>
              <CardHeader className="">
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmerData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full mt-1">
                        <Award className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button  className="w-full bg-green-400  hover:bg-green-300 hover:font-bold hover:text-green-800">
                  View All Achievements
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Activity Card */}
            <Card>
              <CardHeader className= "">
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmerData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-1">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button  className="w-full bg-green-400  hover:bg-green-300 hover:font-bold hover:text-green-800">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Farm Details Tab */}
        <TabsContent value="farm" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Farm Info Card */}
            <Card className="md:col-span-2">
              <CardHeader className= "">
                <CardTitle>Farm Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Farm Name</h3>
                      <p className="mt-1">{farmerData.farm.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Farm Size</h3>
                      <p className="mt-1">{farmerData.farm.size}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Soil Type</h3>
                      <p className="mt-1">{farmerData.farm.soilType}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Water Source</h3>
                      <p className="mt-1">{farmerData.farm.waterSource}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Main Crops</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {farmerData.farm.mainCrops.map((crop, index) => (
                          <Badge key={index} variant="secondary">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Certifications</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {farmerData.farm.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Card */}
            <Card>
              <CardHeader className= "">
                <CardTitle>Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmerData.farm.equipment.map((equipment, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-full">
                        <Tractor className="h-4 w-4 text-slate-600" />
                      </div>
                      <span>{equipment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button  className="w-full bg-green-400  hover:bg-green-300 hover:font-bold hover:text-green-800">
                  Add Equipment
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Farm Map Placeholder */}
          <Card>
            <CardHeader className = "">
              <CardTitle>Farm Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Interactive Farm Map</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Crops Tab */}
        <TabsContent value="crops" className="space-y-6">
          {/* Current Crops */}
          <Card>
            <CardHeader className = "">
              <CardTitle>Current Crops</CardTitle>
              <CardDescription>Overview of crops currently being grown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Crop</th>
                      <th className="text-left py-3 px-4">Area</th>
                      <th className="text-left py-3 px-4">Expected Yield</th>
                      <th className="text-left py-3 px-4">Season</th>
                      <th className="text-left py-3 px-4">Profit Potential</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmerData.crops.map((crop, index) => (
                      <tr key={index} className="border-b hover:bg-green-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-green-100 p-2 rounded-full">
                              <Leaf className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="font-medium">{crop.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{crop.area}</td>
                        <td className="py-3 px-4">{crop.yield}</td>
                        <td className="py-3 px-4">{crop.season}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              crop.profit === "High"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {crop.profit}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-400  hover:bg-green-300 hover:font-bold hover:text-green-800">Add New Crop</Button>
            </CardFooter>
          </Card>

          {/* Crop Recommendations */}
          <Card>
            <CardHeader className = "">
              <CardTitle>Crop Recommendations</CardTitle>
              <CardDescription>Based on your location and farm conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      High Profit
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mt-2">Chili</h3>
                  <p className="text-sm text-gray-600 mt-1">Ideal for your soil type and climate</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profit Potential</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-1 bg-green-200" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Water Efficient
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mt-2">Soybeans</h3>
                  <p className="text-sm text-gray-600 mt-1">Low water requirements, good market demand</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profit Potential</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-1 bg-green-200" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Popular
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mt-2">Onions</h3>
                  <p className="text-sm text-gray-600 mt-1">High demand in your district</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profit Potential</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-1 bg-green-200" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Yield Trends */}
          <Card>
            <CardHeader className = "">
              <CardTitle>Yield Trends</CardTitle>
              <CardDescription>Monthly yield performance over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleBarChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profit Analysis */}
            <Card className="md:col-span-2">
              <CardHeader className = "">
                <CardTitle>Profit Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Revenue vs Expenses</h3>
                    <div className="bg-gray-100 h-40 rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium">Total Revenue</h3>
                      </div>
                      <p className="text-2xl font-bold mt-2">Rs. 1,245,000</p>
                      <p className="text-sm text-green-600 mt-1">+12% from last year</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-red-600" />
                        <h3 className="font-medium">Total Expenses</h3>
                      </div>
                      <p className="text-2xl font-bold mt-2">Rs. 845,000</p>
                      <p className="text-sm text-red-600 mt-1">+5% from last year</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Usage */}
            <Card>
              <CardHeader className = "">
                <CardTitle>Resource Usage</CardTitle>
              </CardHeader>
              <CardContent >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Water Usage</span>
                    </div>
                    <span className="text-sm">Efficient</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Fertilizer</span>
                    </div>
                    <span className="text-sm">Optimal</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Labor</span>
                    </div>
                    <span className="text-sm">Efficient</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Tractor className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium">Equipment</span>
                    </div>
                    <span className="text-sm">Good</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

