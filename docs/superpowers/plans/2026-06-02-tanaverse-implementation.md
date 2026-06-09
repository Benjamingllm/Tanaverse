# Tanaverse — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le site vitrine one-page Tanaverse avec Next.js 14, React et Tailwind CSS, en suivant une architecture modulaire où tout le contenu est externalisé dans des fichiers de données.

**Architecture:** Single-page avec sections empilées et navigation par ancres. Les données (solutions, navigation, infos entreprise) vivent dans `src/data/`. Les composants génériques sont dans `src/components/`, les sections dans `src/sections/`. La page `src/app/page.jsx` assemble le tout.

**Tech Stack:** Next.js 14 (App Router, mode serveur), React 18, JavaScript ES2022, Tailwind CSS v3, Formspree, next/font (Playfair Display + DM Sans)

---

## Carte des fichiers

| Fichier | Responsabilité |
|---|---|
| `src/app/layout.jsx` | HTML racine, polices next/font, métadonnées SEO |
| `src/app/page.jsx` | Assemble les sections dans l'ordre du scroll |
| `src/app/globals.css` | Directives Tailwind, variables CSS couleurs |
| `tailwind.config.js` | Palette, familles de polices étendues |
| `src/data/company.js` | Nom, tagline, vision, mission, valeurs, whyUs, meta SEO |
| `src/data/navigation.js` | Liens du header |
| `src/data/solutions.js` | Les 3 solutions avec toutes leurs données |
| `src/components/Button.jsx` | Bouton réutilisable avec variantes (primary, outline, text) |
| `src/components/SolutionCard.jsx` | Carte d'une solution (reçoit un objet solution en prop) |
| `src/sections/Header.jsx` | Navigation sticky, effet au scroll |
| `src/sections/Hero.jsx` | Accroche principale + liste des solutions |
| `src/sections/About.jsx` | Vision, mission, 3 valeurs |
| `src/sections/Solutions.jsx` | Mappe solutions.js via SolutionCard |
| `src/sections/WhyUs.jsx` | 3 arguments différenciants depuis company.js |
| `src/sections/Contact.jsx` | Formulaire Formspree avec gestion des états |
| `src/sections/Footer.jsx` | Logo, liens, copyright |
| `.env.example` | Template variable d'environnement Formspree |
| `README.md` | Documentation complète du projet |
| `LEARNINGS.md` | Concepts appris au fil du projet |

---

## Task 1 : Initialisation du projet

