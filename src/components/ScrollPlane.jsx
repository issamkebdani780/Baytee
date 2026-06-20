import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollPlane() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Check if we have scrolled past a tiny threshold to show the plane
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest > 0.01 && latest < 0.99) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollYProgress]);

  // Move vertically from top (10vh) to bottom (85vh)
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ['10vh', '85vh']
  );

  // Points straight down (180deg since default SVG nose points up)
  const rotateTransform = useTransform(scrollYProgress, [0, 1], [180, 180]);

  // Apply spring config for smooth vertical flight movement
  const springConfig = { stiffness: 60, damping: 18 };
  const springConfigTrail1 = { stiffness: 40, damping: 15 };
  const springConfigTrail2 = { stiffness: 28, damping: 13 };
  const springConfigTrail3 = { stiffness: 18, damping: 11 };
  const springConfigTrail4 = { stiffness: 10, damping: 9 };

  const ySmooth = useSpring(yTransform, springConfig);
  const rotateSmooth = useSpring(rotateTransform, springConfig);

  // Trail vertical positions with progressive delays
  const trailY1 = useSpring(yTransform, springConfigTrail1);
  const trailY2 = useSpring(yTransform, springConfigTrail2);
  const trailY3 = useSpring(yTransform, springConfigTrail3);
  const trailY4 = useSpring(yTransform, springConfigTrail4);

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 sm:right-12 top-0 bottom-0 z-50 pointer-events-none select-none w-16">
      {/* Dashed flight path line mapping the scroll track */}
      <div className="absolute top-[10vh] bottom-[15vh] left-1/2 -translate-x-1/2 w-[1px] border-l border-dashed border-brand-gold-500/25" />

      {/* Contrail trail particles (aligning vertically in the center) */}
      <motion.div
        className="absolute w-4 h-4 bg-brand-gold-450/30 rounded-full blur-[1.5px]"
        style={{
          left: '50%',
          top: trailY1,
          x: '-50%',
          y: '-50%',
          opacity: 0.7,
        }}
      />
      <motion.div
        className="absolute w-3 h-3 bg-brand-gold-400/40 rounded-full blur-[2px]"
        style={{
          left: '50%',
          top: trailY2,
          x: '-50%',
          y: '-50%',
          opacity: 0.5,
        }}
      />
      <motion.div
        className="absolute w-2.5 h-2.5 bg-brand-gold-300/30 rounded-full blur-[2.5px]"
        style={{
          left: '50%',
          top: trailY3,
          x: '-50%',
          y: '-50%',
          opacity: 0.35,
        }}
      />
      <motion.div
        className="absolute w-2 h-2 bg-brand-emerald-450/20 rounded-full blur-[2.5px]"
        style={{
          left: '50%',
          top: trailY4,
          x: '-50%',
          y: '-50%',
          opacity: 0.2,
        }}
      />

      {/* Main Traveling Airplane (Pointing straight down, scrolling vertically) */}
      <motion.div
        className="absolute w-28 h-28 flex items-center justify-center"
        style={{
          left: '50%',
          top: ySmooth,
          rotate: rotateSmooth,
          x: '-50%',
          y: '-50%',
        }}
      >
        <svg 
          viewBox="0 0 64 64" 
          className="w-24 h-24 drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3e5ab" />
              <stop offset="55%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#aa7c11" />
            </linearGradient>
            <linearGradient id="wingGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#aa7c11" />
              <stop offset="100%" stopColor="#f3e5ab" />
            </linearGradient>
            <linearGradient id="fireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Engine exhaust jet flames */}
          <path d="M26 44 L28 54 L30 44 Z" fill="url(#fireGrad)" className="animate-pulse" />
          <path d="M34 44 L36 54 L38 44 Z" fill="url(#fireGrad)" className="animate-pulse" />

          {/* Main Wings */}
          <path d="M10 38 L32 18 L54 38 L32 32 Z" fill="url(#wingGrad)" />

          {/* Tail Wings */}
          <path d="M20 50 L32 44 L44 50 L32 47 Z" fill="url(#wingGrad)" />

          {/* Fuselage / Body */}
          <path d="M32 6 C30 6 29 16 29 44 C29 48 32 52 32 52 C32 52 35 48 35 44 C35 16 34 6 32 6 Z" fill="url(#planeGrad)" />

          {/* Cockpit Window */}
          <path d="M32 12 C31.2 12 31 13 31 15 C31 15 32 16 32 16 C32 16 33 15 33 15 C33 13 32.8 12 32 12 Z" fill="#07140e" />

          {/* Engine Glow Circles */}
          <circle cx="28" cy="44" r="1.5" fill="#ffedd5" />
          <circle cx="36" cy="44" r="1.5" fill="#ffedd5" />
        </svg>
      </motion.div>
    </div>
  );
}
