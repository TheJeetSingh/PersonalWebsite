import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import { getPublishedPosts } from "@/lib/blog";
import "./blog.css";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Blog() {
  const blogPosts = await getPublishedPosts();

  return (
    <div className="min-h-screen relative">
      <StarryBackground />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Comic Setting Box */}
        <div className="mb-12 flex justify-end">
          <div className="comic-setting-box rotate-2">
            <p className="font-bouncy text-black font-bold uppercase tracking-wider text-sm sm:text-base">
              Jeet shares his thoughts & adventures
            </p>
          </div>
        </div>

        {/* Blog Posts - Comic Book Covers Grid */}
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const rotationClass = index % 2 === 0 ? "rotate-1" : "-rotate-1";
              const categoryColors: { [key: string]: string } = {
                Tutorial: "bg-yellow-100",
                Development: "bg-blue-100",
                Personal: "bg-pink-100",
                General: "bg-gray-100",
                Project: "bg-green-100",
              };

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article
                    className={`comic-cover bg-white ${rotationClass} group-hover:rotate-0 transition-transform duration-300 overflow-hidden`}
                  >
                    {/* Image Placeholder Area */}
                    <div className="comic-cover-image bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border-b-4 border-black relative">
                      {/* Placeholder pattern or icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="text-8xl">📖</div>
                      </div>
                      {/* Category Badge - Top Right */}
                      <div className="absolute top-2 right-2">
                        <span className={`comic-badge px-3 py-1 ${categoryColors[post.category] || "bg-gray-100"} font-bouncy text-black text-xs font-bold uppercase`}>
                          {post.category}
                        </span>
                      </div>
                      {/* Issue Number - Top Left */}
                      <div className="absolute top-2 left-2">
                        <span className="comic-badge px-3 py-1 bg-red-500 font-luckiestGuy text-white text-xs font-bold">
                          #{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Title Section - Bottom */}
                    <div className="p-4 bg-white border-t-4 border-black">
                      <h2 className="text-xl sm:text-2xl font-luckiestGuy text-black uppercase tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)] text-center leading-tight mb-2">
                        {post.title}
                      </h2>
                      {/* Metadata */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-dynaPuff text-black opacity-70">
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="font-dynaPuff text-black opacity-70">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-8">
            <div className="comic-panel bg-white p-8 text-center max-w-md mx-auto">
              <p className="font-dynaPuff text-black text-xl">
                No blog posts yet. Once Jeet starts writing, epic stories will appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
