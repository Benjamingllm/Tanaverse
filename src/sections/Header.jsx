'use client'

import { useState, useEffect } from 'react'
import { navLinks } from '@/data/navigation'
import { Menu, X } from 'lucide-react'
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const [isOpen, setIsOpen] = useState(false)
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/95 backdrop-blur-sm border-b border-rule' : ''
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center py-5"
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

        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors duration-200 focus-visible:outline-none focus-visible:text-ink"
            aria-label={isDark ? 'Activer le thème clair' : 'Activer le thème sombre'}
          >
            {isDark ? 'Clair' : 'Sombre'}
          </button>
          <a
            href="#contact"
            className="hidden md:block text-xs tracking-widest uppercase border-b border-ink hover:border-accent hover:text-accent transition-colors duration-200 pb-0.5 focus-visible:outline-none focus-visible:border-accent focus-visible:text-accent"
          >
            Demander l&apos;accès →
          </a>
          <button
            type="button"
            className="md:hidden text-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-paper border-t border-rule">
          <ul className="flex flex-col list-none" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-4 text-xs tracking-widest uppercase text-muted hover:text-ink border-b border-rule transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 text-xs tracking-widest uppercase text-accent border-b border-rule"
              >
                Demander l&apos;accès →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
