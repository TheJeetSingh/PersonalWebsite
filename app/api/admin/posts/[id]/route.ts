import { NextRequest, NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/blog";

// GET /api/admin/posts/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to get post:", error);
    return NextResponse.json({ error: "Failed to get post" }, { status: 500 });
  }
}

// PUT /api/admin/posts/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const body = await req.json();
    const post = await updatePost(id, body);
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/admin/posts/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const deleted = await deletePost(id);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

