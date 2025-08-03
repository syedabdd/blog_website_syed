'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

function Post({ post }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/blog/${post.slug}`)
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="w-full max-w-md mx-auto relative group"
      onClick={handleClick}
    >
      {/* Loader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="bg-[#111] border border-[var(--accent)]/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_20px_var(--accent)] transition-all duration-300 cursor-pointer"
      >
        {/* Image */}
        {post.img && (
          <div className="overflow-hidden">
            <Image
              src={post.img}
              alt="Post Thumbnail"
              width={500}
              height={300}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <motion.div
            className="flex items-center justify-between text-sm text-[var(--accent)] mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">Published</span>
            <span className="opacity-80">Nov 04, 2023</span>
          </motion.div>

          <motion.h3
            className="text-xl font-bold text-white mb-3 group-hover:text-[var(--accent)] transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {post.title}
          </motion.h3>

          <motion.p
            className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {post.body}
          </motion.p>

          <motion.span
            className="inline-block text-sm font-medium text-[var(--accent)] group-hover:text-white transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Read More →
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Post
