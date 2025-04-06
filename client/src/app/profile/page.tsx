"use client";

import { useState, useEffect } from "react";
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
  ChevronRight,
  Award,
  TrendingUp,
  Clock,
  Droplet,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Router, useRouter } from "next/router";
import Link from "next/link";

// Define TypeScript interface for the farmer profile data
interface FarmerProfile {
  personal: {
    name: string;
    avatar: string;
    location: string;
    phone: string;
    email: string;
    memberSince: string;
    bio: string;
  };
  farm: {
    name: string;
    size: string;
    soilType: string;
    waterSource: string;
    mainCrops: string[];
    certifications: string[];
    equipment: string[];
  };
  crops: {
    name: string;
    area: string;
    yield: string;
    season: string;
    profit: string;
  }[];
  statistics: {
    totalHarvests: number;
    averageYield: string;
    profitMargin: string;
    waterUsage: string;
    sustainability: string;
  };
  achievements: { title: string; date: string }[];
  recentActivity: { action: string; date: string }[];
}

export default function FarmerProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded userId for now; replace with dynamic value after authentication
  const userId = "005a8061c6";

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const response = await fetch(`http://localhost:5002/api/profile/${userId}`);
  //       if (!response.ok) {
  //         throw new Error((await response.json()).error || "Failed to fetch profile");
  //       }
  //       const data: FarmerProfile = await response.json();
  //       setProfile(data);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, [userId]);

  

  // Fetch profile data using the dynamic userId with fetch
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5002/api/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch profile");
        }

        const data: FarmerProfile = await response.json();
        setProfile(data);
        toast.success("Profile loaded successfully!");
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        toast.error(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-green-300 shadow-md">
            <AvatarImage src={profile.personal.avatar} alt={profile.personal.name} />
            <AvatarFallback>{profile.personal.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{profile.personal.name}</h1>
              <div className="flex items-center text-green-700 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.personal.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.farm.certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Link href="/farmer-report">
                <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-300 hover:font-bold hover:text-green-800">
                  <Edit className="h-4 w-4 bg-green-400 hover:bg-green-500 hover:font-bold hover:text-green-800" />
                  View Report
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                 
                    <Button  className= "bg-green-600 hover:bg-green-300 hover:font-bold hover:text-green-800">
                      <Settings className="h-5 w-5 " />
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
                <p className="font-medium">{profile.personal.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Mail className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profile.personal.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">{profile.personal.memberSince}</p>
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
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{profile.personal.bio}</p>
              </CardContent>
            </Card>

            {/* Statistics Card */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Total Harvests</span>
                    <span className="text-sm font-medium">{profile.statistics.totalHarvests}</span>
                  </div>
                  <Progress value={(profile.statistics.totalHarvests / 50) * 100} className="h-2 bg-green-200" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 mt-5">Average Yield</span>
                    <span className="text-sm font-medium">{profile.statistics.averageYield}</span>
                  </div>
                  <Progress value={85} className="h-2 bg-green-200" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 mt-5">Profit Margin</span>
                    <span className="text-sm font-medium">{profile.statistics.profitMargin}</span>
                  </div>
                  <Progress
                    value={parseFloat(profile.statistics.profitMargin)}
                    className="h-2 bg-green-200"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 mt-5">Sustainability</span>
                    <span className="text-sm font-medium">{profile.statistics.sustainability}</span>
                  </div>
                  <Progress
                    value={parseFloat(profile.statistics.sustainability)}
                    className="h-2 bg-green-200"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Achievements Card */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.achievements.map((achievement, index) => (
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
                <Button className="w-full bg-green-500 hover:bg-green-300 hover:font-bold hover:text-green-800">
                  View All Achievements
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Activity Card */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.recentActivity.map((activity, index) => (
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
                <Button className="w-full bg-green-500 hover:bg-green-300 hover:font-bold hover:text-green-800">
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
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Farm Name</h3>
                      <p className="mt-1">{profile.farm.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Farm Size</h3>
                      <p className="mt-1">{profile.farm.size}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Soil Type</h3>
                      <p className="mt-1">{profile.farm.soilType}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Water Source</h3>
                      <p className="mt-1">{profile.farm.waterSource}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Main Crops</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.farm.mainCrops.map((crop, index) => (
                          <Badge key={index} variant="secondary">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Certifications</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.farm.certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
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
              <CardHeader>
                <CardTitle>Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.farm.equipment.map((equipment, index) => (
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
                <Button className="w-full bg-green-400 hover:bg-green-300 hover:font-bold hover:text-green-800">
                  Add Equipment
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Farm Map Placeholder */}
          <Card>
            <CardHeader>
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
            <CardHeader>
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
                    {profile.crops.map((crop, index) => (
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
              <Button className="w-full bg-green-400 hover:bg-green-300 hover:font-bold hover:text-green-800">
                Add New Crop
              </Button>
            </CardFooter>
          </Card>

          {/* Crop Recommendations */}
          <Card>
            <CardHeader>
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
            <CardHeader>
              <CardTitle>Yield Trends</CardTitle>
              <CardDescription>Monthly yield performance over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-48 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Yield Trends Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profit Analysis */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profit Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Revenue vs Expenses</h3>
                    <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">Revenue vs Expenses Chart Placeholder</p>
                    </div>
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
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Water Usage</span>
                    </div>
                    <span className="text-sm">{profile.statistics.waterUsage}</span>
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
  );
}