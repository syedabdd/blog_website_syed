'use client'

import { register } from '@/lib/action'
import React, { useState } from 'react'

function RegisterPage() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false) // ✅

  const registerUser = async (e) => {
    e.preventDefault()
    setLoading(true) // ✅ Start loading

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const res = await register(data)
      if (res !== 'success') {
        setError(res)
        setSuccess(null)
      } else {
        setError(null)
        setSuccess('User registered successfully ✅')
        e.target.reset()
      }
    } catch (err) {
      console.error('Register error:', err)
      setError(err.message || 'Something went wrong')
      setSuccess(null)
    } finally {
      setLoading(false) // ✅ Stop loading
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={registerUser}
        className="w-full max-w-md bg-[#111111] rounded-2xl shadow-2xl p-8 space-y-5 border border-orange-500"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500">Create Account</h2>

        {success && (
          <p className="text-green-500 text-center text-sm font-medium">{success}</p>
        )}
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
          disabled={loading}
          className={`w-full font-semibold py-3 rounded-lg transition duration-300 ${
            loading
              ? 'bg-orange-400 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {loading ? 'Registering...' : 'Register here'}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
