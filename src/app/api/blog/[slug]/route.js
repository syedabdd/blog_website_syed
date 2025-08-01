// src/app/api/posts/[slug]/route.js

import { connectToDb } from "@/lib/utlis";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

// GET /api/posts/[slug]
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    await connectToDb();
    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
};

// DELETE /api/posts/[slug]
export const DELETE = async (req, { params }) => {
  const { slug } = params;

  try {
    await connectToDb();
    const result = await Post.deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
};
