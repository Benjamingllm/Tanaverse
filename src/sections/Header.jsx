'use client'

import { useState, useEffect } from 'react'
import { navLinks } from '@/data/navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/95 backdrop-blur-sm border-b border-rule' : ''
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-baseline py-5"
        aria-label="Navigation principale"
      >
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight"
          aria-label="Tanaverse — retour en haut"
        >
          Tana<span className="text-accent">verse</span>
        </a>

        <ul className="hidden md:flex gap-8 list-none" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors duration-200 focus-visible:outline-none focus-visible:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="text-xs tracking-widest uppercase border-b border-ink hover:border-accent hover:text-accent transition-colors duration-200 pb-0.5 focus-visible:outline-none focus-visible:border-accent focus-visible:text-accent"
        >
          Demander l&apos;accès →
        </a>
      </nav>
    </header>
  )
}
