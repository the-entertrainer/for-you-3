"use client";

import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

interface SongWidgetProps {
  song: string;
  youtubeUrl: string;
}

export function SongWidget({ song, youtubeUrl }: SongWidgetProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  // Extract video ID for embed
  const videoId = youtubeUrl.split('v=')[1]?.split('&')[0] || '';

  const handlePlay = () => {
    // On mobile, open YouTube app or browser for best experience
    // For in-app play, toggle embed
    if (window.innerWidth < 768) {
      window.open(youtubeUrl, '_blank');
    } else {
      setShowPlayer(!showPlayer);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Glassy panel with glow */}
      <div className="relative p-4">
        {/* Thumbnail with 3D glassy overlay */}
        <div 
          onClick={handlePlay}
          className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl cursor-pointer border border-white/10 group-hover:border-white/20 transition-all"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'perspective(1000px) rotateX(2deg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur transition-all group-active:scale-95">
              <Play className="h-6 w-6 text-black ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] bg-black/70 rounded text-white/80">YT</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="label text-[10px] tracking-[3.5px] text-white/60 uppercase mb-1">NOW PLAYING</div>
            <div className="song-title text-xl font-semibold leading-tight tracking-[-0.4px] text-white truncate">
              {song}
            </div>
          </div>

          <button
            onClick={handlePlay}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-all hover:bg-white active:scale-95"
            title="Play on YouTube"
          >
            <ExternalLink className="h-5 w-5" />
          </button>
        </div>

        {/* Embedded YouTube player for desktop / impressive in-app experience */}
        {showPlayer && videoId && (
          <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={song}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            />
          </div>
        )}

        <div className="mt-2 text-[9px] text-center text-white/40">
          Tap to play on YouTube • Smooth mobile experience
        </div>
      </div>
    </div>
  );
}
