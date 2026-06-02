import { company } from '@/data/company'
import { navLinks } from '@/data/navigation'

export default function Footer() {
  return (
    <footer className="border-t border-rule px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight"
          aria-label="Tanaverse — retour en haut de page"
        >
          Tana<span className="text-accent">verse</span>
        </a>

        <nav aria-label="Navigation pied de page">
          <ul className="flex flex-wrap gap-6 list-none" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-muted">{company.copyright}</p>
      </div>
    </footer>
  )
}
