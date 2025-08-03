import React from "react";
import { getUser } from "@/lib/data";
import Image from "next/image";

export default async function PostUser({ userId }) {
  const user = await getUser(userId);

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-600 rounded-full" />
        <div>
          <p className="text-sm text-white">Author</p>
          <p className="text-sm text-gray-400 -mt-1">Unknown</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {user.img ? (
        <Image
          src={user.img || '/images/noavatar.webp'}
          alt={user.username}
          width={40}
          height={40}
          className="rounded-full object-cover w-10 h-10 border border-[#ff6c03]/50"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-600 rounded-full" />
      )}
      <div>
        <p className="text-sm text-white">Author</p>
        <p className="text-sm text-gray-400 -mt-1">{user.username}</p>
      </div>
    </div>
  );
}
