import { company } from '@/data/company'

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto"
      aria-labelledby="whyus-title"
    >
      <div className="mb-16 border-b border-rule pb-6">
        <span className="text-xs tracking-widest uppercase text-muted">
          Pourquoi nous
        </span>
        <h2
          id="whyus-title"
          className="font-display font-bold text-4xl lg:text-5xl mt-4 tracking-tight"
        >
          Ce qui nous{' '}
          <em className="text-accent not-italic">distingue</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
        {company.whyUs.map((reason, i) => (
          <div key={reason.title} className="bg-paper px-8 py-12">
            <span
              className="font-display text-6xl text-rule select-none"
              aria-hidden="true"
            >
              0{i + 1}
            </span>
            <h3 className="font-display font-bold text-xl mt-4 tracking-tight">
              {reason.title}
            </h3>
            <p className="text-muted mt-3 leading-relaxed text-sm">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
