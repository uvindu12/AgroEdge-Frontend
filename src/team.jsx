"use client";
import React from "react";
import { AnimatedTooltip } from "./components/ui/animated-tooltip";

import ashanImage from "../src/images/Ashan.jpeg";
import anjanaImage from "../src/images/Anjana.jpeg";
import uvinduImage from "../src/images/Uvindu.jpeg";
import devindaImage from "../src/images/Devinda.jpeg";
import helithImage from "../src/images/Helith.jpeg";

const people = [

  {
    id: 1,
    name: "Helith Jayasuriya",
    designation: "Backend Developer",
    image: helithImage 
  },
  {
    id: 2,
    name: "Uvindu Kithmina",
    designation: "UI Designer & Frontend Developer",
    image: uvinduImage 
  },
  {
    id: 3,
    name: "Ashan Bandara",
    designation: "ML & DevOps Engineer",
    image: ashanImage 
 },
  {
    id: 4,
    name: "Anjana Ranasinghe",
    designation: "Backend Developer",
    image: anjanaImage },
  {
    id: 5,
    name: "Devinda Jayasooriya",
    designation: "Fullstack Developer",
    image: devindaImage },
  
];

export default function AnimatedTooltipPreview() {
  return (
    (<div id="team" className="flex flex-col items-center justify-center my-20 w-full space-y-6">
      {/* Heading */}
      <h3 className="text-2xl font-bold text-gray-800">Meet Our Team</h3>

      {/* Tooltip Component */}
      <div className="flex flex-wrap justify-center">
        <AnimatedTooltip items={people} />
      </div>
    </div>)
  );
}
