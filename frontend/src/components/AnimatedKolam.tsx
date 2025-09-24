"use client";

import { motion, AnimatePresence } from "framer-motion";

export const AnimatedKolam = () => {
  const gridSize = 5;
  const spacing = 80;
  const center = 250;

  // Generate grid points
  const points: { x: number; y: number }[] = [];
  for (let i = -Math.floor(gridSize / 2); i <= Math.floor(gridSize / 2); i++) {
    for (
      let j = -Math.floor(gridSize / 2);
      j <= Math.floor(gridSize / 2);
      j++
    ) {
      points.push({
        x: center + i * spacing,
        y: center + j * spacing,
      });
    }
  }

  return (
    <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full">
      {/* Grid dots (fade in simultaneously) */}
      <AnimatePresence>
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={5}
            fill="black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Kolam stroke (line connecting points) */}
      <motion.path
        d={`M${points.map((p) => `${p.x},${p.y}`).join(" L ")}`}
        stroke="#d4af37"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1 }}
      />
    </svg>
  );
};
