'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Counter = ({ end, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.ceil(start));
        }
      }, 30);
    }
  }, [isInView, end]);

  return (
    <div ref={ref}>
      <p className="text-[#ff6c03] text-xl font-bold">{count}+</p>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: 'easeOut',
    },
  }),
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <motion.section
      ref={sectionRef}
      className="bg-black text-white px-6 py-20 overflow-hidden"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div className="flex-1 space-y-5" variants={fadeInUp}>
          <motion.h4
            className="text-[#ff6c03] font-semibold"
            custom={0}
            variants={fadeInUp}
          >
            About
          </motion.h4>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            custom={1}
            variants={fadeInUp}
          >
            Sharing thoughts, stories, <br className="hidden sm:block" /> and lessons from my journey.
          </motion.h2>
          <motion.p
            className="text-gray-300 text-sm sm:text-base"
            custom={2}
            variants={fadeInUp}
          >
            I’m a passionate writer and creator who loves sharing ideas, experiences, and helpful tips through blogging. This space is where I express, connect, and build a community through words. From tech tutorials to personal growth, this blog is a reflection of everything I enjoy and learn.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-8 pt-4"
            custom={3}
            variants={fadeInUp}
          >
            <Counter end={1} label="Years Blogging" />
            <Counter end={10} label="Posts Published" />
            <Counter end={200} label="Readers Reached" />
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
        >
          <Image
            height={500}
            width={500}
            src="/images/download2.png"
            alt="About Blog"
            className="w-full h-auto rounded-3xl shadow-2xl object-cover transition-all duration-500"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
