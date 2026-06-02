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

```
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
```

## Commandes

```bash
npm run dev      # Lancer le serveur de développement (http://localhost:3000)
npm run build    # Build de production
npm start        # Lancer le serveur de production (après build)
npm run lint     # Vérifier le code avec ESLint
```

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
