"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

const Embed = dynamic(() => import("@/components/Embed"), { ssr: false });

interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  const { parts, embeds } = useMemo(() => {
    const embeds: Array<{ id: string; url: string }> = [];
    const parts: Array<{ type: "html" | "embed"; content: string; embedUrl?: string }> = [];
    
    // Find all embed divs
    const embedRegex = /<div\s+data-embed-url="([^"]+)"[^>]*><\/div>/g;
    let lastIndex = 0;
    let match;
    let embedId = 0;

    while ((match = embedRegex.exec(html)) !== null) {
      // Add HTML before this embed
      if (match.index > lastIndex) {
        parts.push({
          type: "html",
          content: html.substring(lastIndex, match.index),
        });
      }
      
      // Add embed
      const embedUrl = match[1];
      parts.push({
        type: "embed",
        content: `embed-${embedId}`,
        embedUrl: embedUrl,
      });
      embeds.push({
        id: `embed-${embedId}`,
        url: embedUrl,
      });
      
      lastIndex = match.index + match[0].length;
      embedId++;
    }

    // Add remaining HTML
    if (lastIndex < html.length) {
      parts.push({
        type: "html",
        content: html.substring(lastIndex),
      });
    }

    return { parts, embeds };
  }, [html]);

  return (
    <div className="blog-content">
      {parts.map((part, index) => {
        if (part.type === "html") {
          return (
            <div
              key={`html-${index}`}
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          );
        } else {
          const embed = embeds.find((e) => e.id === part.content);
          return embed ? <Embed key={embed.id} url={embed.url} /> : null;
        }
      })}
    </div>
  );
}
