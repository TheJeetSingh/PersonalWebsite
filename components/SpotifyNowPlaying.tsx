"use client";

import { useState, useEffect } from "react";

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        // Add cache-busting timestamp to ensure fresh data
        const res = await fetch(`/api/spotify/now-playing?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          // Update track if we have data, even if paused
          if (data.name && data.artist) {
            setTrack(data);
          } else if (!data.isPlaying && !data.name) {
            // Only clear track if there's truly nothing playing
            setTrack(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch Spotify data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    // Refresh every 5 seconds
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !track) return null;

  return (
    <div className="comic-panel bg-white p-4 max-w-md mx-auto border-4 border-black shadow-[4px_4px_0_#000]">
      <div className="flex items-center gap-3">
        {track.image && (
          <img
            src={track.image}
            alt={track.album}
            className="w-16 h-16 border-2 border-black object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bouncy text-xs text-gray-600 uppercase mb-1">Now Playing</p>
          <p className="font-luckiestGuy text-black text-sm truncate">{track.name}</p>
          <p className="font-dynaPuff text-xs text-gray-700 truncate">by {track.artist}</p>
        </div>
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white font-bouncy text-xs border-2 border-black shadow-[2px_2px_0_#000] transition-all"
        >
          ▶️
        </a>
      </div>
    </div>
  );
}

