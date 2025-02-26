"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface Award {
  title: string
  year: string
}

const awards: Award[] = [
  { title: "Best AgriTech Solution", year: "2024" },
  { title: "Sustainability Innovation Award", year: "2023" },
  { title: "Farmer's Choice App", year: "2023" },
  { title: "Tech for Good Award", year: "2022" },
  { title: "AgriTech Startup of the Year", year: "2022" },
  { title: "Environmental Impact Award", year: "2021" },
]

const AwardCard: React.FC<Award> = ({ title, year }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{year}</p>
    </div>
  )
}

const AwardGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseTrailRef = useRef<Array<{ x: number; y: number }>>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    const drawTrail = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < mouseTrailRef.current.length; i++) {
        const point = mouseTrailRef.current[i]
        const nextPoint = mouseTrailRef.current[i + 1] || point

        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(nextPoint.x, nextPoint.y)
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.5 - i * 0.02})`
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.stroke()
      }

      mouseTrailRef.current = mouseTrailRef.current.slice(-50)
      animationFrameRef.current = requestAnimationFrame(drawTrail)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseTrailRef.current.push({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    drawTrail()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="relative py-16 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Award Winning Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {awards.map((award, index) => (
            <AwardCard key={index} title={award.title} year={award.year} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AwardGrid

