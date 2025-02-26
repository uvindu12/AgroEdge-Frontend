import type React from "react"
import { Cloud, BarChart2, Users, FileText, BookOpen, Droplet } from "lucide-react"




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
      icon: <FileText className="h-12 w-12 text-purple-500"  />,
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

  return (
    <div className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
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

