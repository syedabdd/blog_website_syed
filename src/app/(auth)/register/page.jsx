'use client'

import { register } from '@/lib/action'
import React, { useState } from 'react'

function RegisterPage() {
  const [error, setError] = useState(null)

  const registerUser = async (formData) => {
    try {
      const res = await register(formData)
      if (res !== "success") {
        setError(res)
      } else {
        setError(null)
        alert("User registered successfully ✅")
        // Optionally redirect to login
      }
    } catch (err) {
      setError(err.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        action={registerUser}
        className="w-full max-w-md bg-[#111111] rounded-2xl shadow-2xl p-8 space-y-5 border border-orange-500"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500">Create Account</h2>

        {error && (
          <p className="text-red-500 text-center text-sm font-medium">{error}</p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="password"
          name="repassword"
          placeholder="Confirm Password"
          required
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Register here
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
