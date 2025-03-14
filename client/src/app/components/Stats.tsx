"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface CounterAnimationProps {
  end: number
  duration?: number
  label: string
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ end, duration = 2000, label }) => {
  const [count, setCount] = useState<number>(0)
  const countRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      const startTime = Date.now()
      const updateCount = () => {
        const currentTime = Date.now()
        const progress = Math.min((currentTime - startTime) / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(easeOutQuart * end)

        setCount(currentCount)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(updateCount)
        }
      }

      frameRef.current = requestAnimationFrame(updateCount)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate()
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [end, duration])

  return (
    <div ref={countRef} className="relative group">
      <div className="transform transition-all duration-300 group-hover:scale-105">
        <div className="relative p-6 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-50" />

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(count / end) * 283} 283`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">
                    {count}
                    <span className="text-green-500">+</span>
                  </span>
                </div>
              </div>
            </div>
            <h3 className="text-center text-gray-700 font-medium text-lg">{label}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

const Stats: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Growing Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <CounterAnimation end={50} label="Total Comments " />
          <CounterAnimation end={70} label="Total Farmers " />
          <CounterAnimation end={20} label="Total Feedback " />
          <CounterAnimation end={60} label="Total Visitors " />
        </div>
      </div>
    </div>
  )
}

export default Stats

