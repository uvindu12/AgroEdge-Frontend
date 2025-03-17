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
            </div>
        </CardHeader>
    </Card>
  )
}

