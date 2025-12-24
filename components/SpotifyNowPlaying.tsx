"use client";

import { useState, useEffect } from "react";
import "./SpotifyPlayPause.css";

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
  isLive?: boolean;
  lastActiveAt?: string;
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
            // Only clear track if there's truly nothing playing and no cached data
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

  const isLive = track.isLive !== false; // default to true when field is missing
  const label = isLive ? "Now Playing" : "Last listened to";
  const timestampLabel =
    !isLive && track.lastActiveAt
      ? `Not current data, just last listened to song — stopped listening at ${new Date(
          track.lastActiveAt
        ).toLocaleString()}`
      : null;

  return (
    <div className="comic-panel bg-white p-4 max-w-lg mx-auto border-4 border-black shadow-[4px_4px_0_#000]">
      <div className="flex items-center gap-3">
        {track.image && (
          <img
            src={track.image}
            alt={track.album}
            className="w-16 h-16 border-2 border-black object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bouncy text-xs text-gray-600 uppercase mb-1">{label}</p>
          <p className="font-luckiestGuy text-black text-sm truncate">{track.name}</p>
          <p className="font-dynaPuff text-xs text-gray-700 truncate">by {track.artist}</p>
          {timestampLabel && (
            <p className="font-dynaPuff text-[10px] text-red-600 mt-1">
              {timestampLabel}
            </p>
          )}
        </div>
        {/* Play/Pause indicator - only show when live (active) */}
        {isLive && (
          <div className="relative group" style={{ position: 'relative', left: '-14px' }}>
            {/* Comic book speech bubble tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <div className="relative bg-white border-4 border-black rounded-lg px-5 py-2 shadow-[3px_3px_0_#000] whitespace-nowrap">
                <p className="font-luckiestGuy text-sm text-black text-center leading-tight">
                  Indicates if Jeet has<br />this song paused or playing
                </p>
                {/* Speech bubble tail */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-black"></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"></div>
              </div>
            </div>
            <div className="spotify-play-pause-container">
              <input type="checkbox" checked={track.isPlaying} readOnly />
              <svg className="play" viewBox="0 0 24 24" width="30" height="30">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg className="pause" viewBox="0 0 24 24" width="30" height="30">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </div>
          </div>
        )}
        {/* Spotify button with comic speech bubble tooltip */}
        <div className="relative group">
          {/* Comic book speech bubble tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <div className="relative bg-white border-4 border-black rounded-lg px-3 py-2 shadow-[3px_3px_0_#000] whitespace-nowrap">
              <p className="font-luckiestGuy text-sm text-black text-center leading-tight">
                Click to go to the song<br />Jeet is listening to!
              </p>
              {/* Speech bubble tail */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-black"></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"></div>
            </div>
          </div>
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center p-2 rounded-md drop-shadow-xl bg-[#1ED760] text-white hover:translate-y-3 hover:rounded-full transition-all duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              strokeWidth="0"
              fill="currentColor"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

