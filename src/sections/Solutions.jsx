import { solutions } from '@/data/solutions'
import SolutionCard from '@/components/SolutionCard'

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto"
      aria-labelledby="solutions-title"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-16 border-b border-rule pb-6 gap-4">
        <span className="text-xs tracking-widest uppercase text-muted">
          Nos solutions
        </span>
        <h2
          id="solutions-title"
          className="font-display font-bold text-4xl lg:text-5xl tracking-tight"
        >
          Trois <em className="text-accent not-italic">outils</em>
        </h2>
      </div>

      <div>
        {solutions.map((solution, index) => (
          <SolutionCard key={solution.id} solution={solution} index={index} />
        ))}
      </div>
    </section>
  )
}
