export interface NikitaItem {
  letter: string;
  phrase: string;
  song: string;
  url: string;
  songId: string;
}

export const NIKITA: NikitaItem[] = [
  {
    letter: "N",
    phrase: "N stands for <em class=\"serif-em\">Naughty</em>. For my <em class=\"serif-em\">naughty little baby</em>, here is a song.",
    song: "Nainowale Ne",
    url: "https://www.jiosaavn.com/s/song/hindi/padmaavat/nainowale-ne/JzE9ASNHBFE",
    songId: "JzE9ASNHBFE",
  },
  {
    letter: "I",
    phrase: "I stands for <em class=\"serif-em\">Irresistible</em>. You are my world, my <em class=\"serif-em\">love</em>.",
    song: "Inkem Inkem Inkem Kaavaale",
    url: "https://www.jiosaavn.com/p/song/search/Geetha-Govindam/Inkem-Inkem-Inkem-Kaavaale/GCEmUCJFe0k",
    songId: "GCEmUCJFe0k",
  },
  {
    letter: "K",
    phrase: "K stands for <em class=\"serif-em\">Khubsoorat</em>. You look <em class=\"serif-em\">beautiful</em> in everything you do.",
    song: "Kya Khoob Lagti Ho",
    url: "https://www.jiosaavn.com/p/song/search/Dharmatma/Kya-Khoob-Lagti-Ho/NQcKSEB7dQI",
    songId: "NQcKSEB7dQI",
  },
  {
    letter: "I",
    phrase: "I stands for <em class=\"serif-em\">Intense</em>. You are so <em class=\"serif-em\">intense</em> when we make love.",
    song: "In My Bed",
    url: "https://www.jiosaavn.com/p/song/search/The-Beauty-of-Becoming/In-My-Bed/GAMJeytKYwQ",
    songId: "GAMJeytKYwQ",
  },
  {
    letter: "T",
    phrase: "T stands for <em class=\"serif-em\">Timeless</em>. Everything starts and ends with <em class=\"serif-em\">you</em>.",
    song: "Tum Se Hi",
    url: "https://www.jiosaavn.com/p/song/search/Jab-We-Met/Tum-Se-Hi/CiE7ejcIZ3g",
    songId: "CiE7ejcIZ3g",
  },
  {
    letter: "A",
    phrase: "A stands for <em class=\"serif-em\">Adorable</em>. Just like your <em class=\"serif-em\">smile</em>.",
    song: "Adiye",
    url: "https://www.jiosaavn.com/p/song/search/Bachelor-Original-Motion-Picture-Soundtrack/Adiye/FSQGHD5GfAc",
    songId: "FSQGHD5GfAc",
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
