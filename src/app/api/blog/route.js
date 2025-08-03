import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();

    const posts = await Post.find().sort({ createdAt: -1 }); // 👈 newest first

    return NextResponse.json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts:", err.message);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
};
