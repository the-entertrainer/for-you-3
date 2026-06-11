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

    // Robust custom URI scheme for JioSaavn native deep link
    const isAndroid = /Android/i.test(navigator.userAgent);
    let deepLink: string;

    if (isAndroid) {
      // Android intent for reliable native app launch
      deepLink = `intent://song/${songId}#Intent;scheme=jiosaavn;package=com.jio.media.jiobeats;end`;
    } else {
      // iOS / general jiosaavn:// scheme
      deepLink = `jiosaavn://song/${songId}`;
    }

    // Fire the native deep link first (onClick handler style)
    window.location.href = deepLink;

    // Fallback timer: 1500ms
    const FALLBACK_DELAY = 1500;
    const timer = setTimeout(() => {
      // If still visible, the native app did not take over
      if (document.visibilityState === "visible") {
        window.open(webUrl, "_blank", "noopener,noreferrer");
        toast.info("Opened in browser", {
          description: "JioSaavn app not detected or not installed",
        });
      }
    }, FALLBACK_DELAY);

    // Optional: clear if page hides quickly (app opened)
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(timer);
        document.removeEventListener("visibilitychange", handleVisibility);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility, { once: true });
  }, []);

  return { openSong };
}
