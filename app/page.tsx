"use client";

import Link from "next/link";
import RotatingText from "@/components/RotatingText";
import ViewWorkButton from "@/components/ViewWorkButton";
import ComicButton from "@/components/ComicButton";
import StarryBackground from "@/components/StarryBackground";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";

export default function Home() {
  return (
    <div className="relative z-10 min-h-screen">
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

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <ViewWorkButton href="/projects">
                  View My Work
                </ViewWorkButton>
                <ComicButton href="/blog">
                  Read My Blog
                </ComicButton>
              </div>

              {/* Spotify Now Playing */}
              <div className="mt-8">
                <SpotifyNowPlaying />
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}


