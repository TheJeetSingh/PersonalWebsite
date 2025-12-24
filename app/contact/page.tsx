"use client";

import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      <StarryBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0_#000] font-bouncy hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Contact Content */}
        <div className="comic-panel bg-white p-8 sm:p-12 lg:p-16 max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-luckiestGuy text-black uppercase mb-6 drop-shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
              Get In Touch
            </h1>
            <p className="font-dynaPuff text-black text-lg lg:text-xl mb-12">
              Want to collaborate or just say hi? Connect with me on GitHub!
            </p>

            {/* GitHub Button */}
            <div className="flex justify-center items-center">
              <div className="group relative">
                <a
                  href="https://github.com/TheJeetSingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-4 bg-white border-4 border-black shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] transition-all rounded-lg"
                >
                  <svg
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-black hover:scale-125 duration-200 hover:stroke-blue-500 transition-all"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border-4 border-black bg-white py-2 text-sm font-luckiestGuy text-black shadow-[4px_4px_0_#000] transition-all duration-300 ease-in-out group-hover:scale-100">
                  GitHub
                </span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t-4 border-black">
              <p className="font-dynaPuff text-gray-700 text-base">
                Check out my projects and contributions on{" "}
                <a
                  href="https://github.com/TheJeetSingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-bold"
                >
                  GitHub
                </a>
                !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
