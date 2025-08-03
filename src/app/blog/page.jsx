'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Post from '@/components/postCard/Post';

export default function BlogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/blog');
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

  if (status === 'loading' || loadingPosts) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-[var(--accent)] animate-blink">
        Loading...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-red-500">
        {fetchError}
      </div>
    );
  }

  if (!session) return null;

  return (
    <motion.div
      className="p-6 sm:p-10 bg-[var(--bgSoft)] min-h-screen text-white"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.h1
        className="text-3xl font-bold text-[var(--accent)] mb-10 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Latest Blog Posts
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.4,
            },
          },
        }}
      >
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Post post={post} />
            </motion.div>
          ))
        ) : (
          <motion.p
            className="col-span-full text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            No blog posts found.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
