"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <section className=" text-white px-6 py-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Welcome to <br />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              BlogLife
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mb-10">
  Explore stories, insights, and practical guides on technology,
  personal growth, and modern life. Whether you&apos;re a developer seeking
  fresh tips, a curious mind craving thoughtful perspectives, or just
  someone looking for daily inspiration — BlogWrite is your go-to
  place. Join a community that thrives on curiosity, creativity, and
  continuous learning.
</p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link href="/contact" passHref>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 6px 24px rgba(255, 165, 0, 0.35)",
                }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 text-sm sm:text-base rounded-full font-semibold border border-orange-500 text-orange-400 bg-white/10 backdrop-blur-md hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Contact Me
              </motion.button>
            </Link>

            <Link href="/blog" passHref>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 6px 24px rgba(255, 255, 255, 0.15)",
                }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 text-sm sm:text-base rounded-full font-semibold border border-orange-500 text-orange-400 bg-white/10 backdrop-blur-md hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Read Blog
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/homepage.png"
            alt="Hero illustration"
            width={500}
            height={500}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl shadow-2xl object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
