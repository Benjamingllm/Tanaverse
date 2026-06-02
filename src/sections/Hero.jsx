import { company } from '@/data/company'
import { solutions } from '@/data/solutions'
import Button from '@/components/Button'

export default function Hero() {
  return (
    <section
      className="min-h-screen grid md:grid-cols-2 border-b border-rule"
      aria-label="Accroche principale"
    >
      {/* Colonne gauche */}
      <div className="flex flex-col justify-between px-6 lg:px-12 pt-32 pb-12 md:border-r border-rule">
        <span className="text-xs tracking-widest uppercase text-muted">
          Plateforme SaaS · 2025
        </span>

        <div>
          <h1 className="font-display font-bold text-6xl lg:text-8xl leading-none tracking-tight">
            Trois<br />
            outils.<br />
            <em className="text-accent not-italic">Un seul</em><br />
            univers.
          </h1>
          <p className="text-muted mt-8 max-w-sm leading-relaxed">
            {company.description}
          </p>
          <div className="mt-10">
            <Button href="#solutions">Découvrir nos solutions →</Button>
          </div>
        </div>

        <div className="hidden md:block" />
      </div>

      {/* Colonne droite */}
      <div className="flex flex-col justify-end px-6 lg:px-12 pb-12 pt-16 md:pt-0">
        <p className="text-xs tracking-widest uppercase text-muted mb-6">
          Nos solutions
        </p>
        {solutions.map((solution) => (
          <a
            key={solution.id}
            href="#solutions"
            className="flex justify-between items-baseline py-5 border-t border-rule last:border-b hover:text-accent transition-colors duration-200 group"
          >
            <span className="font-display text-2xl tracking-tight">
              <span className="text-accent">{solution.prefix}</span>
              {solution.suffix}
            </span>
            <span className="text-xs tracking-widest uppercase text-muted">
              {solution.sector}
            </span>
            <span
              className="text-accent opacity-0 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
