import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({ heading, text, children, className }: DashboardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Your <span className="text-green-700">Agro</span> <span className="text-green-400">Edge</span> Personalized Dashboard</h1>
      {text && <p className="text-muted-foreground">Based on your farm details, we've prepared recommendations to help you get started.</p>}
      {children}
    </div>
  )
}

