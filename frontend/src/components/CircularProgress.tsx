"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function CircularProgress({
  value,
  size = 200,
  strokeWidth = 14,
  label,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 150);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.round(progress * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  // Color mapping based on stress percentage
  let strokeColor = "stroke-accent"; // default blue
  let glowColor = "rgba(59, 130, 246, 0.15)";
  
  if (value < 0.35) {
    strokeColor = "stroke-success"; // Green for mild/low stress
    glowColor = "rgba(34, 197, 94, 0.15)";
  } else if (value >= 0.35 && value < 0.7) {
    strokeColor = "stroke-amber-500"; // Orange/Yellow for moderate
    glowColor = "rgba(245, 158, 11, 0.15)";
  } else if (value >= 0.7) {
    strokeColor = "stroke-rose-500"; // Red for severe
    glowColor = "rgba(244, 63, 94, 0.15)";
  }

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl transition-all duration-1000"
        style={{ backgroundColor: glowColor, transform: "scale(0.8)" }}
      />

      <svg width={size} height={size} className="transform -rotate-90 relative z-10">
        {/* Track circle */}
        <circle
          className="stroke-slate-100 dark:stroke-slate-800"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Fill circle */}
        <motion.circle
          className={`transition-all duration-1000 ease-out ${strokeColor}`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center justify-center z-25 text-center">
        <motion.span 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans font-extrabold text-4xl text-primary dark:text-white tracking-tight"
        >
          {percentage}%
        </motion.span>
        <span className="font-sans font-medium text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
          {label || "Nilai CF"}
        </span>
      </div>
      
    </div>
  );
}
