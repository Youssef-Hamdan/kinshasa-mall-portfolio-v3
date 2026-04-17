"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hexagon } from "lucide-react";

// Massive, architectural-scale pattern
const HEX_PATTERN = [
  // Huge Background Elements
  { top: "-5%", left: "-10%", size: 800, rotate: 15, opacity: 0.03, delay: 0 },
  { top: "20%", left: "60%", size: 600, rotate: -15, opacity: 0.02, delay: 1 },
  { top: "45%", left: "-20%", size: 900, rotate: 30, opacity: 0.015, delay: 2 },
  { top: "70%", left: "70%", size: 750, rotate: 10, opacity: 0.02, delay: 1.5 },
  
  // Medium Accents
  { top: "10%", left: "80%", size: 300, rotate: -10, opacity: 0.04, delay: 0.5 },
  { top: "35%", left: "15%", size: 400, rotate: 20, opacity: 0.03, delay: 0.8 },
  { top: "55%", left: "85%", size: 350, rotate: -5, opacity: 0.04, delay: 1.2 },
  { top: "80%", left: "10%", size: 500, rotate: 45, opacity: 0.02, delay: 0.3 },
  
  // Smaller "Floating" Details
  { top: "25%", left: "40%", size: 150, rotate: 12, opacity: 0.05, delay: 2.1 },
  { top: "65%", left: "30%", size: 200, rotate: -18, opacity: 0.04, delay: 1.7 },
];

export function BackgroundHexagons() {
  const { scrollYProgress } = useScroll();
  
  // Parallax: Moves slower than scroll to create depth
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      <motion.div style={{ y: parallaxY }} className="relative w-full h-[200%]">
        {HEX_PATTERN.map((hex, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: hex.opacity, 
              scale: 1,
              // Subtle "breathing" animation
              y: [0, 30, 0],
            }}
            transition={{
              opacity: { duration: 2 },
              y: { 
                duration: 8 + index, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: hex.delay 
              }
            }}
            className="absolute text-neutral-500 dark:text-white"
            style={{
              top: hex.top,
              left: hex.left,
              width: `${hex.size}px`,
              height: `${hex.size}px`,
              transform: `rotate(${hex.rotate}deg)`,
            }}
          >
            {/* Thinner stroke for larger icons looks more premium */}
            <Hexagon 
              strokeWidth={index % 2 === 0 ? 0.3 : 0.15} 
              className="w-full h-full" 
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}