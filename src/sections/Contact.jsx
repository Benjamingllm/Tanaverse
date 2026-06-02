'use client'

import { useState } from 'react'
import Button from '@/components/Button'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
        {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        }
      )

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-rule"
      aria-labelledby="contact-title"
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
        <div>
          <span className="text-xs tracking-widest uppercase text-muted">
            Contact
          </span>
          <h2
            id="contact-title"
            className="font-display font-bold text-4xl lg:text-5xl mt-4 tracking-tight leading-tight"
          >
            On vous{' '}
            <em className="text-accent not-italic">répond</em>
          </h2>
          <p className="text-muted mt-6 leading-relaxed">
            Une question, une demande de démo ou simplement envie d&apos;en
            savoir plus ?
            <br />
            Réponse sous 48h.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div>
            <label
              htmlFor="name"
              className="text-xs tracking-widest uppercase text-muted block mb-2"
            >
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-transparent border-b border-rule py-3 text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-xs tracking-widest uppercase text-muted block mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-transparent border-b border-rule py-3 text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-xs tracking-widest uppercase text-muted block mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full bg-transparent border-b border-rule py-3 text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors resize-none"
              placeholder="Votre message..."
            />
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer →'}
            </Button>
            {status === 'success' && (
              <p className="text-sm text-accent" role="status">
                Message envoyé. À bientôt !
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-700" role="alert">
                Une erreur est survenue. Réessayez.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
