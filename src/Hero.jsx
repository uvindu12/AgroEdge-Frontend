import React from "react";
import { HeroParallax } from "./components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export default HeroParallaxDemo;


export const products = [
  {
    title: "Farmers Dashboard",
    thumbnail:
      "src/images/agroedgefarmerdashbordjpeg.jpeg",
  },
  {
    title: "AgroEdge",
    thumbnail:
      "src/images/agroedgehome.jpeg",
  },
  {
    title: "AgroEdge Weather Forecasting",
    thumbnail:
    "src/images/agroedgeweatherforcasting.jpeg",
      
  },
  {
    title: "AgroEdge Login",
    thumbnail:
      "src/images/agroedgelogin.jpeg",
  },
  {
    title: " AgroEdge Signup",
    thumbnail:
      "src/images/agroedgesignup.jpeg",
  },
  {
    title: "AgroEdge Data Input",
    thumbnail:
      "src/images/agroedgedataget.jpeg",
  },
  {
    title: "AgroEdge Data Input",
    thumbnail:
      "src/images/agroedgedatainput.jpeg",
  },
  {
    title: "AgroEdge Report",
    thumbnail:
      "src/images/agroedgereportt.jpeg",
  },
  {
    title: "AgroEdge Farmer Dashboard",
    thumbnail:
      "src/images/agroedgefarmerdbrd.jpeg",
  },
  
];
