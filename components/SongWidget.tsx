"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useDeepLink } from "@/hooks/useDeepLink";

interface SongWidgetProps {
  song: string;
  artworkUrl: string;
  webUrl: string;
  songId: string;
}

export function SongWidget({ song, artworkUrl, webUrl, songId }: SongWidgetProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { openSong } = useDeepLink();

  const handlePlay = () => {
    setIsPlaying(true);
    // Reset animation after some time
    setTimeout(() => setIsPlaying(false), 4200);

    openSong({
      songId,
      webUrl,
      songTitle: song,
    });
  };

  return (
    <div
      onClick={handlePlay}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 active:scale-[0.985] transition-transform duration-150"
    >
      {/* Blurred pulsing artwork background */}
      <div
        className="pulsing-bg"
        style={{ backgroundImage: `url(${artworkUrl})` }}
      />

      <div className="relative z-10 p-4">
        {/* Animated Spinning Vinyl Record */}
        <div className="vinyl-container mx-auto mb-4 w-[108px]">
          <div
            className={`vinyl ${isPlaying ? "playing" : ""}`}
            style={{ backgroundImage: `url(${artworkUrl})` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="label text-[10px] tracking-[3.5px] text-white/50 uppercase">JIOSAAVN</div>
            <div className="song-title text-xl font-semibold leading-none tracking-[-0.45px] text-white mt-0.5">
              {song}
            </div>
          </div>

          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/90 text-black shadow transition group-active:bg-white">
            <Play className="ml-[2px] h-4 w-4 fill-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
