"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicLoader() {
  const [loading, setLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Check if preloader already ran in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded === 'true') {
      setLoading(false);
      return;
    }

    // Lock body scrolling during loader display
    document.body.style.overflow = 'hidden';

    // 1. Check current page loading state
    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
    } else {
      const handleLoad = () => setIsPageLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded === 'true') return;

    // 2. Minimum display duration for the logo reveal video (2.8 seconds)
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2800);

    // 3. Failsafe safety timeout (5.5 seconds) in case of extremely slow network assets
    const safetyTimer = setTimeout(() => {
      setIsPageLoaded(true);
      setMinTimeElapsed(true);
    }, 5500);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  // 4. Trigger preloader exit only when both conditions are met
  useEffect(() => {
    if (minTimeElapsed && isPageLoaded) {
      setLoading(false);
      sessionStorage.setItem('hasLoaded', 'true');
      document.body.style.overflow = '';
    }
  }, [minTimeElapsed, isPageLoaded]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle slow floating background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[30%] left-[30%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          </div>

          {/* Centered Logo Reveal Video Player in a Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
            className="w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden flex items-center justify-center z-10 border-2 border-white/10 shadow-[0_0_35px_rgba(255,255,255,0.12)] bg-white relative"
          >
            <video
              src="/Lakshya_Hospital_logo_reveal.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Subtle loading fallback indicator at the bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.35,
              transition: { delay: 1, duration: 0.8 } 
            }}
            className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none z-10"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
            </div>
            <p className="text-[9px] font-bold text-white tracking-[0.2em] uppercase">
              Loading Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