**Files:**
- Create: tout le scaffolding Next.js dans `C:\Users\brax\Desktop\tanaverse\`

> **Concept pédagogique — `create-next-app` :** C'est le CLI officiel de Next.js. Il génère tout le boilerplate (structure de dossiers, config Tailwind, config TypeScript désactivée ici, ESLint). Comme `composer create-project` ou `rails new` — un point de départ propre et cohérent.

- [ ] **Étape 1 : Scaffolding Next.js**

Ouvre un terminal dans `C:\Users\brax\Desktop\tanaverse` et lance :

```bash
npx create-next-app@14 .
```

Réponds exactement comme suit aux questions :
```
✓ Would you like to use TypeScript? → No
✓ Would you like to use ESLint? → Yes
✓ Would you like to use Tailwind CSS? → Yes
✓ Would you like to use `src/` directory? → Yes
✓ Would you like to use App Router? → Yes
✓ Would you like to customize the default import alias (@/*)? → No
```

Si le CLI avertit que le dossier n'est pas vide, réponds Yes pour continuer.

Résultat attendu :
```
Success! Created tanaverse
```

- [ ] **Étape 2 : Vérifier l'installation**

```bash
npm run dev
```

Ouvre `http://localhost:3000`. Tu dois voir la page par défaut Next.js (fond noir, logo Next.js). Ctrl+C pour stopper.

- [ ] **Étape 3 : Initialiser Git**

```bash
git init
git add .gitignore package.json package-lock.json next.config.js tailwind.config.js postcss.config.js
git commit -m "chore: initialisation projet Next.js 14"
```

---

## Task 2 : Nettoyage du boilerplate

**Files:**
- Modify: `src/app/page.js` → renommer en `src/app/page.jsx`
- Modify: `src/app/globals.css`
- Delete: `src/app/page.js` (remplacé par page.jsx)
- Delete: contenu par défaut de `public/`

> **Concept pédagogique — boilerplate :** `create-next-app` génère du contenu de démonstration inutile (styles, images, texte). On nettoie avant de construire pour partir d'une base propre. Bonne pratique : ne jamais construire par-dessus du code qu'on ne comprend pas.

- [ ] **Étape 1 : Vider `src/app/page.js` et le renommer**

Supprime `src/app/page.js` et crée `src/app/page.jsx` avec ce contenu minimal :

```jsx
export default function HomePage() {
  return (
    <main>
      <p>Tanaverse — en construction</p>
    </main>
  )
}
```

- [ ] **Étape 2 : Nettoyer `src/app/globals.css`**

Remplace tout le contenu du fichier par :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Étape 3 : Nettoyer `src/app/layout.js`**

Remplace tout le contenu par :

```jsx
import './globals.css'

export const metadata = {
  title: 'Tanaverse',
  description: 'Plateforme SaaS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Étape 4 : Vérifier**

```bash
npm run dev
```

Ouvre `http://localhost:3000`. Tu dois voir "Tanaverse — en construction" sur fond blanc. Ctrl+C.

- [ ] **Étape 5 : Commit**

```bash
git add src/app/page.jsx src/app/globals.css src/app/layout.js
git rm src/app/page.js 2>/dev/null || true
git commit -m "chore: nettoyage boilerplate Next.js"
```

---

## Task 3 : Configuration Tailwind — palette et polices

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/app/globals.css`

> **Concept pédagogique — `theme.extend` dans Tailwind :** Au lieu de remplacer la config par défaut, `extend` ajoute par-dessus. `text-accent` devient une classe Tailwind réelle. `font-display` devient utilisable comme `font-sans`. On définit les variables CSS dans `globals.css` et on les référence dans Tailwind — deux couches complémentaires.

- [ ] **Étape 1 : Mettre à jour `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f0f0f',
        paper: '#f5f2ed',
        accent: '#c8a96e',
        muted: '#6b6760',
        rule: '#d9d5cf',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Étape 2 : Mettre à jour `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ink: #0f0f0f;
  --paper: #f5f2ed;
  --accent: #c8a96e;
  --muted: #6b6760;
  --rule: #d9d5cf;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #f5f2ed;
  color: #0f0f0f;
}
```

- [ ] **Étape 3 : Vérifier**

```bash
npm run dev
```

Dans `src/app/page.jsx`, modifie temporairement le `<p>` :
```jsx
<p className="text-accent font-display text-4xl">Test palette</p>
```
Le texte doit apparaître en doré avec une police serif. Remettre le contenu d'origine après vérification.

- [ ] **Étape 4 : Commit**

```bash
git add tailwind.config.js src/app/globals.css
git commit -m "style: configuration palette et typographie Tailwind"
```

---

## Task 4 : Données — `company.js` et `navigation.js`

**Files:**
- Create: `src/data/company.js`
- Create: `src/data/navigation.js`

> **Concept pédagogique — fichiers de données :** Ces fichiers exportent des objets JavaScript purs, sans JSX ni logique. C'est la "source de vérité" du projet. Changer le nom de l'entreprise dans `company.js` le met à jour partout automatiquement. Pattern fondamental : séparer les données de leur affichage.

- [ ] **Étape 1 : Créer `src/data/company.js`**

```js
export const company = {
  name: 'Tanaverse',
  tagline: 'Trois outils. Un seul univers.',
  description:
    'Tanaverse regroupe des solutions SaaS pensées pour les agriculteurs, les sportifs et les équipes RH. Simple, précis, efficace.',
  vision:
    'Simplifier le quotidien des professionnels par des outils pensés pour leur terrain.',
  mission:
    'Outiller trois secteurs clés — agriculture, sport et RH — avec des SaaS spécialisés, simples et efficaces.',
  values: [
    {
      title: 'Simplicité',
      description:
        'Des interfaces pensées pour être prises en main sans formation ni documentation.',
    },
    {
      title: 'Précision',
      description:
        'Des données fiables et actionnables pour prendre les bonnes décisions au bon moment.',
    },
    {
      title: 'Terrain',
      description:
        'Conçu avec et pour les professionnels du terrain, pas pour des utilisateurs abstraits.',
    },
  ],
  whyUs: [
    {
      title: 'Pensé pour le terrain',
      description:
        "Chaque interface est conçue avec les utilisateurs finaux. Nos outils s'adaptent aux contraintes réelles du quotidien professionnel.",
    },
    {
      title: 'Données en temps réel',
      description:
        "Des tableaux de bord actionnables pour prendre les bonnes décisions au bon moment, sans noyer l'essentiel dans le superflu.",
    },
    {
      title: 'Interface sans formation',
      description:
        "Prise en main immédiate, sans formation ni documentation. Si ça nécessite une explication, on a raté quelque chose.",
    },
  ],
  meta: {
    title: 'Tanaverse — Plateforme SaaS',
    description:
      'Tanaverse simplifie le quotidien des professionnels avec trois solutions SaaS : Tanasoil, Tanafit et Tanasync.',
    ogImage: '/og-image.png',
  },
  copyright: '© 2025 Tanaverse. Tous droits réservés.',
}
```

- [ ] **Étape 2 : Créer `src/data/navigation.js`**

```js
export const navLinks = [
  { label: 'À propos', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pourquoi nous', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]
```

- [ ] **Étape 3 : Commit**

```bash
git add src/data/company.js src/data/navigation.js
git commit -m "feat: données entreprise et navigation"
```

---

## Task 5 : Données — `solutions.js`

**Files:**
- Create: `src/data/solutions.js`

> **Concept pédagogique — tableaux d'objets :** `solutions` est un tableau de 3 objets avec la même "forme" (mêmes clés). Le composant `SolutionCard` pourra recevoir n'importe quel objet de ce tableau et l'afficher. C'est le pattern de "données génériques + composant générique" qui rend le site facilement extensible.

- [ ] **Étape 1 : Créer `src/data/solutions.js`**

```js
export const solutions = [
  {
    id: 'tanasoil',
    name: 'Tanasoil',
    prefix: 'Tana',
    suffix: 'soil',
    sector: 'Agriculture',
    tagline: 'Le terrain dans votre poche.',
    description:
      'Tanasoil centralise la gestion de vos parcelles agricoles : suivi des cultures, alertes météo personnalisées et historique des récoltes en un seul tableau de bord.',
    target: 'Agriculteurs et exploitants agricoles',
    features: [
      'Suivi des parcelles en temps réel',
      'Alertes météo géolocalisées',
      'Historique et rapports de récoltes',
      "Planification des interventions",
    ],
  },
  {
    id: 'tanafit',
    name: 'Tanafit',
    prefix: 'Tana',
    suffix: 'fit',
    sector: 'Sport & santé',
    tagline: 'Progressez avec les données.',
    description:
      "Tanafit accompagne sportifs et coachs dans le suivi des entraînements, la nutrition et la définition d'objectifs mesurables.",
    target: 'Sportifs amateurs et professionnels, coachs',
    features: [
      "Suivi des séances d'entraînement",
      'Gestion nutrition et macros',
      "Définition et suivi d'objectifs",
      'Tableau de bord de progression',
    ],
  },
  {
    id: 'tanasync',
    name: 'Tanasync',
    prefix: 'Tana',
    suffix: 'sync',
    sector: 'Ressources humaines',
    tagline: 'Synchronisez vos équipes.',
    description:
      'Tanasync simplifie la gestion RH au quotidien : congés, onboarding des nouveaux collaborateurs et suivi de la performance des équipes.',
    target: 'Équipes RH, managers, PME',
    features: [
      'Gestion des congés et absences',
      "Processus d'onboarding guidé",
      'Suivi de la performance',
      'Tableaux de bord RH',
    ],
  },
]
```

- [ ] **Étape 2 : Commit**

```bash
git add src/data/solutions.js
git commit -m "feat: données des trois solutions Tanaverse"
```

---

## Task 6 : Polices et SEO — `layout.jsx`

**Files:**
- Modify: `src/app/layout.js` → renommer en `layout.jsx`

> **Concept pédagogique — `next/font` :** Au lieu de charger les polices depuis Google Fonts CDN (une requête HTTP externe à chaque visite), `next/font` télécharge les fichiers de polices au moment du build et les sert directement depuis ton serveur. Résultat : zéro requête externe, meilleure performance, meilleure confidentialité utilisateur. Les polices sont injectées comme variables CSS (`--font-playfair`) et référencées dans Tailwind.

- [ ] **Étape 1 : Mettre à jour `src/app/layout.js`**

Supprime `src/app/layout.js` et crée `src/app/layout.jsx` avec :

```jsx
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { company } from '@/data/company'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata = {
  title: company.meta.title,
  description: company.meta.description,
  openGraph: {
    title: company.meta.title,
    description: company.meta.description,
    images: [company.meta.ogImage],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Étape 2 : Vérifier**

```bash
npm run dev
```

Ouvre `http://localhost:3000`. Dans les DevTools (F12 → onglet Network), tu ne dois voir aucune requête vers `fonts.googleapis.com`. Les polices sont servies localement.

- [ ] **Étape 3 : Commit**

```bash
git add src/app/layout.jsx
git rm src/app/layout.js 2>/dev/null || true
git commit -m "feat: polices next/font et métadonnées SEO"
```

---

## Task 7 : Composant `Button`

**Files:**
- Create: `src/components/Button.jsx`

> **Concept pédagogique — composant générique avec variantes :** Button ne sait pas où il est utilisé. Il reçoit des props (`variant`, `href`, `children`) et adapte son rendu. Le spread `...props` permet de passer `type="submit"`, `disabled`, `onClick` etc. sans les lister explicitement. C'est le principe d'un composant "boîte noire" avec une interface claire.

- [ ] **Étape 1 : Créer `src/components/Button.jsx`**

```jsx
export default function Button({ children, variant = 'primary', href, ...props }) {
  const base =
    'inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-colors duration-200 cursor-pointer disabled:opacity-50'

  const variants = {
    primary: 'bg-ink text-paper px-6 py-3 hover:bg-accent',
    outline: 'border border-ink text-ink px-6 py-3 hover:border-accent hover:text-accent',
    text: 'border-b border-ink pb-0.5 hover:border-accent hover:text-accent',
  }

  const classes = `${base} ${variants[variant]}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
```

- [ ] **Étape 2 : Test visuel rapide**

Dans `src/app/page.jsx`, importe et teste le composant :

```jsx
import Button from '@/components/Button'

export default function HomePage() {
  return (
    <main className="p-12 flex flex-col gap-4">
      <Button href="#">Primary →</Button>
      <Button variant="outline" href="#">Outline →</Button>
      <Button variant="text" href="#">Text →</Button>
    </main>
  )
}
```

Lance `npm run dev`. Tu dois voir 3 boutons : fond noir, bordure, et texte souligné. Hover sur chacun pour vérifier la transition vers l'accent doré.

Remets le contenu original de `page.jsx` après :
```jsx
export default function HomePage() {
  return <main><p>Tanaverse — en construction</p></main>
}
```

- [ ] **Étape 3 : Commit**

```bash
git add src/components/Button.jsx
git commit -m "feat: composant Button avec variantes primary/outline/text"
```

---

## Task 8 : Composant `SolutionCard`

**Files:**
- Create: `src/components/SolutionCard.jsx`

> **Concept pédagogique — props et déstructuration :** `SolutionCard` reçoit un objet `solution` (qui correspond exactement à la forme définie dans `solutions.js`) et un `index` numérique. La déstructuration `{ solution, index }` extrait ces deux valeurs. Le composant ne connaît pas les données — il sait juste comment les afficher.

- [ ] **Étape 1 : Créer `src/components/SolutionCard.jsx`**

```jsx
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
```

- [ ] **Étape 2 : Test visuel rapide**

Dans `src/app/page.jsx` :

```jsx
import SolutionCard from '@/components/SolutionCard'
import { solutions } from '@/data/solutions'

export default function HomePage() {
  return (
    <main className="px-12 py-16">
      <SolutionCard solution={solutions[0]} index={0} />
    </main>
  )
}
```

Lance `npm run dev`. Tu dois voir la carte Tanasoil avec le numéro "01 /", le nom "Tanasoil" (préfixe doré), la description et les fonctionnalités. Remets le contenu original après.

- [ ] **Étape 3 : Commit**

```bash
git add src/components/SolutionCard.jsx
git commit -m "feat: composant SolutionCard"
```

---

## Task 9 : Section `Header`

**Files:**
- Create: `src/sections/Header.jsx`

> **Concept pédagogique — `'use client'` et hooks React :** Par défaut dans Next.js App Router, tous les composants sont des **Server Components** (rendus côté serveur, pas de JavaScript interactif). Pour utiliser `useState` ou `useEffect` (qui nécessitent le navigateur), on déclare `'use client'` en tête de fichier. Ici, on écoute le scroll avec `useEffect` et `addEventListener`, et on nettoie proprement avec le `return () => removeEventListener` (évite les fuites mémoire).

- [ ] **Étape 1 : Créer `src/sections/Header.jsx`**

```jsx
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
                className="text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="text-xs tracking-widest uppercase border-b border-ink hover:border-accent hover:text-accent transition-colors duration-200 pb-0.5"
        >
          Demander l'accès →
        </a>
      </nav>
    </header>
  )
}
```

- [ ] **Étape 2 : Test visuel**

Dans `src/app/page.jsx` :

```jsx
import Header from '@/sections/Header'

export default function HomePage() {
  return (
    <main>
      <Header />
      <div className="h-[200vh] pt-24 px-12">
        <p>Scrolle pour voir le header changer d'état</p>
      </div>
    </main>
  )
}
```

Lance `npm run dev`. Le header doit être transparent au sommet et prendre un fond crème semi-transparent + bordure basse quand tu scrolles. Remets le contenu original après.

- [ ] **Étape 3 : Commit**

```bash
git add src/sections/Header.jsx
git commit -m "feat: section Header sticky avec effet au scroll"
```

---

## Task 10 : Section `Hero`

**Files:**
- Create: `src/sections/Hero.jsx`

> **Concept pédagogique — `grid` Tailwind et responsive :** `grid md:grid-cols-2` crée une colonne sur mobile, deux colonnes à partir de `md` (768px). C'est le mobile-first de Tailwind : on définit le style mobile par défaut, puis on surcharge à partir des breakpoints. `min-h-screen` garantit que le Hero prend toute la hauteur de l'écran.

- [ ] **Étape 1 : Créer `src/sections/Hero.jsx`**

```jsx
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
```

- [ ] **Étape 2 : Test visuel**

Dans `src/app/page.jsx` :

```jsx
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
    </main>
  )
}
```

Lance `npm run dev`. Vérifie :
- Le hero prend toute la hauteur de l'écran
- Sur desktop : deux colonnes avec la ligne verticale séparatrice
- Sur mobile (redimensionne la fenêtre) : une seule colonne
- Hover sur les lignes solutions → apparition de la flèche ↗

- [ ] **Étape 3 : Commit**

```bash
git add src/sections/Hero.jsx src/app/page.jsx
git commit -m "feat: section Hero avec grille éditoriale"
```

---

## Task 11 : Section `About`

**Files:**
- Create: `src/sections/About.jsx`

> **Concept pédagogique — `Array.map()` en JSX :** `company.values.map((value) => ...)` transforme chaque objet du tableau en élément React. La prop `key` est obligatoire — elle permet à React d'identifier chaque élément pour ses optimisations internes. Si tu l'oublies, React affiche un avertissement dans la console.

- [ ] **Étape 1 : Créer `src/sections/About.jsx`**

```jsx
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
```

- [ ] **Étape 2 : Ajouter About à `page.jsx` et vérifier**

```jsx
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import About from '@/sections/About'

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
    </main>
  )
}
```

Lance `npm run dev`. Le clic sur "À propos" dans le Header doit scroller jusqu'à la section. Vérifie que les 3 valeurs s'affichent en grille.

- [ ] **Étape 3 : Commit**

```bash
git add src/sections/About.jsx src/app/page.jsx
git commit -m "feat: section About avec vision, mission et valeurs"
```

---

## Task 12 : Section `Solutions`

**Files:**
- Create: `src/sections/Solutions.jsx`

- [ ] **Étape 1 : Créer `src/sections/Solutions.jsx`**

```jsx
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
```

- [ ] **Étape 2 : Ajouter Solutions à `page.jsx` et vérifier**

```jsx
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Solutions from '@/sections/Solutions'

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Solutions />
    </main>
  )
}
```

Lance `npm run dev`. Tu dois voir les 3 cartes solutions empilées, chacune avec son numéro, son nom (préfixe doré), sa description et ses fonctionnalités.

- [ ] **Étape 3 : Commit**

```bash
git add src/sections/Solutions.jsx src/app/page.jsx
git commit -m "feat: section Solutions avec les trois cartes"
```

---

## Task 13 : Section `WhyUs`

**Files:**
- Create: `src/sections/WhyUs.jsx`

- [ ] **Étape 1 : Créer `src/sections/WhyUs.jsx`**

```jsx
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
```

- [ ] **Étape 2 : Ajouter WhyUs à `page.jsx` et vérifier**

```jsx
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Solutions from '@/sections/Solutions'
import WhyUs from '@/sections/WhyUs'

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Solutions />
      <WhyUs />
    </main>
  )
}
```

Lance `npm run dev`. Vérifie les 3 blocs avec les numéros géants en fond.

- [ ] **Étape 3 : Commit**

```bash
git add src/sections/WhyUs.jsx src/app/page.jsx
git commit -m "feat: section WhyUs avec les trois arguments"
```

---

## Task 14 : Section `Contact` (Formspree)

**Files:**
- Create: `src/sections/Contact.jsx`
- Create: `.env.example`

> **Concept pédagogique — variables d'environnement `NEXT_PUBLIC_` :** Next.js expose au navigateur uniquement les variables préfixées `NEXT_PUBLIC_`. Les autres restent côté serveur uniquement. Ici, `NEXT_PUBLIC_FORMSPREE_ID` doit être accessible dans le JavaScript du navigateur (pour l'appel `fetch`), donc le préfixe est obligatoire. On ne commit jamais `.env.local` (il contient la vraie valeur) — uniquement `.env.example` (le template vide).

> **Concept pédagogique — gestion des états de formulaire :** Le formulaire a 4 états : `idle` (repos), `sending` (envoi en cours), `success` (envoyé), `error` (échec). `useState` gère ces transitions. C'est un pattern classique pour tout formulaire React.

- [ ] **Étape 1 : Créer `.env.example`**

```
# Crée un compte sur https://formspree.io, crée un formulaire,
# copie l'ID (ex: xpznrjkw) et colle-le ci-dessous dans un fichier .env.local
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id_here
```

- [ ] **Étape 2 : Créer `.env.local`**

```
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id_here
```

(Remplace `your_formspree_form_id_here` par ton vrai ID Formspree quand tu en auras un — pour l'instant laisse le placeholder, le formulaire ne soumettra pas mais s'affichera correctement.)

- [ ] **Étape 3 : Créer `src/sections/Contact.jsx`**

```jsx
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
            Une question, une demande de démo ou simplement envie d'en
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
```

- [ ] **Étape 4 : Ajouter Contact à `page.jsx` et vérifier**

```jsx
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Solutions from '@/sections/Solutions'
import WhyUs from '@/sections/WhyUs'
import Contact from '@/sections/Contact'

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Solutions />
      <WhyUs />
      <Contact />
    </main>
  )
}
```

Lance `npm run dev`. Vérifie que le formulaire s'affiche avec les 3 champs. Essaie de soumettre — sans vrai ID Formspree, le bouton sera désactivé pendant l'envoi puis affichera "Une erreur est survenue."

- [ ] **Étape 5 : Commit**

```bash
git add src/sections/Contact.jsx .env.example
git commit -m "feat: section Contact avec formulaire Formspree"
```

---

## Task 15 : Section `Footer`

**Files:**
- Create: `src/sections/Footer.jsx`

- [ ] **Étape 1 : Créer `src/sections/Footer.jsx`**

```jsx
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
```

- [ ] **Étape 2 : Commit**

```bash
git add src/sections/Footer.jsx
git commit -m "feat: section Footer"
```

---

## Task 16 : Assemblage final — `page.jsx`

**Files:**
- Modify: `src/app/page.jsx`

- [ ] **Étape 1 : Finaliser `src/app/page.jsx`**

```jsx
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Solutions from '@/sections/Solutions'
import WhyUs from '@/sections/WhyUs'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Solutions />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Étape 2 : Vérification complète**

```bash
npm run dev
```

Checklist à vérifier dans le navigateur :
- [ ] Header sticky visible, transparent puis fond crème au scroll
- [ ] Clic sur chaque lien du header → scroll vers la bonne section
- [ ] Hero : deux colonnes desktop, une colonne mobile
- [ ] About : vision + 3 valeurs en grille
- [ ] Solutions : 3 cartes empilées avec numéros
- [ ] WhyUs : 3 blocs avec numéros géants
- [ ] Contact : formulaire avec 3 champs
- [ ] Footer : logo + liens + copyright
- [ ] Responsive : redimensionne la fenêtre à 375px de large, tout doit rester lisible

- [ ] **Étape 3 : Build de production**

```bash
npm run build
```

Résultat attendu : `✓ Compiled successfully`. Zéro erreur. Si des warnings apparaissent, les lire et corriger.

- [ ] **Étape 4 : Commit**

```bash
git add src/app/page.jsx
git commit -m "feat: assemblage final de la page"
```

---

## Task 17 : Documentation — `README.md` et `LEARNINGS.md`

**Files:**
- Create: `README.md`
- Create: `LEARNINGS.md`

- [ ] **Étape 1 : Créer `README.md`**

```markdown
# Tanaverse

Site vitrine one-page pour Tanaverse, startup fictive regroupant trois solutions SaaS.

## Stack

| Outil | Version | Justification |
|---|---|---|
| Next.js | 14 | Framework React standard industrie, App Router, mode serveur Node.js |
| React | 18 | Composants réutilisables, très demandé en entreprise |
| Tailwind CSS | 3 | Classes utilitaires, responsive intégré, pas de CSS custom file |
| JavaScript | ES2022 | Pas de TypeScript — focus sur l'architecture |
| Formspree | — | Backend formulaire clé en main, zéro serveur |
| next/font | — | Polices Google chargées localement (pas de CDN externe) |

## Arborescence

\`\`\`
src/
├── app/
│   ├── layout.jsx     # HTML racine, polices, métas SEO
│   ├── page.jsx       # Assemble toutes les sections
│   └── globals.css    # Directives Tailwind + variables CSS
├── components/
│   ├── Button.jsx     # Bouton réutilisable (primary, outline, text)
│   └── SolutionCard.jsx # Carte d'une solution
├── sections/
│   ├── Header.jsx     # Navigation sticky
│   ├── Hero.jsx       # Accroche principale
│   ├── About.jsx      # Vision, mission, valeurs
│   ├── Solutions.jsx  # Les 3 solutions
│   ├── WhyUs.jsx      # Arguments différenciants
│   ├── Contact.jsx    # Formulaire Formspree
│   └── Footer.jsx     # Pied de page
└── data/
    ├── company.js     # Infos entreprise, valeurs, meta SEO
    ├── navigation.js  # Liens du header
    └── solutions.js   # Les 3 solutions
\`\`\`

## Commandes

\`\`\`bash
npm run dev      # Lancer le serveur de développement (http://localhost:3000)
npm run build    # Build de production
npm start        # Lancer le serveur de production (après build)
npm run lint     # Vérifier le code avec ESLint
\`\`\`

## Ajouter une nouvelle solution

1. Ouvrir `src/data/solutions.js`
2. Ajouter un objet avec les mêmes clés que les solutions existantes :
   `id`, `name`, `prefix`, `suffix`, `sector`, `tagline`, `description`, `target`, `features`
3. La carte apparaît automatiquement dans la section Solutions

## Ajouter une nouvelle section

1. Créer `src/sections/MaSection.jsx`
2. Ajouter un `id` sur la balise `<section>` pour la navigation
3. Ajouter le lien dans `src/data/navigation.js`
4. Importer et placer la section dans `src/app/page.jsx`

## Configurer Formspree

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Copier l'ID du formulaire (ex: `xpznrjkw`)
4. Copier `.env.example` en `.env.local`
5. Remplacer `your_formspree_form_id_here` par ton ID

## Conventions Git

| Préfixe | Usage |
|---|---|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `style:` | Changement visuel sans logique |
| `refactor:` | Restructuration sans changement fonctionnel |
| `docs:` | README, LEARNINGS |
| `chore:` | Config, dépendances |
```

- [ ] **Étape 2 : Créer `LEARNINGS.md`**

```markdown
# Learnings — Tanaverse

Concepts appris et consolidés au fil du projet.

## Next.js

- **App Router vs Pages Router** : Next.js 14 utilise l'App Router (dossier `src/app/`). Chaque dossier est une route. `layout.jsx` définit l'enveloppe HTML commune à toutes les pages.
- **Server Components par défaut** : Tous les composants sont rendus côté serveur sauf mention contraire. Avantage : pas de JavaScript envoyé au navigateur pour le contenu statique.
- **`'use client'`** : Directive qui transforme un composant en Client Component. Obligatoire pour `useState`, `useEffect`, et tous les événements navigateur.
- **`next/font`** : Charge les polices Google en local au moment du build. Zéro requête CDN en production.
- **`export const metadata`** : Exporte les métas SEO depuis `layout.jsx` — Next.js les injecte automatiquement dans le `<head>`.

## React

- **Composants** : Fonctions JavaScript qui retournent du JSX. Nom en PascalCase obligatoire.
- **Props** : Données passées du parent à l'enfant. Sens unique (parent → enfant).
- **`useState`** : Hook pour stocker un état local dans un composant. Déclenche un re-render à chaque changement.
- **`useEffect`** : Hook pour les effets de bord (écouter des événements, appels API). Le `return` nettoie l'effet quand le composant est démonté.
- **`key` dans les listes** : Obligatoire quand on rend une liste avec `.map()`. Permet à React d'identifier chaque élément.

## Tailwind CSS

- **Mobile-first** : On définit le style mobile par défaut, puis on surcharge avec `md:`, `lg:`, etc.
- **Classes utilitaires** : Chaque classe fait une seule chose (`text-sm`, `mt-4`, `border-b`). Pas de CSS custom, tout dans les classes.
- **`theme.extend`** : Étend la config par défaut sans l'écraser. On peut utiliser `text-accent`, `font-display`, etc. comme des classes natives Tailwind.
- **Variables CSS + Tailwind** : On peut définir des variables CSS dans `globals.css` et les référencer dans `tailwind.config.js` avec `var(--nom)`.
- **`gap-px bg-rule`** : Pattern pour créer une grille avec des séparateurs d'1px : fond de grille = couleur du séparateur, cases = fond du body. Les "espaces" sont en réalité le fond de la grille qui transparaît.

## Architecture

- **Séparation données / affichage** : Les fichiers `src/data/` contiennent uniquement des objets JS. Les composants affichent ces données sans les connaître en dur.
- **Composants atomiques** : `Button` et `SolutionCard` ne savent pas où ils sont utilisés. Ils reçoivent des props et affichent.
- **Spread props `...props`** : Passe tous les props non nommés au composant natif. Permet à `Button` d'accepter `type`, `disabled`, `onClick` etc. sans les lister.

## Variables d'environnement

- **`.env.local`** : Fichier local non commité (dans `.gitignore`). Contient les vraies valeurs secrètes.
- **`.env.example`** : Template commité. Montre les variables nécessaires sans leurs valeurs.
- **`NEXT_PUBLIC_`** : Préfixe obligatoire pour exposer une variable au navigateur. Sans ce préfixe, la variable reste côté serveur uniquement.
```

- [ ] **Étape 3 : Commit final**

```bash
git add README.md LEARNINGS.md
git commit -m "docs: README et LEARNINGS initiaux"
```

---

## Récapitulatif des commits attendus

```
chore: initialisation projet Next.js 14
chore: nettoyage boilerplate Next.js
style: configuration palette et typographie Tailwind
feat: données entreprise et navigation
feat: données des trois solutions Tanaverse
feat: polices next/font et métadonnées SEO
feat: composant Button avec variantes primary/outline/text
feat: composant SolutionCard
feat: section Header sticky avec effet au scroll
feat: section Hero avec grille éditoriale
feat: section About avec vision, mission et valeurs
feat: section Solutions avec les trois cartes
feat: section WhyUs avec les trois arguments
feat: section Contact avec formulaire Formspree
feat: section Footer
feat: assemblage final de la page
docs: README et LEARNINGS initiaux
```
