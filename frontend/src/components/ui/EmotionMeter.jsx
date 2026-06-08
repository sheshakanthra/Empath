import React from 'react';
import { motion } from 'framer-motion';

const EmotionMeter = ({ label, value, color = "blue" }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colorMap = {
    blue: "stroke-blue-500",
    pink: "stroke-pink-500",
    green: "stroke-green-500",
    purple: "stroke-purple-500",
    yellow: "stroke-yellow-500",
    red: "stroke-red-500"
  };

  const glowMap = {
    blue: "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    pink: "drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]",
    green: "drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    purple: "drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    yellow: "drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]",
    red: "drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        {/* Background Track */}
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`${colorMap[color]} ${glowMap[color]}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{Math.round(value)}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-400 uppercase tracking-wider">{label}</span>
    </div>
  );
};

export default EmotionMeter;
