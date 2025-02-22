import React from 'react'
import Navbar from './components/ReuseableComponents/Navbar'
import CardHoverEffectDemo from './cards'
import HeroParallaxDemo from './Hero'
import GlowingEffect from './test'
import GlowingEffectDemoSecond from './test'

function App() {
  return (
    <>
      <Navbar />
      <HeroParallaxDemo/>
      <CardHoverEffectDemo/>
      
      <GlowingEffectDemoSecond/>
    </>   
  )
}

export default App