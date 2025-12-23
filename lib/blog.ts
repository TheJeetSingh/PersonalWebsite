import { kv } from "@vercel/kv";

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  readTime: string;
  published: boolean;
  attachments?: Attachment[];
  createdAt: string;
  updatedAt: string;
}

const POSTS_KEY = "blog_posts";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await kv.get<BlogPost[]>(POSTS_KEY);
    return posts || [];
  } catch (error) {
    console.error("Failed to get posts:", error);
    return [];
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug && p.published) || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.id === id) || null;
}

export async function createPost(data: {
  title: string;
  excerpt?: string | null;
  content: string;
  category: string;
  readTime: string;
  published?: boolean;
  attachments?: Attachment[];
}): Promise<BlogPost> {
  const posts = await getAllPosts();
  
  const now = new Date().toISOString();
  const newPost: BlogPost = {
    id: generateId(),
    slug: generateSlug(data.title),
    title: data.title,
    excerpt: data.excerpt || null,
    content: data.content,
    category: data.category,
    readTime: data.readTime,
    published: data.published ?? true,
    attachments: data.attachments || [],
    createdAt: now,
    updatedAt: now,
  };

  // Ensure unique slug
  let slugBase = newPost.slug;
  let counter = 1;
  while (posts.some((p) => p.slug === newPost.slug)) {
    newPost.slug = `${slugBase}-${counter}`;
    counter++;
  }

  posts.push(newPost);
  await kv.set(POSTS_KEY, posts);
  
  return newPost;
}

export async function updatePost(
  id: string,
  data: Partial<{
    title: string;
    excerpt: string | null;
    content: string;
    category: string;
    readTime: string;
    published: boolean;
    attachments: Attachment[];
  }>
): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.id === id);
  
  if (index === -1) return null;

  const updated: BlogPost = {
    ...posts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  // If title changed, update slug
  if (data.title && data.title !== posts[index].title) {
    let newSlug = generateSlug(data.title);
    let slugBase = newSlug;
    let counter = 1;
    while (posts.some((p) => p.slug === newSlug && p.id !== id)) {
      newSlug = `${slugBase}-${counter}`;
      counter++;
    }
    updated.slug = newSlug;
  }

  posts[index] = updated;
  await kv.set(POSTS_KEY, posts);
  
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);
  
  if (filtered.length === posts.length) return false;
  
  await kv.set(POSTS_KEY, filtered);
  return true;
}

