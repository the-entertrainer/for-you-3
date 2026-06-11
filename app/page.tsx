"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NIKITA, LIQUID_SPRING, getSongIdFromUrl } from "@/data/content";
import { GlassCard } from "@/components/GlassCard";
import { SongWidget } from "@/components/SongWidget";
import { LiquidBackground } from "@/components/LiquidBackground";

export default function ForYou() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  const close = () => setActiveIndex(null);

  return (
    <div className="app-container relative flex flex-col bg-[#050505] text-white">
      <LiquidBackground />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Subtle liquid header */}
        <div className="flex h-16 items-center justify-between px-6 pt-3 text-[11px] font-mono tracking-[4px] text-white/50">
          <div>FOR YOU</div>
          <div className="text-[10px]">NIKIT A</div>
          <div>&lt;3</div>
        </div>

        {/* Main vertical stack — forced 100dvh / 100vw mobile native */}
        <div className="flex flex-1 flex-col justify-center px-6 pb-8">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="mb-8 text-center">
              <div className="font-mono text-[10px] tracking-[6px] text-white/40">A LOVE LETTER IN SIX MOVEMENTS</div>
              <h1 className="mt-1 text-6xl font-semibold tracking-[-3.2px]">For You <span className="text-[#a5b4fc]">&lt;3</span></h1>
            </div>

            {/* N-I-K-I-T-A vertical stack */}
            <div className="flex flex-col gap-1.5">
              {NIKITA.map((item, index) => {
                const isActive = activeIndex === index;
                const songId = getSongIdFromUrl(item.url);

                return (
                  <div key={item.letter} className="relative">
                    {/* Letter row */}
                    <button
                      onClick={() => toggle(index)}
                      className="group flex w-full items-center gap-4 rounded-2xl px-1 py-1 text-left active:opacity-90"
                    >
                      <div
                        className="letter flex h-[92px] w-[92px] flex-none items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-serif text-[72px] leading-none text-white/90 shadow-inner backdrop-blur-xl transition-all group-active:scale-[0.96]"
                        style={{
                          fontFeatureSettings: '"tnum"',
                        }}
                      >
                        {item.letter}
                      </div>

                      <div className="min-w-0 flex-1 pr-2">
                        <div className="font-mono text-[10px] tracking-[3px] text-white/40">
                          {item.song.split(" ")[0].toUpperCase()}
                        </div>
                        <div className="mt-0.5 line-clamp-2 text-[15px] leading-tight text-white/80">
                          {item.phrase.split(".")[0]}.
                        </div>
                      </div>

                      <div className="text-xs text-white/30 transition group-hover:text-white/70">TAP</div>
                    </button>

                    {/* Expanded glassmorphic card */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key="card"
                          initial={{ opacity: 0, height: 0, y: -8 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -12 }}
                          transition={LIQUID_SPRING}
                          className="mt-1.5 overflow-hidden pl-[104px] pr-1"
                        >
                          <GlassCard expanded className="p-5">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-mono text-xs tracking-[2px] text-[#a5b4fc]">{item.letter}</div>
                                <div className="mt-1 text-xl font-semibold leading-tight tracking-[-0.4px]">
                                  {item.phrase}
                                </div>
                              </div>

                              <button
                                onClick={close}
                                className="rounded-full p-1 text-white/40 hover:text-white/90 active:bg-white/10"
                                aria-label="Close"
                              >
                                <X size={18} />
                              </button>
                            </div>

                            {/* Immersive song widget with real refractive shader */}
                            <div className="mt-5">
                              <SongWidget
                                song={item.song}
                                artworkUrl={item.artwork}
                                webUrl={item.url}
                                songId={songId}
                                phrase={item.phrase.split(".")[0]}
                              />
                            </div>

                            <div className="mt-4 text-[10px] text-white/40">
                              Tap the artwork to open in JioSaavn. Falls back gracefully to web.
                            </div>
                          </GlassCard>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center text-[10px] text-white/30">
              60fps liquid glass • tuned springs • refractive shaders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
