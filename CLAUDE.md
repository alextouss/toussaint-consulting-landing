# Toussaint Consulting — Landing Page + Prospect Follow-ups

## Objectif

Ce projet sert **deux usages** :

1. **Landing page** (`index.html`) — Toussaint Consulting, freelance product leader & builder. Positionnement 50/50 : "PRODUCT LEADERSHIP MEETS EXECUTION." — product leadership pour entreprises (freelance PM, fractional CPO) + product building pour fondateurs (MVP en 4-6 semaines).

2. **Slide-deck PDF sur mesure par prospect** — pour chaque prospect, produire un **PDF format slide-deck** (A4 landscape, dark brandé edge-to-edge) à envoyer après un call de découverte. Deux formats existent (voir "Structure d'un follow-up prospect" plus bas) :
   - **Discovery 3-UCs** (~16 slides) : prospect avec 3 douleurs distinctes au call → framework Cat 1/2/3 + 3 use cases. Exemple : `capgemini-openinnov.html`.
   - **Lean proposition** (~9 slides) : prospect avec 1 idée à valider ou follow-up freelance → recap + analyse + wedge + POC + roadmap + CTA. Exemple : `kanaan-anti-churn.html`.

   Livrable final = PDF généré via skill `pdf-export` (Chrome headless). L'HTML est l'intermédiaire, chaque `<section>` du HTML = une slide du PDF.

**Workflow par prospect** :
1. Call de découverte → noter les use cases / douleurs / idée pitchée dans `prospects/<slug>.md` (notes privées, gitignorées)
2. **Choisir le format** : 3-UCs (douleurs distinctes) ou lean proposition (1 idée à challenger / wedge à isoler)
3. `cp templates/prospect-deck.html <slug>.html` puis find/replace `{{PROSPECT_NAME}}`, `{{PROSPECT_SLUG}}`, `{{PROSPECT_CONTEXT}}`. Pour le lean : restructure lourde, supprimer grille Cat 1/2/3 + 3 UCs + livrable 6 transferts, voir `kanaan-anti-churn.html` comme référence.
4. `mkdir diagrams/<slug>` — un dossier par prospect, jamais de collision avec les diagrammes d'autres prospects
5. Pour chaque diagramme :
   ```bash
   cp templates/diagram-dark.d2 diagrams/<slug>/<nom>-dark.d2
   # customise nodes/edges, puis compile :
   d2 --layout elk --pad 30           diagrams/<slug>/<nom>-dark.d2 diagrams/<slug>/<nom>-dark.svg
   d2 --layout elk --pad 30 --scale 3 diagrams/<slug>/<nom>-dark.d2 diagrams/<slug>/<nom>-dark.png
   ```
6. Remplis les blocs du HTML avec Claude en conversation
7. **Itère le layout sans re-exporter le PDF** : `node scripts/print-preview.mjs <slug>.html screenshots/preview.png` — Playwright headless avec print media emulation. ~3s vs ~8s pour Chrome `--print-to-pdf`. Visualise les overflows avant de générer le PDF final.
8. Export PDF via skill `pdf-export` (Chrome headless `--print-to-pdf`, dark brandé)
9. `git add` + commit + push → **auto-deploy Vercel** depuis main (cf. section Deploiement). Plus besoin de `vercel --prod` à la main.
10. Envoie le PDF au prospect par email / LinkedIn DM

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
- **Auto-deploy GitHub activé** (depuis 2026-05-27 via `vercel git connect`) : chaque `git push origin main` déclenche un deploy production en ~10s. Repo lié : `alextouss/toussaint-consulting-landing`. Plus besoin de `vercel --prod` manuel sauf pour tester un build sans push.
- **Vérifier deploy en ligne** : `curl -s -o /dev/null -w "%{http_code}\n" https://toussaint-consulting.com/<slug>.html` doit retourner `200`.

## Structure du Projet

