"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface EmbedProps {
  url: string;
  type?: string;
}

export default function Embed({ url, type }: EmbedProps) {
  // Auto-detect type from URL if not provided
  const detectType = (url: string): string => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("codepen.io")) return "codepen";
    if (url.includes("codesandbox.io")) return "codesandbox";
    if (url.includes("github.com") && url.includes("/blob/")) return "github";
    if (url.includes("spotify.com")) return "spotify";
    if (url.includes("soundcloud.com")) return "soundcloud";
    if (url.includes("vimeo.com")) return "vimeo";
    if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
    return "iframe";
  };

  const embedType = type || detectType(url);

  // Extract CodePen ID from URL
  const getCodePenId = (url: string) => {
    const match = url.match(/codepen\.io\/([^/]+)\/pen\/([^/?]+)/);
    if (match) {
      return {
        user: match[1],
        pen: match[2],
      };
    }
    return null;
  };

  // Extract GitHub gist ID
  const getGistId = (url: string) => {
    const match = url.match(/gist\.github\.com\/([^/]+)\/([^/?]+)/);
    if (match) {
      return match[2];
    }
    return null;
  };

  if (embedType === "youtube" || embedType === "vimeo" || embedType === "soundcloud") {
    return (
      <div className="my-6 border-4 border-black bg-black p-2">
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            controls
          />
        </div>
      </div>
    );
  }

  if (embedType === "codepen") {
    const penData = getCodePenId(url);
    if (penData) {
      return (
        <div className="my-6 border-4 border-black bg-white p-4">
          <p
            className="codepen"
            data-height="400"
            data-theme-id="dark"
            data-default-tab="result"
            data-slug-hash={penData.pen}
            data-user={penData.user}
            style={{ height: "400px", boxSizing: "border-box" }}
          >
            <span>
              See the Pen{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                {penData.pen}
              </a>{" "}
              by {penData.user} on{" "}
              <a href="https://codepen.io" target="_blank" rel="noopener noreferrer">
                CodePen
              </a>
              .
            </span>
          </p>
        </div>
      );
    }
  }

  if (embedType === "spotify") {
    // Convert Spotify URL to embed format
    const spotifyId = url.match(/spotify\.com\/([^/]+)\/([^/?]+)/);
    if (spotifyId) {
      const type = spotifyId[1]; // track, album, playlist, etc.
      const id = spotifyId[2];
      return (
        <div className="my-6 border-4 border-black bg-black p-4">
          <iframe
            src={`https://open.spotify.com/embed/${type}/${id}`}
            width="100%"
            height={type === "track" ? "152" : "352"}
            frameBorder="0"
            allow="encrypted-media"
            className="border-2 border-black"
          />
        </div>
      );
    }
  }

  // Generic iframe embed
  return (
    <div className="my-6 border-4 border-black bg-white p-4">
      <iframe
        src={url}
        className="w-full border-2 border-black"
        style={{ minHeight: "400px" }}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

