import React from 'react'
import Navbar from './components/ReuseableComponents/Navbar'
import Footer from './components/ReuseableComponents/Footer'
import CardHoverEffectDemo from './cards'
import HeroParallaxDemo from './hero'
import GlowingEffectDemoSecond from './aboutus'
import GlowingEffectDemoSecondsec from './contact'
import AnimatedTooltipPreview from './team'

function App() {
  return (
    <>
      <Navbar />
      <HeroParallaxDemo/>
      <CardHoverEffectDemo/>
      <GlowingEffectDemoSecond/>
      <GlowingEffectDemoSecondsec/>
      <AnimatedTooltipPreview/>
      <Footer/>
    </>
  )
}

export default App