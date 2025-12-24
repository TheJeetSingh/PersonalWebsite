/* COMMENTED OUT - Spotify Setup Helper
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SpotifySetup() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [code, setCode] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const generateAuthLink = () => {
    if (!clientId) {
      setError("Please enter your Client ID");
      return;
    }
    const redirectUri = typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://127.0.0.1:3000/api/spotify/callback"
      : "https://jeet-rocks.vercel.app/api/spotify/callback";
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user-read-currently-playing`;
    
    window.open(authUrl, "_blank");
  };

  const exchangeCode = async () => {
    if (!code || !clientId || !clientSecret) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const redirectUri = typeof window !== "undefined" && window.location.hostname === "localhost"
        ? "http://127.0.0.1:3000/api/spotify/callback"
        : "https://jeet-rocks.vercel.app/api/spotify/callback";

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const data = await response.json();
      setRefreshToken(data.refresh_token);
    } catch (err: any) {
      setError(err.message || "Failed to exchange code for token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="comic-panel bg-white p-8 border-4 border-black shadow-[8px_8px_0_#000]">
          <h1 className="text-4xl font-luckiestGuy text-black mb-6">
            Spotify Setup Helper
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block font-dynaPuff font-bold text-black mb-2">
                Client ID
              </label>
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded font-dynaPuff"
                placeholder="Enter your Spotify Client ID"
              />
            </div>

            <div>
              <label className="block font-dynaPuff font-bold text-black mb-2">
                Client Secret
              </label>
              <input
                type="password"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded font-dynaPuff"
                placeholder="Enter your Spotify Client Secret"
              />
            </div>

            <button
              onClick={generateAuthLink}
              className="w-full px-6 py-3 bg-green-500 text-black font-luckiestGuy font-bold text-xl border-4 border-black shadow-[5px_5px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#000] transition-all"
            >
              Step 1: Get Authorization Code
            </button>

            <div>
              <label className="block font-dynaPuff font-bold text-black mb-2">
                Authorization Code (from redirect URL)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded font-dynaPuff"
                placeholder="Paste the code from the redirect URL here"
              />
            </div>

            <button
              onClick={exchangeCode}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-500 text-black font-luckiestGuy font-bold text-xl border-4 border-black shadow-[5px_5px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#000] transition-all disabled:opacity-50"
            >
              {loading ? "Exchanging..." : "Step 2: Get Refresh Token"}
            </button>

            {refreshToken && (
              <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded">
                <label className="block font-dynaPuff font-bold text-black mb-2">
                  Your Refresh Token (copy this to .env.local):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={refreshToken}
                    readOnly
                    className="flex-1 px-4 py-2 border-2 border-black rounded font-dynaPuff bg-white"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(refreshToken);
                      alert("Copied to clipboard!");
                    }}
                    className="px-4 py-2 bg-blue-500 text-white font-bold border-2 border-black rounded"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Add this to your .env.local as: SPOTIFY_REFRESH_TOKEN={refreshToken}
                </p>
              </div>
            )}

            <button
              onClick={() => router.push("/admin")}
              className="w-full px-6 py-3 bg-gray-500 text-white font-luckiestGuy font-bold text-lg border-4 border-black shadow-[5px_5px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#000] transition-all"
            >
              Back to Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

// Temporarily disabled
export default function SpotifySetup() {
  return null;
}
