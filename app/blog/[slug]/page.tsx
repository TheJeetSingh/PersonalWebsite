import { notFound } from "next/navigation";
import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import { getPostBySlug } from "@/lib/blog";
import "../blog.css";
import "./post.css";

// Force dynamic rendering with no caching
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Generate a very subtle random tilt (0.5-1 degree) based on slug
function getRandomTilt(slug: string): number {
  // Simple hash function to get consistent random for same slug
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash = hash & hash;
  }
  // Generate value between 0.5-1 degree
  const baseTilt = 0.5 + (Math.abs(hash) % 6) * 0.1; // 0.5 to 1.0
  // Randomly positive or negative
  const sign = hash % 2 === 0 ? 1 : -1;
  return baseTilt * sign;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categoryColors: { [key: string]: string } = {
    Tutorial: "bg-yellow-100",
    Development: "bg-blue-100",
    Personal: "bg-pink-100",
    General: "bg-gray-100",
    Project: "bg-green-100",
  };

  const tiltDegrees = getRandomTilt(slug);

  return (
    <div className="min-h-screen relative">
      <StarryBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0_#000] font-bouncy hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] transition-all"
          >
            ← Back to Blog
          </Link>
        </div>

        {/* Post Content */}
        <article
          className="comic-panel bg-white p-6 sm:p-10 lg:p-12"
          style={{ transform: `rotate(${tiltDegrees}deg)` }}
        >
          {/* Header */}
          <div className="border-b-4 border-black pb-6 mb-6">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className={`comic-badge px-3 py-1 ${categoryColors[post.category] || "bg-gray-100"} font-bouncy text-black text-xs font-bold uppercase`}
              >
                {post.category}
              </span>
              <span className="font-dynaPuff text-black text-sm">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="font-dynaPuff text-black text-sm">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-luckiestGuy text-black uppercase tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 font-dynaPuff text-gray-700 text-lg lg:text-xl">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Content - renders HTML from TipTap editor */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Attachments Section */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="mt-12 pt-8 border-t-4 border-black">
              <h2 className="text-2xl font-luckiestGuy text-black uppercase mb-4">
                Attachments
              </h2>
              <div className="space-y-3">
                {post.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-3 p-4 bg-gray-50 border-4 border-black hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">
                      {attachment.type.startsWith("image/") ? "🖼️" : "📎"}
                    </span>
                    <div className="flex-1">
                      <a
                        href={attachment.url}
                        download={attachment.name}
                        className="font-dynaPuff text-black hover:underline font-bold"
                      >
                        {attachment.name}
                      </a>
                      <p className="font-dynaPuff text-sm text-gray-600">
                        {(attachment.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <a
                      href={attachment.url}
                      download={attachment.name}
                      className="px-4 py-2 bg-blue-200 hover:bg-blue-300 font-bouncy font-bold text-black text-sm border-2 border-black shadow-[2px_2px_0_#000]"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
