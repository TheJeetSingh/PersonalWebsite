"use client";

import { useState } from "react";
import HackerIntro from "@/components/HackerIntro";

export default function TestIntro() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    console.log("Intro completed!");
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Intro Test Page</h1>
      <p className="mb-4">This page always shows the intro for testing.</p>
      <button
        onClick={() => {
          setShowIntro(true);
          // Clear session storage
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem("hasSeenIntro");
          }
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Reset & Show Intro Again
      </button>

      {showIntro && <HackerIntro onComplete={handleIntroComplete} />}

      {!showIntro && (
        <div className="mt-8 p-4 bg-green-100 rounded">
          <p>Intro has completed! Click the button above to see it again.</p>
        </div>
      )}
    </div>
  );
}

