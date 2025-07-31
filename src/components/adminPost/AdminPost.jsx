import { deletePost } from '@/lib/action';
import { getPosts } from '@/lib/data';
import Image from 'next/image';
import React from 'react';

const AdminPost = async () => {
  let posts = await getPosts();

  if (!Array.isArray(posts)) {
    posts = [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">All Posts</h1>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="group flex items-center gap-4 border border-[#ff6c03]/30 p-4 my-4 rounded-2xl bg-[#111] hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
          >
            <Image
              src={post.img || '/noAvatarShow.png'}
              width={100}
              height={70}
              alt={post.title || 'No title'}
              className="rounded-lg object-cover w-24 h-16"
            />

            <div className="flex-1 w-full">
  <h2 className="text-base md:text-lg font-semibold text-white group-hover:text-[#ff6c03] transition-colors duration-300">
    {post.title}
  </h2>

  <form action={deletePost} className="mt-2">
    <input type="hidden" name="id" value={post._id.toString()} />
    <button
      type="submit"
      className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm px-4 py-1.5 rounded-md transition duration-200 w-full sm:w-auto"
    >
      Delete
    </button>
  </form>
</div>

          </div>
        ))
      ) : (
        <p className="text-gray-400">No posts found.</p>
      )}
    </div>
  );
};

export default AdminPost;
