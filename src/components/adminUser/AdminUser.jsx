import { deleteUser } from '@/lib/action';
import { getUsers } from '@/lib/data';
import Image from 'next/image';
import React from 'react';

const AdminUser = async () => {
  const users = await getUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">All Users</h1>

      {users && users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="group flex items-center gap-4 border border-[#ff6c03]/30 p-3 my-3 rounded-xl bg-[#111] hover:shadow-md hover:shadow-orange-500/10 transition-all duration-300"
          >
            <Image
              src={user.img || '/images/noavatar.webp'}
              width={60}
              height={60}
              alt={user.username || 'No username'}
              className="rounded-full object-cover w-12 h-12"
            />

            <div className="flex-1">
              <h2 className="text-sm font-semibold text-white group-hover:text-[#ff6c03] transition-colors duration-300">
                {user.username}
              </h2>

              <form action={deleteUser}>
                <input type="hidden" name="id" value={user._id.toString()} />
                <button className="mt-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-all duration-200">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No users found.</p>
      )}
    </div>
  );
};

export default AdminUser;
