"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LIQUID_SPRING } from "@/data/content";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  expanded?: boolean;
}

export function GlassCard({ children, className = "", expanded }: GlassCardProps) {
  return (
    <motion.div
      layout
      transition={LIQUID_SPRING}
      className={`glass glass-card relative flex flex-col ${className}`}
      style={{
        // Extra liquid depth when expanded
        boxShadow: expanded 
          ? "0 20px 60px -15px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.1)" 
          : undefined,
      }}
    >
      {children}
      <div className="glass-edge" />
    </motion.div>
  );
}
