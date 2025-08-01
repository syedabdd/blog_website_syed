"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { addPost } from "@/lib/action";

const AdminPostForm = () => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      if (session?.user?.email) {
        const res = await fetch(`/api/user-by-email?email=${session.user.email}`);
        const data = await res.json();
        setUserId(data._id);
      }
    };
    getUserId();
  }, [session]);

  return (
    <div className="min-h-screen text-white sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-10">
        <form
          action={addPost}
          className="bg-[#111] border border-[#ff6c03]/30 p-6 sm:p-8 rounded-2xl shadow-lg space-y-5"
        >
          <input type="hidden" name="userId" value={userId} />

          <h1 className="text-3xl font-bold text-center text-[#ff6c03]">Create New Post</h1>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter post title"
              className="w-full bg-[#1a1a2e] text-white placeholder-gray-400 px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              rows="4"
              placeholder="Write a short description..."
              className="w-full bg-[#1a1a2e] text-white placeholder-gray-400 px-4 py-2 rounded-lg"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
              Slug (URL identifier)
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              placeholder="e.g. my-first-post"
              className="w-full bg-[#1a1a2e] text-white placeholder-gray-400 px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="img" className="block text-sm font-medium text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="img"
              id="img"
              placeholder="https://example.com/image.jpg"
              className="w-full bg-[#1a1a2e] text-white placeholder-gray-400 px-4 py-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff6c03] hover:bg-orange-600 text-white font-bold py-2 rounded-lg"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPostForm;
