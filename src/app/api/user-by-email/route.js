// src/app/api/user-by-email/route.js

import { connectToDb } from "@/lib/utlis";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  try {
    await connectToDb();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error in /api/user-by-email:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
