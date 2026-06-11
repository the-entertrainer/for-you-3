"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, ExternalLink } from "lucide-react";
import { useDeepLink } from "@/hooks/useDeepLink";

interface SongWidgetProps {
  song: string;
  artworkUrl: string;
  webUrl: string;
  songId: string;
}

export function SongWidget({ song, artworkUrl, webUrl, songId }: SongWidgetProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebPlaying, setIsWebPlaying] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [loadingStream, setLoadingStream] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { openSong } = useDeepLink();

  // Native app deep link (improved multi-attempt)
  const handleNativePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 4200);

    openSong({
      songId,
      webUrl,
      songTitle: song,
    });
  };

  // Direct browser playback using unofficial JioSaavn API proxy
  // This allows the song to play directly in the web widget
  const handleWebPlay = async () => {
    if (isWebPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsWebPlaying(false);
      return;
    }

    if (!streamUrl) {
      setLoadingStream(true);
      try {
        const res = await fetch(`/api/song/${songId}`);
        const data = await res.json();

        if (data.success && data.streamUrl) {
          setStreamUrl(data.streamUrl);
          // Create and play audio
          const audio = new Audio(data.streamUrl);
          audioRef.current = audio;

          audio.addEventListener('ended', () => setIsWebPlaying(false));
          audio.addEventListener('play', () => setIsWebPlaying(true));
          audio.addEventListener('pause', () => setIsWebPlaying(false));

          await audio.play();
        } else {
          // Graceful fallback to web page if stream not available
          window.open(webUrl, '_blank');
        }
      } catch (e) {
        console.error('Web play error:', e);
        window.open(webUrl, '_blank');
      } finally {
        setLoadingStream(false);
      }
    } else if (audioRef.current) {
      await audioRef.current.play();
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 transition-transform duration-150 active:scale-[0.985]">
      {/* Blurred pulsing artwork background */}
      <div
        className="pulsing-bg"
        style={{ backgroundImage: `url(${artworkUrl})` }}
      />

      <div className="relative z-10 p-4">
        {/* Animated Spinning Vinyl Record - now also controls web play */}
        <div 
          onClick={handleWebPlay}
          className="vinyl-container mx-auto mb-4 w-[108px] cursor-pointer"
          title={streamUrl ? "Click to play/pause in browser" : "Click to load & play directly in browser"}
        >
          <div
            className={`vinyl ${isWebPlaying ? "playing" : ""}`}
            style={{ backgroundImage: `url(${artworkUrl})` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="label text-[10px] tracking-[3.5px] text-white/50 uppercase">JIOSAAVN</div>
            <div className="song-title text-xl font-semibold leading-none tracking-[-0.45px] text-white mt-0.5 truncate">
              {song}
            </div>
          </div>

          {/* Native app button (deep link) */}
          <button
            onClick={handleNativePlay}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/90 text-black shadow transition hover:bg-white active:bg-white/80"
            title="Open in JioSaavn app (native deep link)"
          >
            <ExternalLink className="h-4 w-4" />
          </button>

          {/* Web direct play button */}
          <button
            onClick={handleWebPlay}
            disabled={loadingStream}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#c0a3ff]/90 text-black shadow transition hover:bg-[#c0a3ff] active:bg-[#c0a3ff]/80 disabled:opacity-50"
            title={isWebPlaying ? "Pause browser playback" : "Play directly in this browser (unofficial stream)"}
          >
            {loadingStream ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            ) : isWebPlaying ? (
              <Pause className="h-4 w-4 fill-black" />
            ) : (
              <Play className="ml-[2px] h-4 w-4 fill-black" />
            )}
          </button>
        </div>

        {/* Small note for user */}
        <div className="mt-2 text-center text-[9px] text-white/40">
          Tap vinyl for browser play • App icon for native
        </div>
      </div>
    </div>
  );
}
