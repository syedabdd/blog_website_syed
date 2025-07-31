'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="bg-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Left Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h4 className="text-[#ff6c03] font-semibold mb-2">About</h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Sharing thoughts, stories, <br className="hidden sm:block" /> and lessons from my journey.
          </h2>
          <p className="text-gray-300 mb-8 text-sm sm:text-base">
            I’m a passionate writer and creator who loves sharing ideas, experiences, and helpful tips through blogging. This space is where I express, connect, and build a community through words. From tech tutorials to personal growth, this blog is a reflection of everything I enjoy and learn.
          </p>

          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-[#ff6c03] text-xl font-bold">1+</p>
              <p className="text-gray-400 text-sm">Years Blogging</p>
            </div>
            <div>
              <p className="text-[#ff6c03] text-xl font-bold">10+</p>
              <p className="text-gray-400 text-sm">Posts Published</p>
            </div>
            <div>
              <p className="text-[#ff6c03] text-xl font-bold">200+</p>
              <p className="text-gray-400 text-sm">Readers Reached</p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.03 }}
        >
          <Image
            height={500}
            width={500}
            src="/images/download2.png"
            alt="About Blog"
            className="w-full h-auto rounded-3xl shadow-lg"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
