import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface GlowBackgroundProps {
  isDarkMode: boolean;
}

export default function GlowBackground({ isDarkMode }: GlowBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate gentle background particles once on construct
    const generated: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20, // Start inside negative delay so they are instantly in motion
    }));
    setParticles(generated);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 transition-colors duration-500 ${
      isDarkMode ? 'bg-[#050505]' : 'bg-[#fafafa]'
    }`}>
      {/* 3D Cyber Grid Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDarkMode ? 'opacity-[0.06]' : 'opacity-[0.03]'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, #06b6d4 1px, transparent 1px),
            linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radiant Glowing Orbs (Soft moving ambiance) */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[100px] transition-colors duration-500 ${
          isDarkMode ? 'bg-cyan-900/15' : 'bg-cyan-100/30'
        }`}
      />

      <motion.div
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[130px] transition-colors duration-500 ${
          isDarkMode ? 'bg-blue-900/15' : 'bg-blue-100/20'
        }`}
      />

      {/* Tech Radial Focus to dim out corners */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-radial-at-c from-transparent via-[#050505]/95 to-[#050505]' 
          : 'bg-radial-at-c from-transparent via-[#fafafa]/80 to-[#fafafa]'
      }`} />

      {/* Drifting Light Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full blur-[1px] transition-colors duration-500 ${
            isDarkMode ? 'bg-cyan-400/35' : 'bg-cyan-600/15'
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: ['0vh', '-105vh'],
            x: ['0vw', `${(Math.random() - 0.5) * 10}vw`],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
