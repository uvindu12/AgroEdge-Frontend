import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Joinus from "./components/Joinus";
import Navbar from "./components/Navbar";
import { ScrollBasedVelocityDemo } from "./components/Scrollbassed";
import Stats from "./components/Stats";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <ScrollBasedVelocityDemo></ScrollBasedVelocityDemo>
      <Stats></Stats>
      <Features></Features>
      <Joinus></Joinus>
      <Footer/>
    </div>
  );
}
