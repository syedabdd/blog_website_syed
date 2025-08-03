"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const cursorStyles = `inline-block w-[2px] h-[1.3em] bg-orange-400 animate-blink ml-1`;

// Words for typewriter
const words = ["BlogLife", "Ideas", "Technology", "Creativity", "Inspiration"];

export default function Home() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typing effect logic
  useEffect(() => {
    const word = words[wordIndex];
    if (charIndex < word.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + word[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, wordIndex]);

  return (
    <motion.section
      className="relative text-white px-6 py-20 overflow-hidden cursor-default"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3,
            delayChildren: 0.4,
          },
        },
      }}
    >
      {/* Animated blob */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-orange-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        {/* Left Content */}
        <motion.div className="flex-1 text-center md:text-left" variants={{ hidden: {}, visible: {} }}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to <br />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent inline-block">
              {text}
            </span>
            <span className={cursorStyles}></span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Discover insights, tutorials, and deep dives into technology,
            creativity, and growth. BlogLife is your modern space for learning
            and sharing — with style.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Link href="/contact" passHref>
              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(255,165,0,0.5)",
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
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 text-sm sm:text-base rounded-full font-semibold border border-orange-500 text-orange-400 bg-white/10 backdrop-blur-md hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Read Blog
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: [0, -15, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
    </motion.section>
  );
}
