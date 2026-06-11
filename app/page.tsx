import { NIKITA } from "@/data/content";
import { NikitaClient } from "@/components/NikitaClient";

export default function ForYou() {
  // Static YouTube-verified data for reliable cross-platform playback
  return (
    <div className="app-container">
      <NikitaClient songs={NIKITA} />
    </div>
  );
}
