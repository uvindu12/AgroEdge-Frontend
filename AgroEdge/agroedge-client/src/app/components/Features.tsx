"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Cloud, BarChart2, Users, FileText, BookOpen, Droplet } from "lucide-react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  life: number
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-white-50 rounded-full mb-4">
          <div className="text-blue-500 w-8 h-8">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

const Features: React.FC = () => {
  const features = [
    {
      icon: <Cloud className="h-12 w-12 text-blue-400" />,
      title: "Weather Analysis",
      description:
        "Plan farming activities with real-time weather updates and accurate forecasts. Get alerts for extreme weather, rainfall, and temperature changes. Prepare in advance to protect crops and reduce risks.",
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-yellow-500" />,
      title: "Market Insights",
      description:
        "Access AI-powered price forecasts to maximize earnings by selling at the right time. Stay updated on market trends and supply-demand shifts. Our platform provides reliable price predictions.",
    },
    {
      icon: <Users className="h-12 w-12 text-orange-500" />,
      title: "Community Hub",
      description:
        "Connect with fellow farmers to share experiences, tips, and advice. Participate in discussions on sustainable practices, pest control, and farming techniques. Build valuable networks.",
    },
    {
      icon: <FileText className="h-12 w-12 text-purple-500" />,
      title: "Personalized Reports",
      description:
        "Receive tailored reports based on your farm's production data. Track yield trends, soil health, and water usage. Our system offers actionable insights to optimize efficiency and improve farm management.",
    },
    {
      icon: <BookOpen className="h-12 w-12 text-green-500" />,
      title: "Learning Resources",
      description:
        "Explore expert guides and courses on sustainable farming, crop management, and advanced techniques. Stay updated on new practices to improve efficiency and productivity. Learn about organic farming.",
    },
    {
      icon: <Droplet className="h-12 w-12 text-blue-600" />,
      title: "Resource Optimization",
      description:
        "Optimize water and resource usage with smart farming tools. Reduce waste while improving crop yield and efficiency. Use precision farming techniques to ensure sustainable practices and reduce costs.",
    },
  ]

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
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

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      life: Math.random() * 60 + 60,
    })

    const drawParticles = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new particles
      if (Math.random() < 0.3) {
        particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y))
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.life--

        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1)
        } else {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(34, 197, 94, ${particle.life / 120})`
          ctx.fill()

          // Draw connections
          particlesRef.current.forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(34, 197, 94, ${(100 - distance) / 1000})`
              ctx.lineWidth = 0.5
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          })
        }
      })

      animationFrameRef.current = requestAnimationFrame(drawParticles)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    drawParticles()

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how our innovative solutions empower farmers with cutting-edge technology and data-driven insights
            for sustainable agriculture.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features

