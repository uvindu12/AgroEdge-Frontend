import React from 'react'
import Navbar from './components/ReuseableComponents/Navbar'
import Footer from './components/ReuseableComponents/Footer'
import CardHoverEffectDemo from './cards'
import HeroParallaxDemo from './hero'
import GlowingEffect from './aboutus'
import GlowingEffectDemoSecond from './aboutus'
import SignupFormDemo from './contact'
import AnimatedTooltipPreview from './team'
function App() {
  return (
    <>
      <Navbar />
      <HeroParallaxDemo/>
      <CardHoverEffectDemo/>
      <GlowingEffectDemoSecond/>
      <SignupFormDemo/>
      <AnimatedTooltipPreview/>
      <Footer/>
    </>
  )
}

export default App