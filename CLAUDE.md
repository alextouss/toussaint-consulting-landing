# Toussaint Consulting — Landing Page + Prospect Follow-ups

## Objectif

Ce projet sert **deux usages** :

1. **Landing page** (`index.html`) — Toussaint Consulting, freelance product leader & builder. Positionnement 50/50 : "PRODUCT LEADERSHIP MEETS EXECUTION." — product leadership pour entreprises (freelance PM, fractional CPO) + product building pour fondateurs (MVP en 4-6 semaines).

2. **Slide-deck PDF sur mesure par prospect** — pour chaque prospect, produire un **PDF format slide-deck** (~20 slides, A4 landscape, dark brandé edge-to-edge) à envoyer après un call de découverte. Contient un framework Cat 1/2/3 + 3 use cases alignés sur ses vraies douleurs (avec schémas D2), preuves marché publiques. Livrable final = PDF généré via skill `pdf-export` (Chrome headless). L'HTML est l'intermédiaire — chaque `<section>` du HTML = une slide du PDF.

**Workflow par prospect** :
1. Call de découverte → noter les 3 use cases / douleurs exprimées dans `prospects/<nom-entite>-<contexte>.md` (notes privées, gitignorées)
2. Construire/dupliquer le HTML template `capgemini-openinnov.html` → `<nom-entite>-<contexte>.html`
3. Customiser les 3 use cases avec les douleurs du prospect, schémas adaptés, preuves marché pertinentes
4. Export PDF via skill `pdf-export` (Chrome headless `--print-to-pdf`, dark brandé). Aperçu : ouvrir le HTML dans le navigateur + Cmd+P pour voir l'équivalent print.
5. Envoyer le PDF au prospect par email / LinkedIn DM

## Stack Technique

