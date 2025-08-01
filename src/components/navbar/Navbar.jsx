'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const isAdmin = session?.user?.isAdmin

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
  ]

  const handleNavigation = (href) => {
    if (pathname !== href) {
      setLoading(true)
      setMenuOpen(false)
      router.push(href)
    } else {
      setMenuOpen(false)
    }
  }

  const handleAuthClick = () => {
    setMenuOpen(false)
    if (session) {
      signOut()
    } else {
      setLoading(true)
      router.push('/login')
    }
  }

  // Automatically stop loader after route change
  useEffect(() => {
    setLoading(false)
  }, [pathname])

  const linkClass = (path) =>
    `px-3 py-1 rounded-md font-medium transition duration-200 ${
      pathname === path
        ? 'bg-white text-orange-500'
        : 'text-white hover:text-orange-400'
    }`

  return (
    <>
      {/* Global Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-gradient-to-b from-black via-[#111] to-orange-600 py-4 px-6 shadow-lg"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand */}
          <button
            onClick={() => handleNavigation('/')}
            className="text-3xl font-extrabold tracking-tight text-white hover:text-orange-400 transition"
          >
            Blog<span className="text-orange-500">Life</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden font-bold md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className={linkClass(link.href)}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={handleAuthClick}
              className="ml-4 bg-white text-orange-500 px-4 py-1 rounded-md font-semibold hover:bg-orange-100 transition duration-200"
            >
              {session ? 'Logout' : 'Login'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              {menuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href)}
                  className={`${linkClass(link.href)} text-left w-full`}
                >
                  {link.label}
                </button>
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
    </>
  )
}
