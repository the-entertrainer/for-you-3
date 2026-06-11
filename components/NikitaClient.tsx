"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Letter } from "@/components/Letter";
import type { EnhancedNikitaItem } from "@/types";

interface NikitaClientProps {
  songs: EnhancedNikitaItem[];
}

export function NikitaClient({ songs }: NikitaClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // Accordion: close others when opening a new one
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="snap-container h-dvh overflow-y-auto">
      {/* Elegant modern header using reactive variable fonts */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-5 pb-3 flex items-center justify-between text-white/50 text-xs tracking-[4px] font-medium pointer-events-none">
        <div className="label">FOR YOU</div>
        <div className="label">&lt;3</div>
      </div>

      {songs.map((item, index) => (
        <Letter
          key={item.letter}
          item={item}
          index={index}
          isExpanded={activeIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}

      {/* Subtle, non-distracting navigation instructions */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 text-[10px] tracking-[2px] text-white/20 pointer-events-none select-none">
        TAP LETTERS • SWIPE TO SCROLL
      </div>
    </div>
  );
}
