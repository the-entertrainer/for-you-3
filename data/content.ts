export interface NikitaItem {
  letter: string;
  phrase: string;
  song: string;
  url: string;
  // For maximum immersion we use direct high-quality artwork (in production this would be resolved via JioSaavn API)
  artwork: string;
}

export const NIKITA: NikitaItem[] = [
  {
    letter: "N",
    phrase: "N stands for Nainowale Ne. You bring so much music into my life.",
    song: "Nainowale Ne",
    url: "https://www.jiosaavn.com/song/nainowale-ne-from-padmaavat-lyrics/Gl8abjFReF8",
    artwork: "https://c.saavncdn.com/191/Nainowale-Ne-From-Padmaavat--Hindi-2018-20180122-500x500.jpg"
  },
  {
    letter: "I",
    phrase: "I stands for Inkem Inkem. You are my world, my love.",
    song: "Inkem Inkem Inkem Kaavale",
    url: "https://www.jiosaavn.com/song/inkem-inkem-inkem-kaavaale-from-geetha-govindam-/OytZaTVATlI",
    artwork: "https://c.saavncdn.com/124/Inkem-Inkem-Inkem-Kaavaale-From-Geetha-Govindam--Telugu-2018-20180709-500x500.jpg"
  },
  {
    letter: "K",
    phrase: "K stands for Kya Khoob Lagti Ho. You look beautiful in everything you do.",
    song: "Kya Khoob Lagti Ho",
    url: "https://www.jiosaavn.com/song/kya-khoob-lagti-ho/QxgyQExpAUU",
    artwork: "https://c.saavncdn.com/143/Kya-Khoob-Lagti-Ho--Hindi-2018-20180205-500x500.jpg"
  },
  {
    letter: "I",
    phrase: "I stands for Intense. You are so intense when we make love.",
    song: "In My Bed",
    url: "https://www.jiosaavn.com/lyrics/in-my-bed-lyrics/Qxxdchx8W34",
    artwork: "https://c.saavncdn.com/191/Nainowale-Ne-From-Padmaavat--Hindi-2018-20180122-500x500.jpg" // Using similar rich tone for the "In My Bed" intense vibe (real resolver recommended)
  },
  {
    letter: "T",
    phrase: "T stands for Tum Se Hi. Everything starts and ends with you.",
    song: "Tum Se Hi",
    url: "https://www.jiosaavn.com/song/tum-se-hi-from-jab-we-met/Bg84RxFnAXg",
    artwork: "https://c.saavncdn.com/033/Tum-Se-Hi-From-Jab-We-Met--Hindi-2007-500x500.jpg"
  },
  {
    letter: "A",
    phrase: "A stands for Adiye. Adorable and mesmerizing, my favorite rhythm.",
    song: "Adiye (from movie: Bachelor)",
    url: "https://www.jiosaavn.com/song/adiye/FSQGHD5GfAc",
    artwork: "https://c.saavncdn.com/191/Adiye-From-Bachelor--Tamil-2021-20210929-500x500.jpg"
  },
];

// Helper: extract a usable song token/ID from the JioSaavn web URL for deep linking
export function getSongIdFromUrl(url: string): string {
  try {
    const parts = url.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    // Many JioSaavn deep links accept the trailing token (e.g. Gl8abjFReF8)
    return last.replace(/[^A-Za-z0-9]/g, "");
  } catch {
    return "";
  }
}

export const LIQUID_SPRING = {
  type: "spring" as const,
  stiffness: 88,
  damping: 29,
  mass: 1.05,
  restDelta: 0.0005,
  restSpeed: 0.0005,
};
