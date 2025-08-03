'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Post from '@/components/postCard/Post';

export default function BlogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/blog'); // ✅ relative URL for both dev & prod

          if (!res.ok) throw new Error('Failed to fetch posts');
          const data = await res.json();
          setPosts(data);
        } catch (err) {
          console.error(err);
          setFetchError('Could not load blog posts.');
        } finally {
          setLoadingPosts(false);
        }
      }
    };

    fetchPosts();
  }, [status]);

  // Loading screen
  if (status === 'loading' || loadingPosts) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-[#ff6c03]">
        Loading...
      </div>
    );
  }

  // Optional: Error message
  if (fetchError) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-red-500">
        {fetchError}
      </div>
    );
  }

  if (!session) return null;

  // Render posts
  return (
    <div className="p-6 sm:p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-[#ff6c03] mb-8 text-center">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No blog posts found.
          </p>
        )}
      </div>
    </div>
  );
}
