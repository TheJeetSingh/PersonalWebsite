import StarryBackground from "@/components/StarryBackground";
import "./projects.css";
import ProjectCard, { Project } from "@/components/ProjectCard";

const projects: Project[] = [
  {
    title: "Speech App",
    description: "Articulate is a web-based speech practice and coaching app that helps users improve their public speaking through structured recording and AI-assisted feedback.",
    mission: "Speak, record, and get AI analysis on your pacing and clarity. It's a self-guided coaching loop to help you become a more confident speaker!",
    techStack: ["React", "Node.js", "Vercel", "MongoDB", "Tailwind"],
    link: "https://articulate.ninja",
    hasGallery: true,
    galleryLink: "/projects/speech-app/gallery"
  },
  {
    title: "Cropter",
    description: "AI-powered agricultural monitoring platform combining drone imaging with computer vision to analyze crop health at scale.",
    mission: "Helping farmers optimize yield by automating drone analysis and surfacing AI-powered field health insights.",
    techStack: ["React", "TypeScript", "Python", "Flask", "YOLOv8"],
    link: "https://github.com/TheJeetSingh/Cropter",
    hasGallery: true,
    galleryLink: "#"
  },
  {
    title: "The Social Network",
    description: "A highly exclusive, full-stack social media application designed for curated social interactions and secure engagement.",
    mission: "Delivering a premium, invite-only social experience with secure authentication and real-time connections.",
    techStack: ["React", "Node.js", "Vercel", "Serverless"],
    link: "https://thesecretsocialnetwork.vercel.app/",
    hasGallery: true,
    galleryLink: "#"
  },
  {
    title: "Fun MCP",
    description: "A microservice that delivers jokes, quotes, facts, and advice on demand to make apps more engaging.",
    mission: "Injecting fun and motivation into digital experiences by serving bite-sized, humorous content via a simple API.",
    techStack: ["JavaScript", "Node.js", "MCP"],
    link: "https://www.npmjs.com/package/fun-mcp-server",
    hasGallery: true,
    galleryLink: "/projects/fun-mcp/gallery"
  },
  {
    title: "Knight Adventure",
    description: "A browser-based adventure game where players control a knight to navigate levels and battle enemies.",
    mission: "Providing a fun, accessible gaming experience directly in the browser with no installation required.",
    techStack: ["TypeScript", "HTML5 Canvas", "Vercel"],
    link: "https://knight-adventure-plum.vercel.app/",
    hasGallery: true,
    galleryLink: "#"
  },
  {
    title: "Chat With Friends",
    description: "Real-time chat application for direct messages and group conversations with instant delivery.",
    mission: "Connecting friends instantly with secure, real-time messaging and live presence indicators.",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Pusher", "Tailwind"],
    link: "https://chat-with-friends-bay.vercel.app/",
    hasGallery: true,
    galleryLink: "#"
  },
  {
    title: "Spotify AI DJ",
    description: "AI-powered DJ that creates personalized playlists and custom album art based on your mood and listening history.",
    mission: "Automating music discovery by combining Spotify's data with Google Gemini to curate the perfect mix for any vibe.",
    techStack: ["Next.js", "TypeScript", "Spotify API", "Gemini", "Stable Diffusion"],
    link: "https://spotify-ai-dj-rho.vercel.app/",
    hasGallery: true,
    galleryLink: "#"
  }
];

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

        {/* Projects List */}
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </div>
  );
}

