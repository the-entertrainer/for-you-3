import { NikitaItem } from "@/data/content";

export interface EnhancedNikitaItem extends NikitaItem {
  artwork: string;
  songTitle: string;
  songId: string;
}
