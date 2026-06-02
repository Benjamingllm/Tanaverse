export default function SolutionCard({ solution, index }) {
  return (
    <article className="border-t border-rule pt-8 pb-12 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
      <div>
        <span className="text-xs tracking-widest uppercase text-muted">
          0{index + 1} /
        </span>
        <h3 className="font-display font-bold text-4xl lg:text-5xl mt-3 leading-none tracking-tight">
          <span className="text-accent">{solution.prefix}</span>
          {solution.suffix}
        </h3>
        <p className="text-xs tracking-widest uppercase text-muted mt-3">
          {solution.sector}
        </p>
        <p className="text-muted mt-4 text-sm italic font-display leading-relaxed">
          {solution.tagline}
        </p>
      </div>

      <div>
        <p className="text-muted leading-relaxed">{solution.description}</p>

        <p className="text-xs tracking-widest uppercase text-muted mt-8 mb-4">
          Fonctionnalités
        </p>
        <ul className="space-y-3" role="list">
          {solution.features.map((feature) => (
            <li key={feature} className="flex items-baseline gap-3 text-sm">
              <span className="text-accent flex-shrink-0" aria-hidden="true">
                —
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <p className="text-xs tracking-widest uppercase text-muted mt-8">
          Pour :{' '}
          <span className="text-ink normal-case tracking-normal font-normal">
            {solution.target}
          </span>
        </p>
      </div>
    </article>
  )
}
