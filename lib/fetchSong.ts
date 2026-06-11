export interface SongData {
  artwork: string;
  songTitle: string;
}

export async function fetchSongData(url: string): Promise<SongData> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch song page');

    const html = await res.text();

    // Extract og:image
    const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    let artwork = imageMatch ? imageMatch[1] : 'https://c.saavncdn.com/default.jpg';

    // Prefer higher resolution if available (JioSaavn often has 500x500 variants)
    if (artwork.includes('150x150')) {
      artwork = artwork.replace('150x150', '500x500');
    } else if (artwork.includes('50x50')) {
      artwork = artwork.replace('50x50', '500x500');
    }

    // Extract og:title as fallback song title
    const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    const songTitle = titleMatch ? titleMatch[1].split('|')[0].trim() : 'Song';

    return { artwork, songTitle };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
    // Fallback artwork
    return {
      artwork: 'https://picsum.photos/id/1015/800/800',
      songTitle: 'Song',
    };
  }
}
