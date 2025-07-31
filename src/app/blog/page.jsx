'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Post from '@/components/postCard/Post'

export default function BlogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchPosts = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('http://localhost:3000/api/blog')
          if (!res.ok) throw new Error('Failed to fetch posts')
          const data = await res.json()
          setPosts(data)
        } catch (err) {
          console.error(err)
        } finally {
          setLoadingPosts(false)
        }
      }
    }

    fetchPosts()
  }, [status])

  if (status === 'loading' || loadingPosts) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-[#ff6c03]">
        Loading...
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="p-6 sm:p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-[#ff6c03] mb-8 text-center">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