```
tc_website/
  index.html                       <- Landing page (publique, indexée)
  capgemini-openinnov.html         <- Deck prospect Capgemini (format 3-UCs, livré)
  capgemini-openinnov_Brief.pdf    <- PDF exporté correspondant
  kanaan-anti-churn.html           <- Deck prospect Kanaan (format lean proposition, livré)
  kanaan-anti-churn_Brief.pdf      <- PDF exporté correspondant
  CLAUDE.md                        <- Ce fichier
  competitive-analysis.md          <- Analyse concurrentielle
  .gitignore                       <- !diagrams/**/*.png pour whitelister tous les PNG nestés
  .vercel/                         <- Config deploiement Vercel
  screenshots/                     <- Captures Playwright (clean up après chaque session)
  scripts/
    print-preview.mjs              <- Playwright headless + print media emulation (itération layout)
  templates/                       <- Scaffolds réutilisables pour nouveaux prospects
    prospect-deck.html             <- HTML 3-UCs avec tokens {{PROSPECT_NAME}} etc.
    diagram-dark.d2                <- D2 dark template (classes + theme override)
  prospects/                       <- GITIGNORÉ · notes brutes par prospect
    capgemini-openinnov.md         <- Contact + 3 use cases bruts du call + à-faire
    kanaan-anti-churn.md           <- Contact + idée pitchée + office-hours best-judgment
  diagrams/                        <- D2 sources + SVG/PNG générés, namespacés par prospect
    capgemini/                     <- Format 3-UCs : uc1/uc2/uc3 × dark(+light optionnel)
      uc1-dark.{d2,svg,png}        <- Dark = écran ET PDF (PNG --scale 3 pour PDF reliability)
      uc1-light.{d2,svg}           <- Light = optionnel, version imprimable papier
      uc2-*, uc3-*
    kanaan-anti-churn/             <- Format lean : 1 diagramme architecture POC
      poc-dark.{d2,svg,png}
    <slug>/                        <- Un dossier par futur prospect
  assets/
    favicon.svg                    <- Favicon SVG (terracotta + T)
    alex-portrait.jpeg             <- Photo portrait (OG image)
    logo.png                       <- Logo export
    linkedin-cover.png             <- Cover LinkedIn
    fonts/                         <- CSS self-hostés (woff2 toujours via CDN @font-face)
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

## Structure d'un follow-up prospect

**Format = slide-deck PDF.** Chaque `<section>` du HTML correspond à **exactement une slide** dans le PDF exporté : fond `#0A0A0A` edge-to-edge, contenu centré verticalement, page-break forcé entre chaque section. Voir skill `pdf-export` pour le pattern CSS complet.

Deux formats canoniques (à choisir selon le contexte du call) :

### Format A · Discovery 3-UCs (~16 slides) — référence : `capgemini-openinnov.html`

Quand l'utiliser : prospect avec **3 douleurs distinctes** identifiées au call, qu'on adresse avec 3 patterns Cat 1/2/3 différents.

Structure (template `templates/prospect-deck.html` tel quel) :
1. **Header** (HTML only, `no-print`) — logo + CTA "Prendre RDV"
2. **Cover** — eyebrow `Brief · <nom prospect>`, titre principal, une-ligne de contexte
3. **Grille de lecture** — Framework Cat 1/2/3, explainer + 3 cards (universel, ne pas modifier)
4. **Sommaire** — TOC cliquable des UCs

Pour chaque use case (3 UCs typique = ~12 slides) :
- **UC slide 1** — Header numéroté + badge catégorie + h2 + "Vous m'avez dit" quote + Type de problèmes / Type de solutions (2 colonnes)
- **UC slide 2** — Architecture (schéma D2 dark, pleine page, max-height 145mm)
- **UC slide 3** — Référence marché (cas public + URL) + Pattern de référence OU Cas livré
- **UC slide 4** — "Ce qui change pour vous" (punchline isolée, gros impact)
- *Optionnel* — slides supplémentaires pour démos riches (pipeline, scorecard, etc.) si UC complexe

Slides de clôture (~5) :
- **Livrable hero** — eyebrow + h2 "Ce que votre équipe récupère" + intro
- **Livrable 6 transferts** — 6 cartes en grille 3×2 (code, evals, observabilité, doc, transfert, garantie)
- **Pour creuser** — CTA discovery sprint + Calendar + email
- **Footer** — Toussaint logo + "Préparé pour <prospect> · Confidentiel"

### Format B · Lean proposition (~9 slides) — référence : `kanaan-anti-churn.html`

Quand l'utiliser : prospect avec **1 idée à valider / wedge à isoler** (freelance pitch, founder advisory, follow-up "je te fais une proposition"). Pas 3 douleurs, 1 sujet à creuser.

Workflow préalable : faire un travail **office-hours interne** (6 forcing questions YC, Alex ↔ Claude en conversation) pour cadrer le wedge et le POC AVANT d'écrire le deck. Le deck est l'output, pas le process. Cf. memory `feedback_office_hours_internal.md`.

