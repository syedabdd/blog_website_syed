import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export const GET = async (request , {params}) => {

    const {slug} = params;
  try {
    await connectToDb(); // ✅ Always await the DB connection
    const post = await Post.findOne({slug}); // ✅ Call the function with ()
    return NextResponse.json(post); // ✅ Return the JSON response
  } catch (err) {
    console.log("Error fetching posts:", err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
};
export const DELETE = async (request , {params}) => {

    const {slug} = params;
  try {
    await connectToDb(); // ✅ Always await the DB connection
    await Post.deleteOne({slug}); // ✅ Call the function with ()
    return NextResponse.json("post deleted"); // ✅ Return the JSON response
  } catch (err) {
    console.log("Error fetching posts:", err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
};
