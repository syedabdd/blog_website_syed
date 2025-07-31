import React from "react";
import { getUser } from "@/lib/data"; // 👈 Import the correct MongoDB fetch function

export default async function PostUser({ userId }) {
  const user = await getUser(userId); // 🔍 Fetch from your database
  
  
  if (!user) {
    return (
      <div>
        <p className="text-sm text-white">Author</p>
        <p className="text-sm text-gray-400 -mt-1">Unknown</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-white">Author</p>
      <p className="text-sm text-gray-400 -mt-1">{user.username}</p>
    </div>
  );
}
