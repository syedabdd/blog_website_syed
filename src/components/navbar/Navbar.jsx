'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = session?.user?.isAdmin;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
  ];

  const linkClass = (path) =>
    `px-3 py-1 rounded-md font-medium transition duration-200 ${
      pathname === path
        ? 'bg-white text-orange-500'
        : 'text-white hover:text-orange-400'
    }`;

  const handleAuthClick = () => {
    setMenuOpen(false);
    session ? signOut() : router.push('/login');
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-gradient-to-b from-black via-[#111] to-orange-600 py-4 px-6 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-white hover:text-orange-400 transition"
        >
          Blog<span className="text-orange-500  hover:text-orange-400 transition">Life</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden font-bold md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleAuthClick}
            className="ml-4 bg-white text-orange-500 px-4 py-1 rounded-md font-semibold hover:bg-orange-100 transition duration-200"
          >
            {session ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${linkClass(link.href)} block`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleAuthClick}
              className="bg-white text-orange-500 px-4 py-1 rounded-md font-semibold hover:bg-orange-100 transition duration-200"
            >
              {session ? 'Logout' : 'Login'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
