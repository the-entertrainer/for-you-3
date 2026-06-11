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

    const isAndroid = /Android/i.test(navigator.userAgent || "");

    // Try multiple native URI schemes for better compatibility
    const attempts = [
      `jiosaavn://song/${songId}`,
      `jiosaavn://song?id=${songId}`,
      isAndroid ? `intent://song/${songId}#Intent;scheme=jiosaavn;package=com.jio.media.jiobeats;end` : null,
    ].filter(Boolean) as string[];

    // Fire the first (most common) native deep link
    window.location.href = attempts[0];

    // Fallback timer (1500ms as requested)
    const FALLBACK_DELAY = 1500;
    const timer = setTimeout(() => {
      if (document.visibilityState === "visible") {
        // Still in browser -> fallback to web URL
        window.open(webUrl, "_blank", "noopener,noreferrer");
        toast.info("Opened web version", {
          description: "Native app did not respond or is not installed",
        });
      }
    }, FALLBACK_DELAY);

    // Listen for visibility change to clear timer if app launches
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(timer);
      }
      document.removeEventListener("visibilitychange", onVisibility);
    };
    document.addEventListener("visibilitychange", onVisibility, { once: true });

    // For some browsers, try secondary scheme after small delay if first fails silently
    if (attempts.length > 1) {
      setTimeout(() => {
        if (document.visibilityState === "visible") {
          window.location.href = attempts[1];
        }
      }, 300);
    }
  }, []);

  return { openSong };
}
