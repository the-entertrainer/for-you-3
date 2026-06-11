export interface NikitaItem {
  letter: string;
  phrase: string;
  song: string;
  url: string;
}

export const NIKITA: NikitaItem[] = [
  {
    letter: "N",
    phrase: "N stands for Naughty. For my naughty little baby, here is a song.",
    song: "Nainowale Ne",
    url: "https://www.jiosaavn.com/s/song/hindi/padmaavat/nainowale-ne/JzE9ASNHBFE",
  },
  {
    letter: "I",
    phrase: "I stands for Irresistible. You are my world, my love.",
    song: "Inkem Inkem Inkem Kaavaale",
    url: "https://www.jiosaavn.com/p/song/search/Geetha-Govindam/Inkem-Inkem-Inkem-Kaavaale/GCEmUCJFe0k",
  },
  {
    letter: "K",
    phrase: "K stands for Khubsoorat. You look beautiful in everything you do.",
    song: "Kya Khoob Lagti Ho",
    url: "https://www.jiosaavn.com/p/song/search/Dharmatma/Kya-Khoob-Lagti-Ho/NQcKSEB7dQI",
  },
  {
    letter: "I",
    phrase: "I stands for Intense. You are so intense when we make love.",
    song: "In My Bed",
    url: "https://www.jiosaavn.com/p/song/search/The-Beauty-of-Becoming/In-My-Bed/GAMJeytKYwQ",
  },
  {
    letter: "T",
    phrase: "T stands for Timeless. Everything starts and ends with you.",
    song: "Tum Se Hi",
    url: "https://www.jiosaavn.com/p/song/search/Jab-We-Met/Tum-Se-Hi/CiE7ejcIZ3g",
  },
  {
    letter: "A",
    phrase: "A stands for Adorable. Just like your smile.",
    song: "Adiye",
    url: "https://www.jiosaavn.com/p/song/search/Bachelor-Original-Motion-Picture-Soundtrack/Adiye/FSQGHD5GfAc",
  },
];

export function getSongIdFromUrl(url: string): string {
  try {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1] || "";
  } catch {
    return "";
  }
}