Structure (restructure lourde du template, garder shell head/header/footer/CSS print) :
1. **Cover** — eyebrow `Proposition POC · <sujet>`, H1 punchline 2-mots-clés (`Du X à Y.`), sub "Suite à notre échange · POC 2 sem · 3K€"
2. **Ce que j'ai entendu** — 2-col "Le problème" / "Ta vision" (4 bullets chacun), prouve l'écoute fidèle
3. **Mon analyse** — 3 cards (3-col grid, accent tech-blue), 3 angles ressortis après réflexion
4. **Le wedge** (punchline plein écran) — H1 accent terracotta XL + 3 paragraphes (Le move / Pourquoi maintenant / Pourquoi ça vend), pattern `bg-accent/5 border-l-2 border-accent`
5. **POC scope** — 2 panels (Périmètre / Livrable) + 1 sub-headline avec l'argument business clé
6. **POC architecture** — diagramme D2 unique (PNG `--scale 3`), max-height 128mm (PAS 145mm), stack en sub-heading
7. **Roadmap** — 3 phases compactes (Phase 1 POC / Phase 2 Pilote / Phase 3 Multi-tenant), cards `roadmap-card` custom class avec padding 4mm 6mm en print
8. **Pourquoi moi** — 3 bullets numérotés + punchline italique accent
9. **Pour creuser + footer** — 2 cartes CTA (Calendar / Email) + footer Toussaint

**Patterns CSS spécifiques au lean** :
- `.roadmap-card { padding: 14px 18px }` (screen) + `@media print { .roadmap-card { padding: 4mm 6mm !important }}` (compact roadmap)
- `img[src*="diagrams/"] { max-height: 128mm !important }` en print (vs 145mm default) — laisse plus de place au header/sub sur le slide architecture
- Wrap entier de la section roadmap dans un `<div class="reveal avoid-break">` pour empêcher Chrome de couper entre header et cards

**Règles éditoriales follow-up** :
- Ton direct, phrases courtes. Pas d'em-dash. Même anti-ton-IA que la landing.
- Langue : FR ou EN selon le prospect
- `meta robots noindex, nofollow`
- Preuves marché : uniquement cas publics avec chiffres datés + URL. Jamais de cas inventé. **Attention au staleness** : une acquisition / levée / valuation date vite. Vérifier que la ref est < 12 mois avant de la mettre, sinon préférer un pattern intemporel (e.g. "le LLM lit le non-structuré") à une citation chiffrée vieillissante. Le format lean (Kanaan) en a fait l'économie totale et c'est OK pour un follow-up "proposition POC".
- Schémas : **D2 (diagram-as-code)**, namespacés par prospect dans `diagrams/<slug>/`. Pas de SVG inline. Partir du template `templates/diagram-dark.d2` (palette, classes, theme override, font sizes 32/28/26 déjà calibrés). Compiler en deux formats :
  ```bash
  d2 --layout elk --pad 30           diagrams/<slug>/ucN-dark.d2 diagrams/<slug>/ucN-dark.svg
  d2 --layout elk --pad 30 --scale 3 diagrams/<slug>/ucN-dark.d2 diagrams/<slug>/ucN-dark.png
  ```
  Pourquoi les deux : Chrome `--print-to-pdf` rend les flèches/markers SVG de manière instable (apparaissent/disparaissent selon zoom du viewer PDF — bug connu). Le PNG `--scale 3` (~460 DPI sur slide A4 landscape) garantit un rendu identique sur tous les viewers. SVG = aperçu HTML écran, PNG = embed dans le PDF. Embed :
  ```html
  <img src="diagrams/<slug>/ucN-dark.png" class="schema-dark  w-full h-auto block" />
  <img src="diagrams/<slug>/ucN-dark.svg" class="schema-light w-full h-auto block" />
  ```
  CSS toggle : `.schema-light { display: none }` partout. `.schema-dark { display: block; max-height: 560px; ... }` à l'écran, `max-height: 145mm` en print.
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
- **Follow-ups** : un fichier HTML par prospect, partir de `templates/prospect-deck.html` (jamais dupliquer un deck prospect existant — le template est la source canonique). Supprimer la version précédente quand on en livre une nouvelle.
- Privilegier la qualite visuelle et l'originalite sur la rapidite
- Pas de noms d'employeurs sur la landing (SESAMm, Finance Active, etc.) — les follow-ups peuvent citer des cas anonymisés
- Pas de metriques non verifiables. Pour les follow-ups, uniquement des preuves marché publiques avec URL.
- Pricing : pas de prix affiches, discovery call uniquement
- Screenshots Playwright si debug visuel necessaire : `npx playwright screenshot --browser chromium --wait-for-timeout 3000 --viewport-size "1440,900"`
- **Itération layout deck prospect** : `node scripts/print-preview.mjs <slug>.html screenshots/preview.png` (Playwright headless + `emulateMedia({media:'print'})`). Beaucoup plus rapide qu'un PDF re-export à chaque tweak. Le script importe playwright depuis `chrome-extension-yt/node_modules/playwright` pour éviter une install locale.
