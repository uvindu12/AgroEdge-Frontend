"use client"

import { useState } from "react"
import { Calendar, MessageSquare, Users, Star, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Card } from "../components/ui/Card"
import CardHeader from "../components/ui/CardHeader"
import CardTitle from "../components/ui/CardTitle"
import CardDescription from "../components/ui/CardDescription"
import CardContent from "../components/ui/CardContent"
import { Button } from "../components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Input } from "../components/ui/Input"

// Mock data (replace with API calls in a real application)
const forumTopics = [
  { id: 1, title: "Best practices for organic farming", replies: 23, views: 156 },
  { id: 2, title: "Water conservation techniques", replies: 18, views: 132 },
  { id: 3, title: "Dealing with crop diseases", replies: 31, views: 203 },
  { id: 4, title: "Sustainable pest control methods", replies: 27, views: 178 },
]

const upcomingEvents = [
  { id: 1, title: "Annual Farmers' Conference", date: "2024-05-15", location: "Colombo" },
  { id: 2, title: "Organic Farming Workshop", date: "2024-06-02", location: "Kandy" },
  { id: 3, title: "Agricultural Tech Expo", date: "2024-07-10", location: "Galle" },
]

const featuredMembers = [
  { id: 1, name: "Kumara Perera", specialty: "Rice Farming", avatar: "/avatars/farmer1.jpg" },
  { id: 2, name: "Malini Fernando", specialty: "Organic Vegetables", avatar: "/avatars/farmer2.jpg" },
  { id: 3, name: "Rajitha Silva", specialty: "Tea Cultivation", avatar: "/avatars/farmer3.jpg" },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AgroEdge Community</h1>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search community..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="forum" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="members">Featured Members</TabsTrigger>
        </TabsList>

        <TabsContent value="forum">
          <Card>
            <CardHeader className ="">
              <CardTitle>Recent Discussions</CardTitle>
              <CardDescription>Join the conversation with fellow farmers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forumTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-lg">{topic.title}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>{topic.replies} replies</span> • <span>{topic.views} views</span>
                      </div>
                    </div>
                    <Button >
                      View <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full">Start a New Discussion</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader className ="">
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Connect with the farming community in person</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <Calendar className="inline-block mr-1 h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()} • {event.location}
                      </div>
                    </div>
                    <Button >Learn More</Button>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full">View All Events</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader className = "">
              <CardTitle>Featured Members</CardTitle>
              <CardDescription>Learn from experienced farmers in our community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full">View All Members</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader className ="">
          <CardTitle>Community Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-100 rounded-lg">
              <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold">5,234</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <MessageSquare className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold">12,456</div>
              <div className="text-sm text-gray-600">Forum Posts</div>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg">
              <Star className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
              <div className="text-2xl font-bold">987</div>
              <div className="text-sm text-gray-600">Expert Contributors</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

