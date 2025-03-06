import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({ items }) => {
<div id="team" className="text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Meet Our Team</h3>
</div>
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // Track mouse X position

  // Smoothly rotate and translate the tooltip
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="relative group -mr-4"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.6 }} // Adjusted initial position
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "tween", stiffness: 260, damping: 10 },
              }}
              exit={{ opacity: 0, y: -20, scale: 0.6 }}
              style={{ translateX, rotate: "0deg", whiteSpace: "nowrap" }}
              className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-xs font-bold rounded-md bg-white text-gray-500 shadow-xl px-4 py-2 z-50"
            >
              <div className="relative z-30 text-base">{item.name}</div>
              <div className="text-xs">{item.designation}</div>
            </motion.div>
            
            )}
          </AnimatePresence>

          <img
            onMouseMove={handleMouseMove}
            src={item.image}
            alt={item.name}
            className="object-cover object-top rounded-full h-20 w-20 border-2 border-white group-hover:scale-105 group-hover:z-30 relative transition duration-500"
          />
        </div>
      ))}
    </>
  );
};
