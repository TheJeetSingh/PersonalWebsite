import StarryBackground from "@/components/StarryBackground";
import "./projects.css";

export default function Projects() {
  return (
    <div className="min-h-screen relative">
      <StarryBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">

        {/* Comic Setting Box 1 */}
        <div className="mb-8">
          <div className="comic-setting-box">
            <p className="font-bouncy text-black font-bold uppercase tracking-wider text-sm sm:text-base">
              On a website far far away...
            </p>
          </div>
        </div>

        {/* Comic Setting Box 2 */}
        <div className="mb-12 flex justify-end">
          <div className="comic-setting-box rotate-2">
            <p className="font-bouncy text-black font-bold uppercase tracking-wider text-sm sm:text-base">
              Jeet set out to make something amazing
            </p>
          </div>
        </div>

        {/* Big Comic Book Style Card */}
        <div className="w-full max-w-[700px] mx-auto">
          <div className="comic-panel aspect-[2/3] bg-white rotate-1 hover:rotate-0 transition-transform duration-300 p-4 sm:p-6 flex flex-col">

            {/* Header Panel */}
            <div className="border-b-4 border-black pb-4 mb-4">
              <h1 className="text-5xl sm:text-6xl font-luckiestGuy text-black drop-shadow-[3px_3px_0_rgba(0,0,0,0.2)] text-center uppercase tracking-wide">
                Speech App
              </h1>
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-12 gap-4">

              {/* Large Image/Visual Panel (Top Left) */}
              <div className="col-span-12 sm:col-span-7 border-4 border-black bg-gray-100 relative min-h-[300px] overflow-hidden group">
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src="/SpeechApp.png"
                    alt="Articulate App Screenshot"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="comic-caption-box absolute top-0 left-0 -rotate-2">
                  <span className="font-bouncy text-xs font-bold uppercase text-black">The Visuals</span>
                </div>
              </div>

              {/* Description Panel (Top Right) */}
              <div className="col-span-12 sm:col-span-5 flex flex-col gap-4">
                <div className="border-4 border-black p-4 bg-yellow-100 flex-1 relative">
                  <p className="font-dynaPuff text-black text-sm leading-relaxed">
                    "Articulate is a web-based speech practice and coaching app that helps users improve their public speaking through structured recording and AI-assisted feedback."
                  </p>
                </div>
                <div className="border-4 border-black p-4 bg-blue-100 flex-1 relative mt-2">
                  <div className="comic-caption-box absolute -top-4 -left-2 rotate-2 z-10">
                    <span className="font-bouncy text-xs font-bold uppercase text-black">The Mission</span>
                  </div>
                  <p className="font-dynaPuff text-black text-sm leading-relaxed mt-2">
                    Speak, record, and get AI analysis on your pacing and clarity. It's a self-guided coaching loop to help you become a more confident speaker!
                  </p>
                </div>
              </div>

              {/* Tech Stack Panel (Middle Strip) */}
              <div className="col-span-12 border-4 border-black p-4 bg-white relative mt-2">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 border-2 border-black px-3 py-1 rotate-1 shadow-[2px_2px_0_#000] z-10">
                  <span className="font-luckiestGuy text-white text-sm uppercase tracking-wide">Powered By</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {["React", "Node.js", "Vercel", "MongoDB", "Tailwind"].map((tech) => (
                    <span key={tech} className="font-bouncy text-black text-sm border-2 border-black px-2 py-1 bg-gray-100 shadow-[2px_2px_0_#000]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Panel */}
              <div className="col-span-12 border-4 border-black bg-black p-4 flex items-center justify-center relative overflow-hidden mt-2">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <a
                  href="https://articulate.ninja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 font-luckiestGuy text-white text-3xl hover:scale-110 transition-transform uppercase tracking-widest drop-shadow-[4px_4px_0_#ff0000]"
                >
                  Launch Project!
                </a>
              </div>

            </div>

            {/* Page Number */}
            <div className="mt-2 text-right">
              <span className="font-bouncy text-black text-xs border-2 border-black rounded-full px-2 py-1 bg-white">
                Page 1
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
