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
  );
}
