// API client functions for the AgroEdge application

/**
 * Register a new farmer
 */
export async function registerFarmer(userData: {
    fullName: string
    email: string
    password: string
    district: string
    farmSize?: string
    farmingExperience?: string
  }) {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
  
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Registration failed")
    }
  
    return response.json()
  }
  
  /**
   * Get district-based crop recommendations
   */
  export async function getDistrictRecommendations(district: string) {
    const response = await fetch(`/api/district-recommendations?district=${encodeURIComponent(district)}`)
  
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to fetch recommendations")
    }
  
    return response.json()
  }
  
  