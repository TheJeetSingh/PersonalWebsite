"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Login failed");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("Admin login error", err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-lg w-full mx-4">
        <div className="comic-panel bg-white p-10">
          <h1 className="text-4xl font-luckiestGuy font-bold text-black text-center mb-6">
            Admin Lock
          </h1>
          <p className="font-dynaPuff font-bold text-black text-center mb-8 text-lg">
            This control room is for Jeet only. Enter the secret phrase to
            access the blog controls.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-bold text-black mb-3 font-dynaPuff"
              >
                Secret Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border-4 border-black rounded-lg font-dynaPuff font-bold text-black text-lg"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-4 border-4 border-red-500 bg-red-100 font-dynaPuff font-bold text-black text-base">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-black text-white font-luckiestGuy font-bold text-xl rounded-lg hover:scale-105 transition-transform disabled:opacity-60"
            >
              {isSubmitting ? "Checking..." : "Unlock Admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


