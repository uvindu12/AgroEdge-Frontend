import type React from "react"
import Navbar from "./component/Navbar"
import Hero from "./component/Hero"
import Stats from "./component/Stats"
import AwardGrid from "./component/AwardGrid"

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <AwardGrid />
    </div>
  )
}

export default App

