"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SongWidget } from "@/components/SongWidget";
import type { EnhancedNikitaItem } from "@/types";

interface LetterProps {
  item: EnhancedNikitaItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const LIQUID_SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
  mass: 1.1,
};

export function Letter({ item, index, isExpanded, onToggle }: LetterProps) {
  // Local state strictly initialized to false for independence
  const [localExpanded, setLocalExpanded] = useState(false);
  const letterRef = useRef<HTMLButtonElement>(null);

  // Sync with parent accordion state
  useEffect(() => {
    setLocalExpanded(isExpanded);
  }, [isExpanded]);

  // Dynamic font-variation reacting to scroll (width + optical size for modern reactive typography)
  useEffect(() => {
    const handleScroll = () => {
      if (!letterRef.current) return;
      const scrollY = window.scrollY;
      const sectionTop = letterRef.current.getBoundingClientRect().top + window.scrollY;
      const distance = Math.abs(scrollY - sectionTop);
      const intensity = Math.max(0, Math.min(1, distance / 300));
      
      // Subtle variation: compress width and adjust optical size based on scroll distance
      const wdth = 100 - intensity * 8;
      const opsz = 80 - intensity * 12;
      letterRef.current.style.fontVariationSettings = `"wght" 700, "wdth" ${wdth}, "opsz" ${opsz}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTap = () => {
    // Haptic feedback on supported devices
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(35);
    }
    onToggle();
  };

  return (
    <div className="letter-section relative">
      <div className="w-full max-w-[420px] px-6">
        {/* The Letter - Big, elegant, cinematic */}
        <button
          onClick={handleTap}
          className="letter block w-full text-center focus:outline-none"
          aria-expanded={localExpanded}
        >
          {item.letter}
        </button>

        {/* Expanded Glass Card - only when active */}
        <AnimatePresence>
          {localExpanded && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={LIQUID_SPRING}
              className="mt-6"
            >
              <div className="glass expanded relative p-6 text-left">
                {/* Gentle tracing glowing border */}
                <div className="glowing-border" />

                <div className="relative z-10">
                  <p 
                    className="expanded-text text-fluid-lg text-white/90 tracking-[-0.015em] mb-1"
                    dangerouslySetInnerHTML={{ __html: item.phrase }}
                  />

                  {/* Immersive JioSaavn Widget with Vinyl Effect */}
                  <div className="mt-6">
                    <SongWidget
                      song={item.song}
                      artworkUrl={item.artwork}
                      webUrl={item.url}
                      songId={item.songId}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
