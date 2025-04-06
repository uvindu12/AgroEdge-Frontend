"use client"


import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar Skeleton */}
      <div className="w-80 border-r border-border flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="p-4 border-b border-border">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex-1 p-2 space-y-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-start p-3">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
        </div>

        <div className="p-4 border-t border-border">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <Skeleton className="h-6 w-48" />
        </div>

        <div className="flex-1 p-4 space-y-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <div className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className="flex items-start max-w-[70%]">
                    {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full mr-2" />}
                    <Skeleton className={`h-24 ${i % 2 === 0 ? "w-80" : "w-64"} rounded-lg`} />
                    {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full ml-2" />}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-end space-x-2">
            <Skeleton className="flex-1 h-20" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Skeleton */}
      <div className="w-80 border-l border-border hidden lg:block">
        <div className="p-6 text-center">
          <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-6 w-32 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto mb-4" />

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
          </div>
        </div>

        <div className="border-t border-border p-6">
          <Skeleton className="h-5 w-40 mb-4" />
          <div className="space-y-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

