import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb(); // ✅ Always await the DB connection
    const posts = await Post.find(); // ✅ Call the function with ()
    return NextResponse.json(posts); // ✅ Return the JSON response
  } catch (err) {
    console.log("Error fetching posts:", err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
};
