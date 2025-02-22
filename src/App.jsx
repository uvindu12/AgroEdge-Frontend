import React from 'react'
import Navbar from './components/ReuseableComponents/Navbar'
import Hero from './components/ReuseableComponents/Hero'
import CardHoverEffectDemo from './test'

function App() {
  return (
    <>
      <Navbar />
      <Hero/>
      <CardHoverEffectDemo/>
    </>   
  )
}

export default App