import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const LAST_TRACK_KEY = "spotify:last_track";

interface LastTrackPayload {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
  lastActiveAt: string;
}

async function getAccessToken() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return null;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.access_token;
}

async function getLastTrackFromKV(): Promise<LastTrackPayload | null> {
  try {
    const cached = await kv.get<LastTrackPayload>(LAST_TRACK_KEY);
    return cached || null;
  } catch (error) {
    console.error("Failed to read last Spotify track from KV:", error);
    return null;
  }
}

function responseWithTrack(track: LastTrackPayload, isLive: boolean) {
  return NextResponse.json(
    {
      ...track,
      isLive,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    }
  );
}

export async function GET() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    const lastTrack = await getLastTrackFromKV();
    if (lastTrack) {
      // Spotify is not configured, but we still have old data
      return responseWithTrack(lastTrack, false);
    }
    return NextResponse.json({ isPlaying: false, error: "Spotify not configured" });
  }

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      const lastTrack = await getLastTrackFromKV();
      if (lastTrack) {
        return responseWithTrack(lastTrack, false);
      }
      return NextResponse.json({ isPlaying: false });
    }

    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    // No active playback – fall back to last known track if available
    if (response.status === 204 || response.status === 404) {
      const lastTrack = await getLastTrackFromKV();
      if (lastTrack) {
        return responseWithTrack(lastTrack, false);
      }
      return NextResponse.json({ isPlaying: false });
    }

    if (!response.ok) {
      const lastTrack = await getLastTrackFromKV();
      if (lastTrack) {
        return responseWithTrack(lastTrack, false);
      }
      return NextResponse.json({ isPlaying: false });
    }

    const data = await response.json();

    // If Spotify responds but there's no item, also try to fall back
    if (!data.item) {
      const lastTrack = await getLastTrackFromKV();
      if (lastTrack) {
        return responseWithTrack(lastTrack, false);
      }
      return NextResponse.json({ isPlaying: false });
    }

    const nowIso = new Date().toISOString();

    const track: LastTrackPayload = {
      name: data.item.name,
      artist: data.item.artists.map((a: any) => a.name).join(", "),
      album: data.item.album.name,
      image: data.item.album.images[0]?.url || "",
      url: data.item.external_urls.spotify,
      isPlaying: data.is_playing || false,
      // We treat the time we successfully saw this track as the "last active" time
      lastActiveAt: nowIso,
    };

    // Persist the latest track so we can show it later if playback stops
    try {
      await kv.set(LAST_TRACK_KEY, track);
    } catch (error) {
      console.error("Failed to store last Spotify track in KV:", error);
    }

    return responseWithTrack(track, true);
  } catch (error) {
    console.error("Spotify API error:", error);
    const lastTrack = await getLastTrackFromKV();
    if (lastTrack) {
      return responseWithTrack(lastTrack, false);
    }
    return NextResponse.json({ isPlaying: false });
  }
}