- **HTML unique** (`index.html`) + **Tailwind CSS v4** via CDN
- **Pas de build tools** — ouvrir `index.html` directement dans le navigateur
- Fonts landing : **Clash Display** (Fontshare) + **Bitter** + **Inter** (Google Fonts)
- Fonts prospects : self-hostées dans `assets/fonts/*.css` (les CDNs bloquent CORS sur XHR — nécessaire pour fiabilité de l'export PDF). Les `@font-face` pointent toujours sur les woff2 CDN.
- Vanilla JS uniquement (animations, menu mobile, i18n, scroll reveal)
- **Export PDF prospects** : Chrome headless `--print-to-pdf`, dark theme préservé (pas de flip light). Cf. skill `pdf-export`.
- **Deploiement** : Vercel (config dans `.vercel/`)

## Deploiement

- **URL live** : https://toussaint-consulting.com/
- **Alias** : `toussaint.consulting`
- **Hebergement** : Vercel (config dans `.vercel/`)

## Structure du Projet

```
tc_website/
  index.html                       <- Landing page (publique, indexée)
  capgemini-openinnov.html         <- PDF-template prospect Capgemini Open Innovation
  CLAUDE.md                        <- Ce fichier
  competitive-analysis.md          <- Analyse concurrentielle
  .gitignore
  .vercel/                         <- Config deploiement Vercel
  screenshots/                     <- Captures Playwright
  prospects/                       <- GITIGNORÉ · notes brutes par prospect
    capgemini-openinnov.md         <- Contact + 3 use cases bruts du call + à-faire
  diagrams/                        <- Source D2 + SVG générés des schémas par UC
    uc1-dark.d2  / uc1-dark.svg    <- Dark  = écran ET PDF (full dark brandé)
    uc1-light.d2 / uc1-light.svg   <- Light = optionnel, version imprimable papier
    uc2-*.d2 + uc2-*.svg
    uc3-*.d2 + uc3-*.svg
  assets/
    favicon.svg                    <- Favicon SVG (terracotta + T)
    alex-portrait.jpeg             <- Photo portrait (OG image)
    logo.png                       <- Logo export
    linkedin-cover.png             <- Cover LinkedIn
```

**Règles sur les fichiers prospects** :
- **HTML public** : un fichier par prospect à la racine, `<nom-entite>-<contexte>.html` (ex : `capgemini-openinnov.html`). Source pour générer le PDF.
- **Notes privées** : `prospects/<nom-entite>-<contexte>.md` — notes brutes du call, à-faire, infos de contact. Gitignoré, jamais déployé.
- Ne garder que la dernière version de chaque prospect (pas de `-v2`, `-draft`, etc.) : remplacer en place.
- HTML accessible uniquement via URL directe, pas lié depuis `index.html`
- `<meta name="robots" content="noindex, nofollow">` obligatoire sur chaque HTML prospect

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

## Sections de la Landing (`index.html`)

1. **Navbar** — sticky, frosted glass dark, 4 liens (Services, How I Work, About, Contact), toggle langue FR/EN, CTA "Book a Call" (Google Calendar)
2. **Hero** — "PRODUCT LEADERSHIP MEETS EXECUTION." + terminal mockup (--help style) + trust bar (10+ yrs, 3 products) + floating badges (Available, Strategy → Execution)
3. **Services** — 2 cartes 50/50 (6+6 cols) : Product Leadership (bleu tech) + Product Building (terracotta)
4. **How I Work** — 3 principes : Understand Fast, Build Lean, Iterate Relentlessly
5. **About** — "Product Leader Who Builds." + key facts grid + bio sans noms d'employeurs
6. **Contact** — "LET'S WORK TOGETHER." + 2 cartes (Calendar + Email), pas de formulaire
7. **Footer** — logo + nav + connect (LinkedIn, Email, Book a Call)

## Structure d'un follow-up prospect (template `capgemini-openinnov.html`)

**Format = slide-deck PDF.** Chaque `<section>` du HTML correspond à **exactement une slide** dans le PDF exporté : fond `#0A0A0A` edge-to-edge, contenu centré verticalement, page-break forcé entre chaque section. Voir skill `pdf-export` pour le pattern CSS complet.

Architecture type à dupliquer pour chaque nouveau prospect (~20 slides) :

1. **Header** (HTML only, `no-print`) — logo + CTA "Prendre RDV"
2. **Cover** (slide) — eyebrow `Brief · <nom prospect>`, titre principal, une-ligne de contexte ("Suite à notre échange...")
3. **Grille de lecture** (slide) — Framework Cat 1/2/3, explainer + 3 cards
4. **Sommaire** (slide) — TOC cliquable des UCs

Pour chaque use case (3 UCs typique = ~12 slides) :
- **UC slide 1** — Header numéroté + badge catégorie + h2 + "Vous m'avez dit" quote + Type de problèmes / Type de solutions (2 colonnes)
- **UC slide 2** — Architecture (schéma D2 dark, pleine page, max-height 145mm)
- **UC slide 3** — Référence marché (cas public + URL) + Pattern de référence OU Cas livré
- **UC slide 4** — "Ce qui change pour vous" (punchline isolée, gros impact)
- *Optionnel* — slides supplémentaires pour démos riches (pipeline, scorecard, etc.) si UC complexe

Slides de clôture (~5) :
- **Livrable hero** (slide) — eyebrow + h2 "Ce que votre équipe récupère" + intro
- **Livrable 6 transferts** (slide) — 6 cartes en grille 3×2 (code, evals, observabilité, doc, transfert, garantie)
- **Pour creuser** (slide) — CTA discovery sprint + Calendar + email
- **Footer** (slide) — Toussaint logo + "Préparé pour <prospect> · Confidentiel"

**Règles éditoriales follow-up** :
- Ton direct, phrases courtes. Pas d'em-dash. Même anti-ton-IA que la landing.
- Langue : FR ou EN selon le prospect
- `meta robots noindex, nofollow`
- Preuves marché : uniquement cas publics avec chiffres datés + URL. Jamais de cas inventé.
- Schémas : **D2 (diagram-as-code)** dans `diagrams/`, pas de SVG inline. Variante **dark = défaut écran ET PDF**. Light optionnelle, gardée pour qui veut une version papier imprimable. Compilées via `d2 --layout elk --pad 30 source.d2 source.svg` (ELK > dagre par défaut). Embed par paire de `<img>` :
  ```html
  <img src="diagrams/ucN-dark.svg"  class="schema-dark  w-full h-auto block" />
  <img src="diagrams/ucN-light.svg" class="schema-light w-full h-auto block" />
  ```
  CSS toggle : `.schema-light { display: none }` partout. `.schema-dark { display: block; max-height: 560px; ... }` à l'écran, `max-height: 145mm` en print (slide-deck pleine page).
- Convention couleurs D2 : dark → fonds `#251F18`/`#1A1410`, font `#E8DCC4`. Override le canvas D2 (sinon il sort blanc) :
  ```d2
  vars: { d2-config: { theme-overrides: { N7: "#251F18" } } }
  ```
  Light (optionnel) → fonds `#FFFFFF`/`#FAFAF5`, font `#1A1410`.
- Tailles D2 dark : 32/28/26 (nodes/sub/container) — calibrées pour rendu écran ~560px et PDF pleine slide.
- **Export PDF = slide-deck.** Chaque `<section>` doit être atomique (un concept par slide). Pattern CSS complet dans skill `pdf-export` : `@page margin 0` (edge-to-edge dark), `section { padding: 12mm 22mm; min-height: calc(100vh - 4mm); display: flex; justify-content: safe center }` (centrage vertical), Tailwind v4 CDN reste tel quel.
- **Splitter dès qu'une section déborde une page**. Symptômes : page noire vide entre 2 slides (overflow d'1mm), contenu collé en haut d'une page (overflow), box/schéma coupé en deux (card trop grande). Fix : extraire le bloc débordant en nouvelle `<section class="page-break">` distincte.
- Chaque section doit porter `class="page-break"` (sauf la toute première du doc) + un `<span class="uc-running-title">...</span>` au début (caché à l'écran via `.sr-only` style, gardé pour réactivation future de Paged.js).
- Limites connues : pas de running headers, pas de numéros de page (Chrome native ne supporte pas CSS Paged Media — Paged.js incompatible avec Tailwind v4 CDN, cf. skill `pdf-export` gotcha #8).

## i18n

- Toggle FR/EN dans la navbar (desktop + mobile)
- Traductions inline en JS via attributs `data-i18n` sur les elements
- Langue par defaut : anglais

## Contenu Business

### Toussaint Consulting
- **Fondateur** : Alexandre Toussaint
- **Entite** : Toussaint Technologies SASU
- **Marque commerciale** : Toussaint Consulting
- **Positionnement** : Product Leader & Builder (50/50)
- **Offre 1** : Product Leadership — embedded PM (3-6 mois), fractional CPO, product audits, roadmap
- **Offre 2** : Product Building — MVP/produits digitaux de concept a launch en 4-6 semaines
- **Side projects** : Closter (AI lead gen B2B), Seya (SaaS data intelligence — ne pas citer comme Chrome extension en public)
- **Langues** : Francais, Anglais
- **Email** : contact@toussaint-consulting.com
- **Booking** : Google Calendar (`calendar.app.google/w35WNGT9Lsk65n5x8`)

### Mots-cles du messaging

**Landing page** (`index.html`) :
- Utiliser : product leadership, execution, embed, build, ship, launch, strategy, end-to-end, fractional CPO, freelance PM
- Eviter : AI automation, workflow, n8n, Make, Zapier, ROI (galvauge), transformation, solutions

**Follow-up prospects** (`<prospect>.html`) :
- Positionnement : AI Agent Builder (test de marché en parallèle, cf. `/Users/alexandretoussaint/.claude/plans/quel-postes-cibler-pour-expressive-fairy.md`)
- Utiliser : AI agent, Cat 1/2/3, déterministe, raisonnement, multi-agents, shadow run, HITL, ground truth, evals
- Eviter : AI automation, workflow, n8n, Zapier (saturés) — dire ce que fait l'agent, pas avec quoi

## Regles

- **Pas de ton IA** : pas d'em-dash (—), pas de formulations generiques type ChatGPT. Ecriture directe, phrases courtes, ton humain. S'applique à la landing ET aux follow-ups prospects.
- **Landing** : garder le fichier unique `index.html`, pas de framework, pas de build
- **Follow-ups** : un fichier HTML par prospect, duplique le template `capgemini-openinnov.html` et customise. Supprime la version précédente quand tu en livres une nouvelle.
- Privilegier la qualite visuelle et l'originalite sur la rapidite
- Pas de noms d'employeurs sur la landing (SESAMm, Finance Active, etc.) — les follow-ups peuvent citer des cas anonymisés
- Pas de metriques non verifiables. Pour les follow-ups, uniquement des preuves marché publiques avec URL.
- Pricing : pas de prix affiches, discovery call uniquement
- Screenshots Playwright si debug visuel necessaire : `npx playwright screenshot --browser chromium --wait-for-timeout 3000 --viewport-size "1440,900"`
