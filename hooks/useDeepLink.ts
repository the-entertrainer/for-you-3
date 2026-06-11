"use client";

import { useCallback } from "react";
import { toast } from "sonner";

interface OpenSongOptions {
  songId?: string;
  webUrl: string;
  songTitle?: string;
}

export function useDeepLink() {
  const openSong = useCallback(({ songId, webUrl, songTitle }: OpenSongOptions) => {
    if (!songId) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
      toast.success(`Opening ${songTitle || "song"} on web`);
      return;
    }

    const deepLink = `jiosaavn://song/${songId}`;

    const start = Date.now();
    window.location.href = deepLink;

    const FALLBACK_DELAY = 2400;
    setTimeout(() => {
      const elapsed = Date.now() - start;
      if (document.visibilityState === "visible" && elapsed >= FALLBACK_DELAY - 150) {
        window.open(webUrl, "_blank", "noopener,noreferrer");
        toast.info("Opened in browser", {
          description: "JioSaavn app not detected",
        });
      }
    }, FALLBACK_DELAY);
  }, []);

  return { openSong };
}
