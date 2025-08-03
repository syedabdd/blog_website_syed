import PostUser from "@/components/postuser/PostUser.jsx";
import Image from "next/image";
import { Suspense } from "react";

// Server-side fetch function
const getData = async (slug) => {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXTAUTH_URL || "http://localhost:3000"
      : "";

  try {
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
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
    <section className="bg-black text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-start">

        {/* Right: Post Content */}
        <div className="w-full lg:w-1/2 space-y-10">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white hover:text-[#ff6c03] transition-colors duration-300">
            {post.title}
          </h1>

          {/* Author & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-4">
            <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
              <PostUser userId={post.userId} />
            </Suspense>

            <p className="text-sm text-gray-400 sm:text-right">
              Published on <br />
              <span className="text-[#ff6c03]">
                {new Date(post.createdAt).toLocaleDateString("en-IN") || "Unknown"}
              </span>
            </p>
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none text-gray-300 text-[1rem] sm:text-[1.1rem] leading-relaxed tracking-wide">
            {post.desc}
          </div>
        </div>

        {/* Left: Featured Image (post content image) */}
        {post.img && (
          <div className="w-full lg:w-1/2 max-h-[500px] overflow-hidden rounded-xl shadow-2xl border border-[#ff6c03]/20 group">
            <Image
              src={post.img}
              alt={post.title}
              width={700}
              height={500}
              className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
