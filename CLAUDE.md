# Toussaint Consulting — Landing Page

## Objectif

Landing page pour **Toussaint Consulting** — freelance product leader & builder. Positionnement 50/50 : "PRODUCT LEADERSHIP MEETS EXECUTION." — product leadership pour entreprises (freelance PM, fractional CPO) + product building pour fondateurs (MVP en 4-6 semaines).

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

**"Monochrome Kinetic"** — noir pur + accent terracotta + bleu tech, typographie massive, animations editoriales :

### Palette
- Background : `#0A0A0A` (void)
- Surface : `#1A1410` / `#251F18`
- Borders : `#2A251E` / `#3A342A`
- Text : `#E8DCC4` (off-white chaud)
- Text secondary : `#B8AFA0` / `#8A837A`
- Accent : `#C97A5F` (terracotta — Product Building)
- Tech : `#4A9EFF` (bleu tech — Product Leadership)

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
2. **Hero** — "PRODUCT LEADERSHIP MEETS EXECUTION." + terminal mockup (--help style) + trust bar (10+ yrs, 3 products) + floating badges (Available, Strategy → Execution)
3. **Services** — 2 cartes 50/50 (6+6 cols) : Product Leadership (bleu tech) + Product Building (terracotta)
4. **How I Work** — 3 principes : Understand Fast, Build Lean, Iterate Relentlessly
5. **About** — "Product Leader Who Builds." + key facts grid + bio sans noms d'employeurs
6. **Contact** — "LET'S WORK TOGETHER." + 2 cartes (Calendar + Email), pas de formulaire
7. **Footer** — logo + nav + connect (LinkedIn, Email, Book a Call)

## Contenu Business

### Toussaint Consulting
- **Fondateur** : Alexandre Toussaint
- **Entite** : Toussaint Technologies SASU
- **Marque commerciale** : Toussaint Consulting
- **Positionnement** : Product Leader & Builder (50/50)
- **Offre 1** : Product Leadership — embedded PM (3-6 mois), fractional CPO, product audits, roadmap
- **Offre 2** : Product Building — MVP/produits digitaux de concept a launch en 4-6 semaines
- **Side projects** : Closter (AI lead gen), Seya (Chrome extension YouTube)
- **Langues** : Francais, Anglais
- **Email** : contact@toussaint-consulting.com

### Mots-cles du messaging
**Utiliser** : product leadership, execution, embed, build, ship, launch, strategy, end-to-end, fractional CPO, freelance PM
**Eviter** : AI automation, workflow, n8n, Make, Zapier, ROI (galvaude), transformation, solutions

## Regles

- **Le copy du site ne doit pas sonner comme de l'IA** : pas d'em-dash (—), pas de formulations generiques type ChatGPT. Ecriture directe, phrases courtes, ton humain.
- Garder le fichier unique `index.html` — pas de framework, pas de build
- Privilegier la qualite visuelle et l'originalite sur la rapidite
- Pas de noms d'employeurs sur la page (SESAMm, Finance Active, etc.)
- Pas de metriques non verifiables
- Pricing : pas de prix affiches, discovery call uniquement
- Screenshots Playwright si debug visuel necessaire : `npx playwright screenshot --browser chromium --wait-for-timeout 3000 --viewport-size "1440,900"`
