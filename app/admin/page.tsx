"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import StarryBackground from "@/components/StarryBackground";
import "./admin.css";

// Dynamically import the rich text editor (it uses browser APIs)
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="border-4 border-black bg-gray-100 p-8 text-center">
      <p className="font-dynaPuff">Loading editor...</p>
    </div>
  ),
});

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  readTime: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [readTime, setReadTime] = useState("5 min read");
  const [published, setPublished] = useState(true);

  // New features
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const contentChangedRef = useRef(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAutoSave = useCallback(async () => {
    if (!title.trim() || !content.trim()) return;

    setAutoSaveStatus("saving");

    try {
      const payload = {
        title,
        excerpt: excerpt || null,
        content,
        category,
        readTime,
        published: false, // Autosave always saves as draft
      };

      let res: Response;
      if (editingPost) {
        res = await fetch(`/api/admin/posts/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const newPost = await res.json();
          setEditingPost(newPost);
        }
      }

      if (res.ok) {
        setLastAutoSave(new Date());
        setAutoSaveStatus("saved");
        contentChangedRef.current = false;
        // Reset status after 3 seconds
        setTimeout(() => setAutoSaveStatus("idle"), 3000);
      }
    } catch (err) {
      console.error("Autosave error", err);
      setAutoSaveStatus("idle");
    }
  }, [title, excerpt, content, category, readTime, editingPost]);

  // Autosave effect
  useEffect(() => {
    if (!showEditor) return;

    // Mark content as changed
    contentChangedRef.current = true;

    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // Set new timer for 30 seconds
    autoSaveTimerRef.current = setTimeout(() => {
      if (contentChangedRef.current && title.trim() && content.trim()) {
        handleAutoSave();
      }
    }, 30000);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [title, excerpt, content, category, readTime, showEditor, handleAutoSave]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("General");
    setReadTime("5 min read");
    setPublished(true);
    setEditingPost(null);
    setShowPreview(false);
    setIsFullscreen(false);
    setLastAutoSave(null);
    setAutoSaveStatus("idle");
  };

  const openNewPost = () => {
    resetForm();
    setShowEditor(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt || "");
    setContent(post.content);
    setCategory(post.category);
    setReadTime(post.readTime);
    setPublished(post.published);
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title,
        excerpt: excerpt || null,
        content,
        category,
        readTime,
        published,
      };

      let res: Response;
      if (editingPost) {
        res = await fetch(`/api/admin/posts/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        await fetchPosts();
        setShowEditor(false);
        resetForm();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save post");
      }
    } catch (err) {
      console.error("Save error", err);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchPosts();
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      await fetch(`/api/admin/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      await fetchPosts();
    } catch (err) {
      console.error("Toggle publish error", err);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const categoryColors: { [key: string]: string } = {
    Tutorial: "bg-yellow-100",
    Development: "bg-blue-100",
    Personal: "bg-pink-100",
    General: "bg-gray-100",
    Project: "bg-green-100",
  };

  // Fullscreen editor wrapper
  const editorWrapperClass = isFullscreen
    ? "fixed inset-0 z-50 bg-white overflow-auto"
    : "";

  return (
    <div className="min-h-screen relative">
      {!isFullscreen && <StarryBackground />}
      <div className={isFullscreen ? "" : "relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24"}>
        {/* Header - hide in fullscreen */}
        {!isFullscreen && (
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-luckiestGuy text-black font-bold drop-shadow-[3px_3px_0_#fff]">
              Admin Control Room
            </h1>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-black font-bold text-lg border-4 border-black shadow-[3px_3px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_#000] transition-all"
            >
              Logout
            </button>
          </div>
        )}

        {!showEditor ? (
          <>
            {/* New Post Button */}
            <div className="mb-8">
              <button
                onClick={openNewPost}
                className="px-8 py-4 bg-green-500 text-black font-luckiestGuy font-bold text-2xl border-4 border-black shadow-[5px_5px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#000] transition-all"
              >
                + New Blog Post
              </button>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {loading ? (
                <div className="comic-panel bg-white p-8 text-center">
                  <p className="font-dynaPuff text-black font-bold text-lg">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="comic-panel bg-white p-8 text-center">
                  <p className="font-dynaPuff text-black font-bold text-xl">
                    No posts yet! Click &quot;New Blog Post&quot; to create your first one.
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="comic-panel bg-white p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 text-sm font-bouncy font-bold text-black border-2 border-black ${post.published ? "bg-green-200" : "bg-yellow-200"
                            }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                        <span className="px-3 py-1 text-sm font-bouncy font-bold text-black bg-blue-100 border-2 border-black">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-luckiestGuy font-bold text-black">{post.title}</h3>
                      <p className="font-dynaPuff text-base font-bold text-black">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => togglePublish(post)}
                        className={`px-4 py-2 font-bouncy font-bold text-black text-base border-2 border-black shadow-[2px_2px_0_#000] ${post.published
                            ? "bg-yellow-200 hover:bg-yellow-300"
                            : "bg-green-200 hover:bg-green-300"
                          }`}
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => openEditPost(post)}
                        className="px-4 py-2 bg-blue-200 hover:bg-blue-300 font-bouncy font-bold text-black text-base border-2 border-black shadow-[2px_2px_0_#000]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-4 py-2 bg-red-200 hover:bg-red-300 font-bouncy font-bold text-black text-base border-2 border-black shadow-[2px_2px_0_#000]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          /* Editor */
          <div className={editorWrapperClass}>
            <div className={`comic-panel bg-white ${isFullscreen ? "min-h-screen rounded-none border-0" : ""} p-8`}>
              {/* Editor Header */}
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-luckiestGuy font-bold text-black">
                    {editingPost ? "Edit Post" : "New Post"}
                  </h2>
                  {/* Autosave status */}
                  <span className={`text-sm font-dynaPuff ${
                    autoSaveStatus === "saving" ? "text-yellow-600" :
                    autoSaveStatus === "saved" ? "text-green-600" : "text-gray-400"
                  }`}>
                    {autoSaveStatus === "saving" && "⏳ Saving..."}
                    {autoSaveStatus === "saved" && "✓ Saved"}
                    {autoSaveStatus === "idle" && lastAutoSave && `Last saved: ${lastAutoSave.toLocaleTimeString()}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Preview Toggle */}
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className={`px-4 py-2 font-bouncy font-bold text-black text-sm border-2 border-black ${
                      showPreview ? "bg-purple-300" : "bg-purple-100 hover:bg-purple-200"
                    }`}
                  >
                    {showPreview ? "✏️ Edit" : "👁️ Preview"}
                  </button>
                  {/* Fullscreen Toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className={`px-4 py-2 font-bouncy font-bold text-black text-sm border-2 border-black ${
                      isFullscreen ? "bg-blue-300" : "bg-blue-100 hover:bg-blue-200"
                    }`}
                  >
                    {isFullscreen ? "⊟ Exit" : "⊞ Fullscreen"}
                  </button>
                  {/* Cancel */}
                  <button
                    onClick={() => {
                      if (contentChangedRef.current) {
                        if (!confirm("You have unsaved changes. Are you sure you want to leave?")) {
                          return;
                        }
                      }
                      setShowEditor(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-bouncy font-bold text-black text-sm border-2 border-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {showPreview ? (
                /* Preview Mode */
                <div className="border-4 border-black p-6 bg-gray-50 min-h-[500px]">
                  <div className="max-w-3xl mx-auto">
                    {/* Preview Header */}
                    <div className="border-b-4 border-black pb-6 mb-6">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className={`px-3 py-1 ${categoryColors[category] || "bg-gray-100"} font-bouncy text-black text-xs font-bold uppercase border-2 border-black`}>
                          {category}
                        </span>
                        <span className="font-dynaPuff text-black text-sm">
                          {new Date().toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="font-dynaPuff text-black text-sm">
                          {readTime}
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl font-luckiestGuy text-black uppercase tracking-wide">
                        {title || "Untitled Post"}
                      </h1>
                      {excerpt && (
                        <p className="mt-4 font-dynaPuff text-gray-700 text-lg">
                          {excerpt}
                        </p>
                      )}
                    </div>
                    {/* Preview Content */}
                    <div
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: content || "<p>Start writing to see preview...</p>" }}
                    />
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block font-dynaPuff font-bold text-black text-lg mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-5 py-4 border-4 border-black font-dynaPuff font-bold text-black text-lg"
                      placeholder="My Awesome Blog Post"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block font-dynaPuff font-bold text-black text-lg mb-2">
                      Excerpt (short description)
                    </label>
                    <input
                      type="text"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full px-5 py-4 border-4 border-black font-dynaPuff font-bold text-black text-lg"
                      placeholder="A brief summary of your post..."
                    />
                  </div>

                  {/* Category & Read Time */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-dynaPuff font-bold text-black text-lg mb-2">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-5 py-4 border-4 border-black font-dynaPuff font-bold text-black text-lg"
                      >
                        <option value="General">General</option>
                        <option value="Tutorial">Tutorial</option>
                        <option value="Development">Development</option>
                        <option value="Personal">Personal</option>
                        <option value="Project">Project</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-dynaPuff font-bold text-black text-lg mb-2">Read Time</label>
                      <input
                        type="text"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                        className="w-full px-5 py-4 border-4 border-black font-dynaPuff font-bold text-black text-lg"
                        placeholder="5 min read"
                      />
                    </div>
                  </div>

                  {/* Content - Rich Text Editor */}
                  <div>
                    <label className="block font-dynaPuff font-bold text-black text-lg mb-2">
                      Content
                    </label>
                    <RichTextEditor
                      key={editingPost?.id || "new"}
                      content={content}
                      onChange={setContent}
                      placeholder="Start writing your epic blog post..."
                    />
                  </div>

                  {/* Publish Toggle */}
                  <div className="flex items-center gap-4">
                    <label className="font-dynaPuff font-bold text-black text-lg">Auto-publish:</label>
                    <button
                      type="button"
                      onClick={() => setPublished(!published)}
                      className={`px-5 py-3 font-bouncy font-bold text-black text-base border-4 border-black shadow-[2px_2px_0_#000] ${published ? "bg-green-300" : "bg-gray-200"
                        }`}
                    >
                      {published ? "Yes - Publish Immediately" : "No - Save as Draft"}
                    </button>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full px-8 py-5 bg-black text-white font-luckiestGuy font-bold text-2xl border-4 border-black shadow-[5px_5px_0_#333] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#333] transition-all disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingPost ? "Update Post" : "Publish Post"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
