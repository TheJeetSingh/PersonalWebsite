import { notFound } from "next/navigation";
import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import "../blog.css";
import "./post.css";

export const dynamic = "force-dynamic"; // Always fetch fresh data

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
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

  return (
    <div className="min-h-screen relative">
      <StarryBackground />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
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
        <article className="comic-panel bg-white p-6 sm:p-8">
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
            <h1 className="text-3xl sm:text-4xl font-luckiestGuy text-black uppercase tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 font-dynaPuff text-gray-700 text-lg">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Content - renders HTML from TipTap editor */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
