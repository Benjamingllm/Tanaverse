import { company } from '@/data/company'

export default function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto"
      aria-labelledby="about-title"
    >
      {/* Vision */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-24 border-b border-rule pb-24">
        <div>
          <span className="text-xs tracking-widest uppercase text-muted">
            À propos
          </span>
          <h2
            id="about-title"
            className="font-display font-bold text-4xl lg:text-5xl mt-4 leading-tight tracking-tight"
          >
            Notre{' '}
            <em className="text-accent not-italic">vision</em>
          </h2>
        </div>
        <div className="space-y-6">
          <p className="text-2xl font-display leading-snug">{company.vision}</p>
          <p className="text-muted leading-relaxed">{company.mission}</p>
        </div>
      </div>

      {/* Valeurs */}
      <div className="grid md:grid-cols-3 gap-px bg-rule border-x border-rule border-b">
        {company.values.map((value) => (
          <div key={value.title} className="bg-paper px-8 py-10">
            <span className="text-accent text-xs tracking-widest uppercase">
              {value.title}
            </span>
            <p className="mt-3 text-muted leading-relaxed text-sm">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
