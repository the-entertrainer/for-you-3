import { NextRequest, NextResponse } from 'next/server';

// Unofficial JioSaavn API proxy for direct playback in browser
// This allows playing the song directly in the web widget without relying on native app
// Note: Uses community-maintained unofficial endpoints (common in open source JioSaavn players)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ songId: string }> }
) {
  const { songId } = await params;

  if (!songId) {
    return NextResponse.json({ error: 'Song ID required' }, { status: 400 });
  }

  try {
    // Try a popular unofficial API endpoint for song details + stream
    // Many projects use variants of saavn.sumit.co or similar proxies
    const apiUrl = `https://saavn.sumit.co/song/${songId}`;

    const res = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ForYouApp/1.0)',
      },
    });

    if (!res.ok) {
      // Fallback to another known pattern if primary fails
      const fallbackUrl = `https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_format=json&_marker=0&song_id=${songId}&api_version=4`;
      const fallbackRes = await fetch(fallbackUrl);
      const fallbackData = await fallbackRes.json();

      // Extract a playable URL if available (structure varies)
      const mediaUrl = fallbackData?.songs?.[0]?.media_url || fallbackData?.media_url;
      if (mediaUrl) {
        return NextResponse.json({ 
          success: true, 
          streamUrl: mediaUrl,
          source: 'jiosaavn-api-fallback'
        });
      }
      throw new Error('No stream found');
    }

    const data = await res.json();

    // The structure from saavn.sumit.co and similar usually has downloadUrl or url
    const streamUrl = data?.downloadUrl?.[0]?.url || 
                      data?.url || 
                      data?.media_url ||
                      data?.songs?.[0]?.media_url;

    if (!streamUrl) {
      throw new Error('No playable URL in response');
    }

    return NextResponse.json({ 
      success: true, 
      streamUrl,
      source: 'unofficial-api',
      songTitle: data?.song || data?.title 
    });
  } catch (error) {
    console.error('Song stream fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Unable to fetch direct stream. Falling back to web link.',
      fallbackUrl: `https://www.jiosaavn.com/song/${songId}` 
    }, { status: 200 }); // Return 200 so client can handle gracefully
  }
}
