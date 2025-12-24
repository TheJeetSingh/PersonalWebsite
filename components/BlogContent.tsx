"use client";

interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  // Simply render the HTML content directly
  // Iframes are now stored directly in the HTML content
  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
