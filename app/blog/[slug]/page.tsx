import { notFound } from "next/navigation";
import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import "../blog.css";

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

  // Simple markdown-ish rendering (basic support)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];

    lines.forEach((line, i) => {
      // Code block start/end
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${i}`}
              className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm my-4 border-4 border-black"
            >
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      // Headings
      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={i}
            className="text-xl font-luckiestGuy mt-6 mb-2 text-black"
          >
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-2xl font-luckiestGuy mt-8 mb-3 text-black"
          >
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={i}
            className="text-3xl font-luckiestGuy mt-8 mb-4 text-black"
          >
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        // List items
        elements.push(
          <li key={i} className="font-dynaPuff text-black ml-6 list-disc">
            {formatInline(line.substring(2))}
          </li>
        );
      } else if (line.startsWith("> ")) {
        // Blockquote
        elements.push(
          <blockquote
            key={i}
            className="border-l-4 border-black bg-yellow-50 pl-4 py-2 my-4 font-dynaPuff italic"
          >
            {formatInline(line.substring(2))}
          </blockquote>
        );
      } else if (line.trim() === "") {
        elements.push(<br key={i} />);
      } else {
        // Regular paragraph
        elements.push(
          <p key={i} className="font-dynaPuff text-black leading-relaxed mb-4">
            {formatInline(line)}
          </p>
        );
      }
    });

    return elements;
  };

  // Handle inline formatting (bold, italic, code, links)
  const formatInline = (text: string): React.ReactNode => {
    // Very basic: handle **bold**, *italic*, `code`, [text](url)
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Italic
      const italicMatch = remaining.match(/\*(.+?)\*/);
      // Code
      const codeMatch = remaining.match(/`(.+?)`/);
      // Link
      const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

      // Find earliest match
      const matches = [
        { type: "bold", match: boldMatch, index: boldMatch?.index ?? Infinity },
        {
          type: "italic",
          match: italicMatch,
          index: italicMatch?.index ?? Infinity,
        },
        { type: "code", match: codeMatch, index: codeMatch?.index ?? Infinity },
        { type: "link", match: linkMatch, index: linkMatch?.index ?? Infinity },
      ].sort((a, b) => a.index - b.index);

      const first = matches[0];

      if (first.match && first.index !== Infinity) {
        // Add text before match
        if (first.index > 0) {
          parts.push(remaining.substring(0, first.index));
        }

        if (first.type === "bold" && boldMatch) {
          parts.push(
            <strong key={key++} className="font-bold">
              {boldMatch[1]}
            </strong>
          );
          remaining = remaining.substring(first.index + boldMatch[0].length);
        } else if (first.type === "italic" && italicMatch) {
          parts.push(
            <em key={key++} className="italic">
              {italicMatch[1]}
            </em>
          );
          remaining = remaining.substring(first.index + italicMatch[0].length);
        } else if (first.type === "code" && codeMatch) {
          parts.push(
            <code
              key={key++}
              className="bg-gray-200 px-1 py-0.5 rounded font-mono text-sm"
            >
              {codeMatch[1]}
            </code>
          );
          remaining = remaining.substring(first.index + codeMatch[0].length);
        } else if (first.type === "link" && linkMatch) {
          parts.push(
            <a
              key={key++}
              href={linkMatch[2]}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkMatch[1]}
            </a>
          );
          remaining = remaining.substring(first.index + linkMatch[0].length);
        }
      } else {
        parts.push(remaining);
        remaining = "";
      }
    }

    return parts.length === 1 ? parts[0] : parts;
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

          {/* Content */}
          <div className="prose-comic">{renderContent(post.content)}</div>
        </article>
      </div>
    </div>
  );
}

