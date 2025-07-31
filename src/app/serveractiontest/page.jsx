"use client";

import { addPost, deletePost } from "@/lib/action";
import React from "react";

export default function ServerActionPage() {
  return (
    <div className="min-h-screen bg-[#0c0c3c] text-white px-4 py-10 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-center mb-4">Manage Posts</h1>

        {/* Add Post Form */}
        <form
          action={addPost}
          className="bg-[#1a1a4d] p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold">Create a New Post</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="desc"
            placeholder="Description"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-4 rounded"
          >
            Create Post
          </button>
        </form>

        {/* Delete Post Form */}
        <form
          action={deletePost}
          className="bg-[#1a1a4d] p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold">Delete a Post</h2>
          <input
            type="text"
            name="id"
            placeholder="Post ID"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2 px-4 rounded"
          >
            Delete Post
          </button>
        </form>
      </div>
    </div>
  );
}
