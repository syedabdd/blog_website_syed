import PostUser from "@/components/postuser/PostUser.jsx";
import { getPost } from "@/lib/data";
import Image from "next/image";
import { Suspense } from "react";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

  if (!res.ok) {
    console.error("Error fetching post");
    return null;
  }
  return res.json();
};

export default async function SinglePostPage({ params }) {
  const { slug } = params;
  const post = await getData(slug);

  if (!post) {
    return (
      <div className="text-white text-center py-20 text-xl">Post not found</div>
    );
  }

  return (
    <section className="bg-black text-white px-6 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

        {/* Left: Featured Image */}
        {post.img && (
          <div className="overflow-hidden rounded-xl shadow-xl border border-[#ff6c03]/20 group">
            <Image
              src={post.img}
              alt={post.title}
              width={700}
              height={500}
              className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition duration-500"
              priority
            />
          </div>
        )}

        {/* Right: Content */}
        <div className="space-y-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white hover:text-[#ff6c03] transition-colors duration-300">
            {post.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Image
                src={post.img}
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
                {post.createdAt?.toLocaleString?.().slice(0, 10) || "Unknown"}
              </span>
            </p>
          </div>

          {/* Description */}
          <div className="text-gray-300 text-[1.05rem] leading-relaxed tracking-wide">
            {post.desc}
          </div>

          {/* CTA or Read More (optional) */}

        </div>
      </div>
    </section>
  );
}
