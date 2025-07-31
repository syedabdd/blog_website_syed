"use client";

import { useActionState, useEffect, useState } from "react";
import { addUser } from "@/lib/action";

export default function AdminUserForm() {
  const [state, formAction] = useActionState(addUser, {});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [state?.success]);

  return (
    <div className="min-h-screen  text-white py-10 sm:px-6 lg:px-8 flex justify-center items-start">
      <form
        action={formAction}
        className="w-full max-w-2xl bg-[#111] border border-[#ff6c03]/30 p-8 sm:p-10 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#ff6c03] text-center">
          ➕ Add New User
        </h2>

        <div className="grid gap-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              required
              className="w-full px-4 py-2 rounded-md bg-[#1a1a2e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 rounded-md bg-[#1a1a2e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 rounded-md bg-[#1a1a2e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Image URL
            </label>
            <input
              name="img"
              type="text"
              placeholder="Optional image URL"
              className="w-full px-4 py-2 rounded-md bg-[#1a1a2e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* isAdmin */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Is Admin?
            </label>
            <select
              name="isAdmin"
              required
              className="w-full px-4 py-2 rounded-md bg-[#1a1a2e] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">-- Select --</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold py-2 rounded-md"
        >
          Add User
        </button>

        {/* Feedback */}
        {showSuccess && (
          <div className="text-green-400 text-sm font-medium flex items-center gap-2 mt-2">
            ✅ User added successfully
          </div>
        )}

        {state?.error && (
          <div className="text-red-400 text-sm font-medium flex items-center gap-2 mt-2">
            ❌ {state.error}
          </div>
        )}
      </form>
    </div>
  );
}
