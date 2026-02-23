# Toussaint Consulting — Landing Page

## Objectif

Landing page pour **Toussaint Consulting** — product builder & strategy consultant freelance. Positionnement : "I build products from concept to launch" + consulting PM pour entreprises.

## Stack Technique

- **HTML unique** (`index.html`) + **Tailwind CSS v4** via CDN
- **Pas de build tools** — ouvrir `index.html` directement dans le navigateur
- Fonts : **Clash Display** (Fontshare) + **Bitter** + **Inter** (Google Fonts)
- Vanilla JS uniquement (animations, menu mobile)

## Structure du Projet

```
Front-end-page/
  index.html          <- Page complete (HTML + Tailwind + JS inline)
  assets/
    favicon.svg       <- Favicon SVG (terracotta + T)
  CLAUDE.md           <- Ce fichier
```

## Direction Esthetique

**"Bold Builder"** — noir pur + accent terracotta, typographie massive, animations editoriales :

### Palette
- Background : `#0A0A0A` (void)
- Surface : `#1A1410` / `#251F18`
- Borders : `#2A251E` / `#3A342A`
- Text : `#E8DCC4` (off-white chaud)
- Text secondary : `#B8AFA0` / `#8A837A`
- Accent : `#C97A5F` (terracotta)
- Tech : `#4A9EFF` (bleu tech — usage secondaire)

### Typographie
- **Display** : Clash Display (Fontshare) — bold, uppercase
- **Subheading** : Bitter (serif)
- **Body** : Inter (clean sans-serif)

### Principes Visuels
- Layouts asymetriques
- Negative space genereux
- Card glow hover effect (mouse tracking)
- Grid pattern subtil en background du hero
- Animations : fadeInUp, scroll reveal (IntersectionObserver), float

## Sections de la Page

1. **Navbar** — sticky, frosted glass dark, 4 liens (Services, How I Work, About, Contact), CTA "Book a Call"
2. **Hero** — "I BUILD PRODUCTS. YOU SCALE THEM." + terminal mockup + trust bar (10+ yrs, 3 products)
3. **Services** — 2 cartes asymetriques (8+4 cols) : Product Builder (primary) + Strategy & Consulting
4. **How I Work** — 3 principes : Understand Fast, Build Lean, Iterate Relentlessly
5. **About** — "Product Manager Turned Builder" + key facts grid + bio sans noms d'employeurs
6. **Contact** — "GOT A PROJECT? LET'S BUILD IT." + 2 cartes (Calendar + Email), pas de formulaire
7. **Footer** — logo + nav + connect (LinkedIn, Email, Book a Call)

## Contenu Business

### Toussaint Consulting
- **Fondateur** : Alexandre Toussaint
- **Entite** : Toussaint Technologies SASU
- **Marque commerciale** : Toussaint Consulting
- **Positionnement** : Product Builder & Strategy Consultant
- **Offre 1** : Product Builder — MVP/produits digitaux de concept a launch
- **Offre 2** : Product Strategy & Consulting — audit produit, roadmap, PM freelance
- **Side projects** : Closter (AI lead gen), Seya (Chrome extension YouTube)
- **Langues** : Francais, Anglais
- **Email** : contact@toussaint-consulting.com

### Mots-cles du messaging
**Utiliser** : build, ship, launch, product, strategy, concept-to-launch, end-to-end, fast, lean
**Eviter** : AI automation, workflow, n8n, Make, Zapier, ROI (galvaude), transformation, solutions

## Regles

- Garder le fichier unique `index.html` — pas de framework, pas de build
- Privilegier la qualite visuelle et l'originalite sur la rapidite
- Pas de noms d'employeurs sur la page (SESAMm, Finance Active, etc.)
- Pas de metriques non verifiables
- Pricing : pas de prix affiches, discovery call uniquement
- Screenshots Playwright si debug visuel necessaire : `npx playwright screenshot --browser chromium --wait-for-timeout 3000 --viewport-size "1440,900"`
