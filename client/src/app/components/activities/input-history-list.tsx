"use client"

import { Alert } from "@/components/ui/alert"
import { AlertTriangle, Droplet, Sprout, Tractor, User } from "lucide-react"
import { useState } from "react"



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

    const filteredInputs = filter === "all" ? mockInputHistory : mockInputHistory. filter ((input) => input.type === filter)

    const totalPages = Math.ceil (filteredInputs.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedInputs = filteredInputs.slice (startIndex, startIndex + itemsPerPage)

    const getInputIcon = (type : string) => {
        switch (type) {
            case "fertilizer":
                return <Sprout className =" h-4 w-4 text-green-500"/>
            case "pesticide":
                return <AlertTriangle className ="h-4 w-4 text-yellow-500"/>
            case "irrigation":
                return <Droplet className ="h-4 w-4 text-blue-500"/>
            case "labor":
                return <User className ="h-4 w-4 text-orange-500"/>
            case "machinery":
                return <Tractor className ="h-4 w-4 text-purple-950"/>
            case "diseases":
                return <AlertTriangle className ="h-4 w-4 text-red-500"/>
            default:
                return null
        }
    }
}