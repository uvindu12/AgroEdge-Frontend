import { NextResponse } from "next/server"

// This is a mock implementation. In a real application, this would query your PostgreSQL database
export async function GET(request: Request) {
  // Get the district from the query parameters
  const { searchParams } = new URL(request.url)
  const district = searchParams.get("district")

  if (!district) {
    return NextResponse.json({ error: "District parameter is required" }, { status: 400 })
  }

  try {
    // In a real application, this would be a database query to your PostgreSQL database
    // Example SQL query:
    /*
    -- Query to find the most grown crop in a district
    SELECT 
      crop_name,
      COUNT(*) as farmer_count,
      SUM(acreage) as total_acreage,
      AVG(yield_per_acre) as average_yield
    FROM 
      crops
    JOIN 
      farmers ON crops.farmer_id = farmers.id
    WHERE 
      farmers.district = $1
    GROUP BY 
      crop_name
    ORDER BY 
      farmer_count DESC, total_acreage DESC
    LIMIT 1;

    -- Query to find the most profitable crop in a district
    SELECT 
      crop_name,
      AVG(income - expenses) as average_profit,
      AVG((income - expenses) / expenses * 100) as roi
    FROM 
      crops
    JOIN 
      farmers ON crops.farmer_id = farmers.id
    WHERE 
      farmers.district = $1
    GROUP BY 
      crop_name
    ORDER BY 
      average_profit DESC
    LIMIT 1;
    */

    // Mock data for demonstration
    const districtData = {
      Anuradhapura: {
        mostGrown: {
          crop: "Rice",
          percentage: 68,
          averageYield: "5.2 tons/hectare",
          totalFarmers: 1245,
          growthRate: 12,
        },
        mostProfitable: {
          crop: "Chili",
          averageProfit: "Rs. 350,000/hectare",
          roi: 215,
          marketDemand: "High",
          priceStability: "Medium",
        },
        otherRecommendations: [
          { crop: "Onions", profitability: 85, popularity: 62 },
          { crop: "Soybeans", profitability: 78, popularity: 45 },
          { crop: "Maize", profitability: 72, popularity: 58 },
        ],
      },
      Colombo: {
        mostGrown: {
          crop: "Vegetables",
          percentage: 52,
          averageYield: "12.5 tons/hectare",
          totalFarmers: 780,
          growthRate: 8,
        },
        mostProfitable: {
          crop: "Mushrooms",
          averageProfit: "Rs. 420,000/hectare",
          roi: 245,
          marketDemand: "High",
          priceStability: "High",
        },
        otherRecommendations: [
          { crop: "Leafy Greens", profitability: 92, popularity: 75 },
          { crop: "Herbs", profitability: 88, popularity: 60 },
          { crop: "Flowers", profitability: 82, popularity: 45 },
        ],
      },
      // Add more districts as needed
    }

    // Return the recommendations for the requested district
    const recommendations = districtData[district as keyof typeof districtData] || {
      mostGrown: {
        crop: "Rice",
        percentage: 50,
        averageYield: "4.0 tons/hectare",
        totalFarmers: 500,
        growthRate: 5,
      },
      mostProfitable: {
        crop: "Vegetables",
        averageProfit: "Rs. 200,000/hectare",
        roi: 150,
        marketDemand: "Medium",
        priceStability: "Medium",
      },
      otherRecommendations: [
        { crop: "Fruits", profitability: 70, popularity: 60 },
        { crop: "Grains", profitability: 65, popularity: 75 },
        { crop: "Pulses", profitability: 60, popularity: 50 },
      ],
    }

    return NextResponse.json({
      district,
      recommendations,
    })
  } catch (error) {
    console.error("Error fetching district recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch district recommendations" }, { status: 500 })
  }
}

