"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, Sprout, Droplet, Users, Tractor, AlertTriangle } from "lucide-react"

// Mock data for input history
const mockInputHistory = [
  {
    id: "1",
    date: "2024-03-12",
    type: "fertilizer",
    details: {
      type: "NPK",
      brand: "CIC",
      quantity: "50",
      npkRatio: "14-14-14",
      applicationMethod: "broadcast",
      cost: "7500",
    },
  },
  {
    id: "2",
    date: "2024-03-10",
    type: "irrigation",
    details: {
      waterSource: "well",
      irrigationMethod: "flood",
      waterUsage: "2000",
      irrigationSchedule: "Morning",
      irrigationCost: "1200",
    },
  },
  {
    id: "3",
    date: "2024-03-08",
    type: "pesticide",
    details: {
      type: "Insecticide",
      name: "Admire",
      quantity: "0.5",
      applicationFrequency: "Once",
      applicationMethod: "spray",
      cost: "2500",
    },
  },
  {
    id: "4",
    date: "2024-03-05",
    type: "labor",
    details: {
      laborHours: "8",
      laborWages: "1500",
    },
  },
  {
    id: "5",
    date: "2024-03-03",
    type: "fertilizer",
    details: {
      type: "Urea",
      brand: "CIC",
      quantity: "25",
      npkRatio: "46-0-0",
      applicationMethod: "broadcast",
      cost: "3750",
    },
  },
]

interface InputHistoryListProps {
  sessionId: string
}

export function InputHistoryList({ sessionId }: InputHistoryListProps) {
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter inputs based on selected filter
  const filteredInputs = filter === "all" ? mockInputHistory : mockInputHistory.filter((input) => input.type === filter)

  // Calculate pagination
  const totalPages = Math.ceil(filteredInputs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInputs = filteredInputs.slice(startIndex, startIndex + itemsPerPage)

  const getInputIcon = (type: string) => {
    switch (type) {
      case "fertilizer":
        return <Sprout className="h-4 w-4 text-green-500" />
      case "pesticide":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "irrigation":
        return <Droplet className="h-4 w-4 text-blue-500" />
      case "labor":
        return <Users className="h-4 w-4 text-orange-500" />
      case "machinery":
        return <Tractor className="h-4 w-4 text-purple-500" />
      case "diseases":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const renderInputDetails = (input: any) => {
    const { type, details } = input

    switch (type) {
      case "fertilizer":
        return (
          <>
            <div>
              <strong>Type:</strong> {details.type}
            </div>
            <div>
              <strong>Brand:</strong> {details.brand}
            </div>
            <div>
              <strong>Quantity:</strong> {details.quantity} kg
            </div>
            <div>
              <strong>NPK Ratio:</strong> {details.npkRatio}
            </div>
            <div>
              <strong>Method:</strong> {details.applicationMethod}
            </div>
            <div>
              <strong>Cost:</strong> Rs. {details.cost}
            </div>
          </>
        )
      case "pesticide":
        return (
          <>
            <div>
              <strong>Type:</strong> {details.type}
            </div>
            <div>
              <strong>Name:</strong> {details.name}
            </div>
            <div>
              <strong>Quantity:</strong> {details.quantity} kg
            </div>
            <div>
              <strong>Frequency:</strong> {details.applicationFrequency}
            </div>
            <div>
              <strong>Method:</strong> {details.applicationMethod}
            </div>
            <div>
              <strong>Cost:</strong> Rs. {details.cost}
            </div>
          </>
        )
      case "irrigation":
        return (
          <>
            <div>
              <strong>Source:</strong> {details.waterSource}
            </div>
            <div>
              <strong>Method:</strong> {details.irrigationMethod}
            </div>
            <div>
              <strong>Usage:</strong> {details.waterUsage} liters
            </div>
            <div>
              <strong>Schedule:</strong> {details.irrigationSchedule}
            </div>
            <div>
              <strong>Cost:</strong> Rs. {details.irrigationCost}
            </div>
          </>
        )
      case "labor":
        return (
          <>
            <div>
              <strong>Hours:</strong> {details.laborHours}
            </div>
            <div>
              <strong>Wages:</strong> Rs. {details.laborWages}
            </div>
          </>
        )
      default:
        return <div>No details available</div>
    }
  }

  return (
    <Card>
        <CardHeader>
            <div className = "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <CardTitle>Input History</CardTitle>
                    <CardDescription> Record of all your farming activities</CardDescription>
                </div>
                <div>
                    <Select value ={filter} onValueChange ={setFilter}>
                        <SelectTrigger className ="w-[180px]">
                            <SelectValue placeholder ="Filter by type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Activities</SelectItem>
                            <SelectItem value="all">Fertilizer</SelectItem>
                            <SelectItem value="all">Pesticide</SelectItem>
                            <SelectItem value="all">Irrigation</SelectItem>
                            <SelectItem value="all">Labor</SelectItem>
                            <SelectItem value="all">Machinery</SelectItem>
                            <SelectItem value="all">Diseases</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            {filteredInputs.length === 0 ? (
                <div className ="text-center py-8">
                    <p className ="text-gray-500">No input history found</p>
                </div>
            ) : (
                <>
                    <div className ="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedInputs.map ((input) => (
                                    <TableRow key={input.id}>
                                        <TableCell>
                                            <div className ="flex items-center gap-2">
                                                <Calendar className ="h-4 w-4 text-gray-500"/>
                                                {new Date (input.date) .toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className ="flex items-center gap-2">
                                                {getInputIcon (input.type)}
                                                <span className = "capitalize">{input.type}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className ="text-sm space-y-1">{renderInputDetails(input)}</div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <div className ="flex items-center justify-between mt-4">
                            <div className ="text-sm text-gray-500">
                                Showing {startIndex + 1 } to {Math.min (startIndex + itemsPerPage, filteredInputs.length)} of {" "}
                                {filteredInputs.length} entries
                            </div>
                            <div className ="flex items-center gap-2">
                                <Button 
                                    variant ="outline" 
                                    size ="icon" 
                                    onClick={() => setCurrentPage ((prev) => Math.max(prev - 1 , 1))}
                                    disabled ={currentPage ===1}>
                                    <ChevronLeft className ="h-4 w-4"/>
                                </Button>
                                <span className ="text-sm">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button 
                                    variant ="outline"
                                    size ="icon"
                                    onClick={() => setCurrentPage ((prev) => Math.min (prev + 1, totalPages))}
                                    disabled = {currentPage === totalPages}>
                                    <ChevronRight className ="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </CardContent>
    </Card>
  )
}

