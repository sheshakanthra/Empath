import React from 'react';
import { motion } from 'framer-motion';

const WaveformVisualizer = ({ isRecording }) => {
  const bars = Array.from({ length: 40 });

  return (
    <div className="flex items-center justify-center gap-1 h-24 w-full px-4 overflow-hidden">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: 4 }}
          animate={isRecording ? {
            height: [4, Math.random() * 80 + 10, 4],
          } : { height: 4 }}
          transition={isRecording ? {
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          } : { duration: 0.3 }}
          className="w-1 rounded-full bg-gradient-to-t from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
