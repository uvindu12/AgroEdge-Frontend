import React from 'react'
import Navbar from './components/ReuseableComponents/Navbar'
import CardHoverEffectDemo from './cards'
import HeroParallaxDemo from './Hero'

function App() {
  return (
    <>
      <Navbar />
      <HeroParallaxDemo/>
      <CardHoverEffectDemo/>
    </>   
  )
}

export default App