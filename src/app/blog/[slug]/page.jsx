import PostUser from "@/components/postuser/PostUser.jsx";
import { Suspense } from "react";
import Image from "next/image";

// ✅ Fetch post using dynamic BASE URL
const getData = async (slug) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
      cache: "no-store", // Avoid caching issues
    });

    if (!res.ok) {
      console.error("Error fetching post");
      return null;
    }

    return res.json();
  } catch (err) {
    console.error("❌ Failed to fetch post:", err);
    return null;
  }
};

export default async function SinglePostPage({ params }) {
  const { slug } = params;
  const post = await getData(slug);

  if (!post) {
    return (
      <div className="text-white text-center py-20 text-xl">
        Post not found
      </div>
    );
  }

  return (
    <section className="bg-black text-white px-6 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-start">
        {/* Right: Post Content */}
        <div className="flex-1 space-y-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white hover:text-[#ff6c03] transition-colors duration-300">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Image
                src={post.img || "/default-user.png"}
                alt="Author"
                width={40}
                height={40}
                className="rounded-full object-cover w-10 h-10 border border-[#ff6c03]/50"
              />
              <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
                <PostUser userId={post.userId} />
              </Suspense>
            </div>
            <p className="text-sm text-gray-400 text-right">
              Published on <br />
              <span className="text-[#ff6c03]">
                {new Date(post.createdAt).toLocaleDateString("en-IN")}
              </span>
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-gray-300 text-[1.1rem] leading-relaxed tracking-wide">
            {post.desc}
          </div>
        </div>

        {/* Left: Featured Image */}
        {post.img && (
          <div className="flex-1 w-full max-h-[500px] overflow-hidden rounded-xl shadow-2xl border border-[#ff6c03]/20 group">
            <Image
              src={post.img}
              alt={post.title}
              width={700}
              height={500}
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
