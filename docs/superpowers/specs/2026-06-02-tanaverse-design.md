# Tanaverse — Design Spec
**Date :** 2026-06-02  
**Statut :** Approuvé

---

## 1. Contexte

Site vitrine one-page pour **Tanaverse**, startup fictive regroupant trois solutions SaaS :
- **Tanasoil** — Agriculture
- **Tanafit** — Sport & santé
- **Tanasync** — Ressources humaines

**Contexte apprentissage :** fin 1ère année bachelor informatique. Objectif prioritaire : comprendre chaque ligne de code et apprendre les bonnes pratiques d'architecture frontend.

---

## 2. Audience cible

Simulation d'un "vrai" site startup — comme si Tanaverse était une entreprise réelle. Le site doit convaincre des utilisateurs fictifs de chaque solution (agriculteurs, sportifs, équipes RH) tout en servant de vitrine professionnelle.

---

## 3. Stack technique

| Outil | Version | Rôle | Justification |
|---|---|---|---|
| Next.js | 14 | Framework React | Standard industrie, App Router, SSR, déploiement Node.js |
| React | 18 | UI composants | Modèle de composants réutilisables, très demandé en entreprise |
| Tailwind CSS | 3 | Styles utilitaires | Responsive intégré, standard marché, pas de CSS custom file |
| JavaScript | ES2022 | Logique | Pas de TypeScript — focus sur l'architecture, pas les types |
| Formspree | — | Formulaire contact | Backend clé en main, zéro serveur custom |

**Mode déploiement :** mode serveur Node.js (pas d'export statique) — représentatif des déploiements Next.js en entreprise. Déploiement futur : VPS Ubuntu + Nginx + PM2.

---

## 4. Architecture

### Principe central
Le site est une **single-page** avec sections empilées et ancres de navigation. Next.js App Router avec une seule route (`/`).

### Flux de données
```
src/data/solutions.js     ← source de vérité unique
       ↓
src/components/SolutionCard.jsx   ← composant générique (props)
       ↓
src/sections/Solutions.jsx        ← section qui mappe les données
       ↓
src/app/page.jsx                  ← page unique qui assemble tout
```

### Règles d'organisation
- `components/` = briques génériques sans contexte métier
- `sections/` = sections qui connaissent leur contexte, lisent depuis `data/`
- `data/` = uniquement des objets JS exportés, jamais de JSX ni de logique
- Tout contenu modifiable vit dans `data/`, jamais en dur dans les composants

---

## 5. Structure des fichiers

```
tanaverse/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.jsx          ← <html>, <head>, métas SEO globaux
│   │   ├── page.jsx            ← Assemble toutes les sections dans l'ordre
│   │   └── globals.css         ← Reset + directives Tailwind
│   │
│   ├── components/
│   │   ├── Button.jsx          ← Variantes : primary, outline
│   │   └── SolutionCard.jsx    ← Carte solution générique (props)
│   │
│   ├── sections/
│   │   ├── Header.jsx          ← Navigation sticky + ancres
│   │   ├── Hero.jsx            ← Accroche principale
│   │   ├── About.jsx           ← Vision, mission, valeurs
│   │   ├── Solutions.jsx       ← Mappe solutions.js via SolutionCard
│   │   ├── WhyUs.jsx           ← Arguments différenciants
│   │   ├── Contact.jsx         ← Formulaire Formspree
│   │   └── Footer.jsx          ← Liens, copyright
│   │
│   └── data/
│       ├── solutions.js        ← Les 3 solutions et leurs données
│       ├── navigation.js       ← Liens du header
│       └── company.js          ← Nom, tagline, valeurs, métas SEO
│
├── .env.example                ← FORMSPREE_ID=your_id_here
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── README.md
└── LEARNINGS.md
```

---

## 6. Sections & contenu

### Header
- Logo "Tanaverse" (Playfair Display)
- Liens de navigation : À propos, Solutions, Pourquoi nous, Contact
- Navigation par ancres avec scroll fluide
- Sticky au scroll

### Hero
- Accroche : "Trois outils. Un seul univers."
- Sous-titre : présentation courte de Tanaverse
- CTA primaire : "Découvrir nos solutions" → scroll vers #solutions
- Liste des 3 solutions en bas (style éditorial, lignes fines)

### À propos (`#about`)
- Vision : "Simplifier le quotidien des professionnels par des outils pensés pour leur terrain."
- Mission : outiller agriculture, sport et RH avec des SaaS spécialisés
- 3 valeurs : Simplicité, Précision, Terrain

### Solutions (`#solutions`)
Données externalisées dans `solutions.js` :

| Solution | Secteur | Cible | Fonctionnalités clés |
|---|---|---|---|
| Tanasoil | Agriculture | Agriculteurs, exploitants | Suivi parcelles, alertes météo, historique récoltes |
| Tanafit | Sport & santé | Sportifs, coachs | Suivi entraînements, nutrition, objectifs |
| Tanasync | RH | Équipes RH, managers | Gestion congés, onboarding, suivi performance |

### Pourquoi nous (`#why-us`)
3 arguments différenciants :
- "Pensé pour le terrain" — interfaces conçues avec les utilisateurs finaux
- "Données en temps réel" — tableaux de bord actionnables
- "Interface sans formation" — prise en main immédiate

### Contact (`#contact`)
- Formulaire : nom, email, message
- Soumission via Formspree (ID dans `.env`)
- Mention "Réponse sous 48h"

### Footer
- Logo, liens sections, copyright "© 2025 Tanaverse"

---

## 7. Système visuel (Direction A — Éditorial)

### Palette
| Token | Valeur | Usage |
|---|---|---|
| `--ink` | `#0f0f0f` | Texte principal |
| `--paper` | `#f5f2ed` | Fond global |
| `--accent` | `#c8a96e` | Accents, highlights |
| `--muted` | `#6b6760` | Texte secondaire |
| `--rule` | `#d9d5cf` | Séparateurs, bordures |

### Typographie
| Rôle | Police | Poids | Source |
|---|---|---|---|
| Display / titres | Playfair Display | 700 (roman), 400 (italic) | Google Fonts |
| Corps / UI | DM Sans | 300, 400, 500 | Google Fonts |

### Principes visuels
- Fond crème chaud, encre quasi-noir — pas de blanc pur
- Lignes fines comme structure visuelle (pas de cards avec ombres)
- Accent doré utilisé avec parcimonie
- Zéro dégradé, zéro border-radius agressif
- Responsive mobile-first

---

## 8. Qualité non-négociable

- **Accessibilité** : sémantique HTML (nav, main, section, footer), attributs alt, contraste WCAG AA minimum, navigation clavier
- **Responsive** : mobile-first avec breakpoints Tailwind (`sm:`, `md:`, `lg:`)
- **SEO** : title, meta description, Open Graph dans `layout.jsx`
- **Performance** : next/font pour les polices (pas de CDN externe), next/image pour les images

---

## 9. Conventions Git

- `feat:` — nouvelle fonctionnalité
- `fix:` — correction de bug
- `style:` — changement visuel sans logique
- `refactor:` — restructuration sans changement fonctionnel
- `docs:` — README, LEARNINGS
- `chore:` — config, dépendances

---

## 10. Ce qui est hors scope

- Authentification, base de données, CMS
- Framework JS lourd autre que React/Next.js
- Librairie d'animation (animations en CSS/Tailwind uniquement)
- Contenu dynamique côté serveur (le site est un vitrine statique dans les faits)
- Déploiement (phase ultérieure — VPS Ubuntu, Nginx, PM2, Certbot)
