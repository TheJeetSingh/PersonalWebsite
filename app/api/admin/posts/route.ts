import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/blog";

// GET /api/admin/posts - list all posts (including drafts)
export async function GET() {
  try {
    const posts = await getAllPosts();
    // Sort by createdAt desc
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to get posts:", error);
    return NextResponse.json({ error: "Failed to get posts" }, { status: 500 });
  }
}

// POST /api/admin/posts - create a new post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const post = await createPost({
      title: body.title,
      excerpt: body.excerpt || null,
      content: body.content,
      category: body.category || "General",
      readTime: body.readTime || "5 min read",
      published: body.published ?? true,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

