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
      // No deep link possible — go straight to web with nice feedback
      window.open(webUrl, "_blank", "noopener,noreferrer");
      toast.success(`Opening ${songTitle || "song"} on web`);
      return;
    }

    const deepLink = `jiosaavn://song/${songId}`;

    // Attempt native deep link
    const start = Date.now();
    window.location.href = deepLink;

    // Robust fallback: if we are still here after a delay, the app didn't open
    const FALLBACK_DELAY = 2350;
    setTimeout(() => {
      const elapsed = Date.now() - start;
      // Heuristic: if more than the delay passed without navigation away, open web
      if (document.visibilityState === "visible" && elapsed >= FALLBACK_DELAY - 200) {
        window.open(webUrl, "_blank", "noopener,noreferrer");
        toast.info(`Opened in browser — JioSaavn app not detected`, {
          description: songTitle,
          action: {
            label: "Retry native",
            onClick: () => window.location.href = deepLink,
          },
        });
      }
    }, FALLBACK_DELAY);
  }, []);

  return { openSong };
}
