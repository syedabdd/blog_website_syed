// components/Footer.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className=" border-gray-800 text-white py-8 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        
        {/* Left - Name or Brand */}
        <div className="font-semibold text-gray-400 mb-2 sm:mb-0 hover:text-orange-400 transition duration-300 cursor-default">
          Syed Abdullah
        </div>

        {/* Right - Copyright */}
        <div className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
          © {new Date().getFullYear()} Syed Abdullah. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
