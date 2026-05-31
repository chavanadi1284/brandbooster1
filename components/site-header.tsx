"use client";

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-[28px] px-4 py-3 md:px-6 relative z-50">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-lg font-semibold text-white shadow-glow">
            BB
          </div>
          <div>
            <p className="font-display text-2xl leading-none tracking-[0.18em] text-navy">BRANDBOOSTERS</p>
            <p className="font-groove text-[11px] uppercase tracking-[0.35em] text-black/80">We Build Brands. Not Just Ads.</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full bg-[rgba(255,255,255,0.34)] p-1 shadow-sm md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${active ? 'bg-navy text-white' : 'text-black/82 hover:bg-black/5 hover:text-navy'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 font-groove text-xs font-semibold uppercase tracking-[0.24em] text-dark transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,159,10,0.28)]"
          >
            <span>Book a Call</span>
            <span className="transition group-hover:translate-x-1">↗</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-glow md:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-20 z-40 overflow-hidden rounded-[32px] border border-black/[0.06] bg-[rgba(6,27,58,0.98)] p-6 text-white shadow-[0_40px_100px_rgba(0,0,0,0.35)] backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-2xl px-5 py-4 font-display text-3xl uppercase tracking-widest transition ${active ? 'bg-orange text-dark font-semibold' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 font-groove text-sm font-semibold uppercase tracking-[0.24em] text-dark shadow-[0_12px_30px_rgba(255,159,10,0.3)]"
                >
                  <span>Book a Call</span>
                  <span>↗</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}