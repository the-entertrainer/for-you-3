"use client";

import { useState } from "react";
import { Letter } from "@/components/Letter";
import { Particles } from "@/components/Particles";
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
    <div className="relative min-h-dvh overflow-hidden bg-[#050505]">
      <Particles />

      {/* Sleek fixed header with glassy effect */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 text-[10px] tracking-[4px] text-white/40 backdrop-blur-xl bg-black/10 border-b border-white/10">
        <div>FOR YOU</div>
        <div className="text-lg tracking-[-1px] text-white/60">&lt;3</div>
        <div>NIKIT A</div>
      </div>

      <div className="snap-container h-dvh overflow-y-auto pt-16">
        {songs.map((item, index) => (
          <Letter
            key={item.letter}
            item={item}
            index={index}
            isExpanded={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* Elegant, non-distracting navigation hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur text-[9px] tracking-[2.5px] text-white/25 border border-white/10 pointer-events-none select-none">
        TAP TO REVEAL  •  SWIPE TO EXPLORE
      </div>
    </div>
  );
}
