import { HoverEffect } from "./components/ui/card-hover-effect";
import Navbar from "./components/ReuseableComponents/Navbar";

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
    {
      title: "Weather Analysis",
      icon: "weather",
      description:
"Plan farming activities with real-time weather updates and accurate forecasts. Get alerts for extreme weather, rainfall, and temperature changes. Prepare in advance to protect crops and reduce risks, ensuring better outcomes throughout the farming season."}
,
    {
      title: "Market Insights",
      icon: "chart",
      description:
        "Access AI-powered price forecasts to maximize earnings by selling at the right time. Stay updated on market trends and supply-demand shifts. Our platform provides reliable price predictions, helping farmers make informed selling decisions for better profits.",
    },
    {
      title: "Community Hub",
      icon: "users",
      description:
        "Connect with fellow farmers to share experiences, tips, and advice. Participate in discussions on sustainable practices, pest control, and farming techniques. Build valuable networks to support each other and grow together in a collaborative farming community.",
      
    },
    {
      title: "Personalized Reports ",
      icon: "link",
      description:
        "Receive tailored reports based on your farm’s production data. Track yield trends, soil health, and water usage. Our system offers actionable insights to optimize efficiency, increase output, and improve farm management strategies for better profitability.",
      
    },
    {
      title: "Learning Resources",
      icon: "cart",
      description:
        "Explore expert guides and courses on sustainable farming, crop management, and advanced techniques. Stay updated on new practices to improve efficiency and productivity. Learn about organic farming, irrigation systems, and sustainable practices to enhance your farming approach.",
      
    },
    {
      title: "Resource Optimization ",
      icon: "laptop",
      description:
        "Optimize water and resource usage with smart farming tools. Reduce waste while improving crop yield and efficiency. Use precision farming techniques to ensure sustainable practices, reduce costs, and preserve resources for long-term farm success and environmental benefits.",
      
    },
  ];
  
  