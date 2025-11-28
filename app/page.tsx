"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HackerIntro from "@/components/HackerIntro";
import RotatingText from "@/components/RotatingText";
import ViewWorkButton from "@/components/ViewWorkButton";
import ComicButton from "@/components/ComicButton";
import StarryBackground from "@/components/StarryBackground";

export default function Home() {
  // State to control the visibility of the intro animation
  // Default to true so it shows by default until we check localStorage
  const [showIntro, setShowIntro] = useState(true);
  // State to track if the user has seen the intro (used for main content transition)
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if user has seen intro recently in this session
    // Only check after component mounts to avoid hydration issues (window is not defined on server)
    if (typeof window !== 'undefined') {
      const lastIntroTime = localStorage.getItem("lastIntroTime");
      const currentTime = Date.now();
      const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

      if (lastIntroTime) {
        const timeSinceLastIntro = currentTime - parseInt(lastIntroTime, 10);

        // If less than 10 minutes have passed since the last intro, skip it
        if (timeSinceLastIntro < tenMinutes) {
          setShowIntro(false);
          setHasSeenIntro(true);
        }
        // Otherwise, showIntro remains true (default) and animation plays
      }
      // If no lastIntroTime exists, showIntro remains true (default) and animation plays
    }
  }, []);

  // Callback function when the intro animation is complete
  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    // Save the current timestamp to localStorage so we don't show it again for 10 minutes
    localStorage.setItem("lastIntroTime", Date.now().toString());
  };

  return (
    <>
      {/* Show the Hacker Intro animation if showIntro is true */}
      {showIntro && <HackerIntro onComplete={handleIntroComplete} />}

      {/* Main Content Area */}
      {/* If intro is showing, hide main content with opacity-0. When intro finishes, fade in with opacity-100 */}
      <div className={`relative z-10 min-h-screen ${showIntro ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}>
        <StarryBackground />

        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl font-barrio text-white mb-6 flex flex-wrap items-center justify-center gap-2">
                Hi, I&apos;m <span className="text-sky-400">Jeet</span> a{' '}
                <RotatingText
                  texts={['Full Stack Developer', 'Creative Technologist', 'Software Engineer', 'Digital Innovator', 'Tech Enthusiast', 'Code Artisan', 'Problem Solver', 'Highschool Student']}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-indigo-500 text-white overflow-hidden py-1.5 sm:py-2 md:py-3 justify-center rounded-lg font-schoolbell inline-flex items-center"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={4000}
                />
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <ViewWorkButton href="/projects">
                  View My Work
                </ViewWorkButton>
                <ComicButton href="/blog">
                  Read My Blog
                </ComicButton>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}


