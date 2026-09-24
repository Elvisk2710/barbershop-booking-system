'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { href: '/services', label: 'Menu' },
  { href: '/gentlemen', label: 'Barbers' },
  { href: '/about', label: 'Story' },
  { href: '/visit', label: 'Visit' },
  { href: '/manage', label: 'Your booking' },
];

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-[-0.03em] leading-none ${className}`}>
      Gentleman’s
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-10 transition-[background-color,box-shadow] duration-500 ease-out ${
          open ? 'bg-paper' : 'material'
        } ${scrolled && !open ? 'shadow-[0_1px_0_rgba(0,0,0,0.08)]' : ''}`}
      >
        <nav
          className="shell-wide flex h-[var(--nav-h)] items-center justify-between"
          aria-label="Main"
        >
          <Link href="/" aria-label="Gentleman’s Grooming Bar, home" className="text-ink">
            <Wordmark className="text-[1.25rem]" />
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`t-fine transition-colors duration-200 ${
                      active ? 'text-ink' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {!pathname.startsWith('/book') && (
              <Link href="/book" id="nav-book-button" className="btn btn-ink btn-sm">
                Book
              </Link>
            )}
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="md:hidden relative -mr-2 h-11 w-11 grid place-items-center"
            >
              <span
                className={`absolute h-[1.5px] w-[18px] rounded-full bg-ink transition-transform duration-500 ease-out ${
                  open ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[18px] rounded-full bg-ink transition-transform duration-500 ease-out ${
                  open ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="md:hidden fixed inset-0 top-0 bg-paper pt-[var(--nav-h)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="shell pt-6 space-y-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {NAV_LINKS.map(link => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: -8 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    href={link.href}
                    className={`block py-2 t-headline ${
                      pathname === link.href ? 'text-ink' : 'text-ink/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
