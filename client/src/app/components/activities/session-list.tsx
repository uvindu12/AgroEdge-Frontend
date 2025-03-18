import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight, Leaf, MapPin, Clock, TrendingUp, AlertCircle } from "lucide-react"


type Session = {
    id: string
    cropType: string
    variety: string
    startDate: string
    expectedHarvestDate?: string
    endDate?: string
    farmSize: string
    district: string
    lastUpdated?: string
    progress?: number
    profit?: number
    roi?: number
    status: "active" | "completed"
}

interface SessionListProps {
    sessions: Session []
    status: "active" | "completed"
}

export function SessionList ({ sessions, status}  : SessionListProps) {
    if (sessions.length === 0) {
        return (
            <div className ="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className ="h-12 w-12 text-gray-400 mb-4"/>
                <h3 className ="text-lg font-medium">No {status} sessions found</h3>
                <p className ="text-gray-500 mt-2">
                    {status === "active" ?
                    "Start a new crop sesson to begin tracking your farming activities."
                    : "Your compeleted sessions will appear here."}
                </p>
            </div>
        )
    }

    return (
        <div className ="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((session) => (
                <Card key={session.id} className ="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className ="p-0">
                        <div className ="p-4">
                            <div className ="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className= "font-semibold text-lg">{session.cropType}</h3>
                                    <p className ="text-sm text-gray-500">Variety: {session.variety}</p>
                                </div>
                                <Badge variant ={status === "active" ? "default" : "outline"}
                                className ={status === "active" 
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                }
                                >
                                    {status === "active" ? "Active" : "Completed"}
                                </Badge>
                            </div>

                            <div className ="grid grid-cols-2 gap-2 mt-4">
                                <div className ="flex items-center text-sm">
                                    <Calendar className ="h-4 w-4 mr-2 text-gray-500"/>
                                    <span>
                                        {new Date(session.startDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className ="flex items-center text-sm">
                                    <MapPin className ="h-4 w-4 mr-2 text-gray-500"/>
                                    <span>{session.district}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Leaf className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>{session.farmSize}</span>
                                </div>
                                {status === "active" ? (
                                <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>Updated: {session.lastUpdated}</span>
                                </div>
                                ) : (
                                <div className="flex items-center text-sm">
                                    <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>ROI: {session.roi}%</span>
                                </div>
                                )}
                            </div>

                            {status === "active" && session.progress !== undefined && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span >Progress</span>
                                        <span >{session.progress}%</span>
                                    </div>
                                <Progress value={session.progress} className="h-2 bg-green-100" />
                                </div>
                            )}

                            {status === "completed" && session.profit !== undefined && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Profit</span>
                                        <span className="font-medium">Rs. {session.profit.toLocaleString()}</span>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4">
                                <Link href={`/activities/${session.id}`}>
                                    <Button  variant="outline" className="w-full bg-green-100 hover:bg-green-500 hover:text-green-50">
                                        {status === "active" ? "Manage Session" : "View Report"}
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}