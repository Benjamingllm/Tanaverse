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
