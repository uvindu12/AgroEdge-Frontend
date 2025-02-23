import React from 'react'
import Navbar from './components/ReuseableComponents/Navbar'
import CardHoverEffectDemo from './cards'
import HeroParallaxDemo from './Hero'
import GlowingEffect from './aboutus'
import GlowingEffectDemoSecond from './aboutus'
import SignupFormDemo from './test'

function App() {
  return (
    <>
      <Navbar />
      <HeroParallaxDemo/>
      <CardHoverEffectDemo/>
      <GlowingEffectDemoSecond/>
      <SignupFormDemo/>
    </>   
  )
}

export default App