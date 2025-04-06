"use client";


import { ForecastCard } from "../cards/forecast-card";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi2";
import { GiBackForth } from "react-icons/gi";
import { GlowingEffect } from "@/components/ui/glowing-effect";


export default function VegetablePriceForecasting() {
  const router = useRouter();

  // Function to handle returning to home
  const handleReturnHome = () => {
    router.push("/");
    console.log("Returning to home...");
  };

  // Function to handle returning to price page
  const handleReturnReportpg = () => {
    router.push("/report");
    console.log("Returning to price page...");
  };

  // Sample data - would normally come from an API
  const forecastData = {
    district: "Colombo",
    vegetable: "Carrot",
    forecast: [
      {
        date: "2025-02-06",
        predicted_price: 175.31,
      },
      {
        date: "2025-02-13",
        predicted_price: 220.02,
      },
      {
        date: "2025-02-13",
        predicted_price: 302.5,
      },
      {
        date: "2025-02-13",
        predicted_price: 256.02,
      },
      {
        date: "2025-02-13",
        predicted_price: 226.02,
      },
      {
        date: "2025-02-13",
        predicted_price: 276.02,
      },
      {
        date: "2025-02-13",
        predicted_price: 245.02,
      },
      {
        date: "2025-02-13",
        predicted_price: 293.02,
      },
      {
        date: "2025-02-13",
        predicted_price: 76.02,
      },
    ],
  };

  return (
    <div
      id="forecast"
      className="flex items-center justify-center w-full px-4 py-10 bg-white"
    >
      <div className="relative w-full min-h-screen p-6 border shadow-lg bg-whvhite max-w-7xl rounded-2xl ">
        <GlowingEffect
          className=""
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="pt-12 text-3xl font-bold text-center text-gray-800">
            Vegetable Price Forecast By{" "}
            <span className="text-green-400"> AgroEdge...</span>
          </h1>
          <p className="pb-8 text-center text-gray-600">
            Weekly price prediction for vegetables in Sri Lanka
          </p>
          <ForecastCard data={forecastData} />

          {/* //buttons here */}

          <div className="absolute bottom-0 right-0 flex pb-8 pr-4 space-x-4">
            <button
              onClick={handleReturnReportpg}
              className="flex items-center px-4 py-2 text-black transition-colors duration-300 bg-white border border-indigo-300 rounded-md hover:bg-indigo-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <GiBackForth className="w-5 h-5 mr-2" />
              Return To Report
            </button>
            <button
              onClick={handleReturnHome}
              className="flex items-center px-4 py-2 text-black transition-colors duration-300 bg-white border border-blue-400 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <HiHome className="w-5 h-5 mr-2" />
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
