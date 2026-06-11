import { NIKITA, getSongIdFromUrl } from "@/data/content";
import { fetchSongData } from "@/lib/fetchSong";
import { NikitaClient } from "@/components/NikitaClient";

export const dynamic = "force-dynamic";

export default async function ForYou() {
  // Fetch all song metadata in parallel using Server Components
  const songsWithData = await Promise.all(
    NIKITA.map(async (item) => {
      const data = await fetchSongData(item.url);
      return {
        ...item,
        artwork: data.artwork,
        songTitle: data.songTitle,
        songId: getSongIdFromUrl(item.url),
      };
    })
  );

  return (
    <div className="app-container">
      {/* Subtle continuously shifting refractive light background */}
      <div className="shifting-bg" />

      <NikitaClient songs={songsWithData} />
    </div>
  );
}
