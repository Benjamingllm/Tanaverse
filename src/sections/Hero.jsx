import { company } from '@/data/company'
import { solutions } from '@/data/solutions'
import Button from '@/components/Button'

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center border-b border-rule px-6 lg:px-12"
      aria-label="Accroche principale"
    >
      {/* Contenu centré */}
      <div className="w-full max-w-3xl text-center pt-32 pb-16">
        <span className="text-xs tracking-widest uppercase text-muted">
          Plateforme SaaS · 2025
        </span>
        <h1 className="font-display font-bold text-6xl lg:text-8xl leading-none tracking-tight mt-6">
          Trois outils.<br />
          <em className="text-accent not-italic">Un seul</em> univers.
        </h1>
        <p className="text-muted mt-8 max-w-md mx-auto leading-relaxed">
          {company.description}
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="#solutions">Découvrir nos solutions →</Button>
        </div>
      </div>

      {/* Solutions en rangée */}
      <div className="w-full max-w-3xl pb-16">
        <p className="text-xs tracking-widest uppercase text-muted mb-6 text-center">
          Nos solutions
        </p>
        <div className="grid grid-cols-3 border border-rule">
          {solutions.map((solution) => (
            <a
              key={solution.id}
              href="#solutions"
              className="flex flex-col items-center gap-1 py-6 px-4 border-r border-rule last:border-r-0 hover:text-accent transition-colors duration-200 group"
            >
              <span className="font-display text-xl tracking-tight">
                <span className="text-accent">{solution.prefix}</span>
                {solution.suffix}
              </span>
              <span className="text-xs tracking-widest uppercase text-muted">
                {solution.sector}
              </span>
              <span
                className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-xs mt-1"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
