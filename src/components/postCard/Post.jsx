'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function Post({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="w-full max-w-md mx-auto"
    >
      <Link href={`/blog/${post.slug}`} className="block group cursor-pointer">
        <div className="bg-[#111] border border-[#ff6c03]/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-shadow duration-300">

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
            {/* Date + Category */}
            <div className="flex items-center justify-between text-sm text-[#ff6c03] mb-2">
              <span className="bg-[#ff6c03]/10 px-2 py-0.5 rounded-full">Published</span>
              <span className="opacity-80">Nov 04, 2023</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff6c03] transition-colors duration-300">
              {post.title}
            </h3>

            {/* Body */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
              {post.body}
            </p>

            {/* Read More Text (optional) */}
            <span className="inline-block text-sm font-medium text-[#ff6c03] group-hover:text-white transition-colors duration-200">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default Post
  