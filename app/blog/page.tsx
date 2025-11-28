import Link from "next/link";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 14",
      excerpt: "A comprehensive guide to building modern web applications with Next.js 14, covering the App Router, Server Components, and more.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Tutorial",
    },
    {
      id: 2,
      title: "Building Scalable React Applications",
      excerpt: "Best practices and patterns for building large-scale React applications that are maintainable and performant.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Development",
    },
    {
      id: 3,
      title: "My Journey into Machine Learning",
      excerpt: "Reflections on learning machine learning, the challenges faced, and key insights gained along the way.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Personal",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and documentation on technology and development
          </p>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

