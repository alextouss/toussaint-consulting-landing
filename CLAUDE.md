# Toussaint Consulting — Landing Page + Prospect Follow-ups

## Objectif

Ce projet sert **deux usages** :

1. **Landing page** (`index.html`) — Toussaint Consulting, freelance product leader & builder. Positionnement 50/50 : "PRODUCT LEADERSHIP MEETS EXECUTION." — product leadership pour les équipes (freelance PM, fractional CPO) + product building = construire et fiabiliser des logiciels et systèmes IA production-grade. **Le framing "MVP en 4-6 semaines" a été retiré (juin 2026)** car commoditisé par l'IA-native ; carte 02 reformulée autour de la robustesse prouvée (tests + evals + mesure sur de vraies données, force data PM), wording audience-agnostique. Cf. `market-analysis-ai-transformation-2026.md`.

2. **Slide-deck PDF sur mesure par prospect** — pour chaque prospect, produire un **PDF format slide-deck** (A4 landscape, dark brandé edge-to-edge) à envoyer après un call de découverte. Deux formats : Discovery 3-UCs (~16 slides, 3 douleurs distinctes) et Lean proposition (~9 slides, 1 idée / wedge). L'HTML est l'intermédiaire, chaque `<section>` = une slide.

   👉 **Toute la procédure de build vit dans le skill `prospect-deck`** (workflow, choix de format, structure slide-par-slide, diagrammes D2, règles éditoriales, captures) — l'invoquer dès qu'on crée ou édite un deck prospect. L'export PDF final est délégué au skill `pdf-export`. Inputs privés dans `prospects/<slug>/` (gitignoré), livrables publics dans `decks/<slug>/` (noindex).

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
- **Vérifier deploy en ligne** : `curl -s -o /dev/null -w "%{http_code}\n" https://toussaint-consulting.com/decks/<slug>/<slug>.html` doit retourner `200`.
- **Redirects** : `vercel.json` (racine) redirige les anciennes URLs racine (`/capgemini-openinnov.html`, `/kanaan-anti-churn.html`, …) vers `/decks/<slug>/<slug>.html`. Ajouter une entrée par deck déplacé.

## Structure du Projet

```
tc_website/
  index.html                       <- Landing page (publique, indexée)
  alexandre-toussaint-cv.html      <- CV perso d'Alex (light editorial cream, A4 portrait 2 pages, noindex, non lié)
  Alexandre_Toussaint_CV.pdf       <- PDF exporté du CV
  CLAUDE.md                        <- Ce fichier
  competitive-analysis.md          <- Analyse concurrentielle
  vercel.json                      <- Redirects : anciennes URLs racine -> /decks/<slug>/
  .gitignore                       <- !decks/**/*.png + !.claude/skills/ pour whitelister
  .vercel/                         <- Config deploiement Vercel
  .claude/skills/prospect-deck/    <- Skill : procédure de build des decks (format, diagrammes, éditorial)
  screenshots/                     <- Captures Playwright (clean up après chaque session)
  scripts/
    print-preview.mjs              <- Playwright headless + print media emulation (itération layout)
    regen-benoit-captures.mjs      <- Playwright : re-rend/margine les captures démo (marges propres, fix l'asset)
  templates/                       <- Scaffolds réutilisables pour nouveaux prospects
    prospect-deck.html             <- HTML 3-UCs avec tokens {{PROSPECT_NAME}} (paths ../../assets)
    diagram-dark.d2                <- D2 dark template (classes + theme override)
  decks/                           <- Livrables PUBLICS, 1 dossier/prospect (déployé à /decks/<slug>/)
    capgemini-openinnov/           <- Format 3-UCs, livré
      capgemini-openinnov.html     <- Deck (source HTML du PDF)
      capgemini-openinnov_Brief.pdf
      diagrams/                    <- uc1/uc2/uc3 × dark(+light optionnel)
        uc1-dark.{d2,svg,png}      <- Dark = écran ET PDF (PNG --scale 3 pour PDF reliability)
        uc1-light.{d2,svg}         <- Light = optionnel, version imprimable papier
    kanaan-anti-churn/             <- Format lean, livré
      kanaan-anti-churn.html
      kanaan-anti-churn_Brief.pdf
      diagrams/poc-dark.{d2,svg,png}
      proto/                       <- screenshots prototype (dashboard.png, detail-*.png)
    <slug>/                        <- 1 dossier par futur prospect (html + pdf + diagrams/)
  prospects/                       <- GITIGNORÉ · INPUTS privés, 1 dossier/prospect
    <slug>/
      notes.md                     <- Contact + use cases bruts du call + à-faire
      (transcript, email reçu, pièces jointes déposés ici)
  assets/                          <- Partagé (référencé via ../../assets depuis les decks)
    favicon.svg                    <- Favicon SVG (terracotta + T)
    alex-portrait.jpeg             <- Photo portrait (OG image)
    logo.png                       <- Logo export
    linkedin-cover.png             <- Cover LinkedIn
    fonts/                         <- CSS self-hostés (woff2 toujours via CDN @font-face)
```

**Fichiers prospects** : livrables publics dans `decks/<slug>/` (html + pdf + diagrams/, déployé, `noindex` obligatoire), inputs privés dans `prospects/<slug>/` (gitignoré, jamais déployé). Règles détaillées (paths, versioning, captures) → skill `prospect-deck` (`references/editorial.md`).

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
- **Offre 2** : Product Building — construire et fiabiliser des logiciels et systèmes IA production-grade, de bout en bout. Différenciateur = robustesse prouvée (tests + evals + mesure sur de vraies données), ancrée sur la force data PM. "Run" (opérer dans la durée) proposé en option. Wording audience-agnostique (PME, fondateurs, scale-ups, enterprise). Ancien framing "MVP en 4-6 semaines" retiré (juin 2026, commoditisé).
- **Side projects** : Closter (AI lead gen B2B), Seya (SaaS data intelligence — ne pas citer comme Chrome extension en public)
- **Langues** : Francais, Anglais
- **Email** : a.toussaint@toussaint-consulting.com
- **LinkedIn** : `linkedin.com/in/alexandre-toussaint` (vérifié, URL correcte)
- **Booking** : Google Calendar (`calendar.app.google/w35WNGT9Lsk65n5x8`)

### Mots-cles du messaging

**Landing page** (`index.html`) :
- Utiliser : product leadership, execution, embed, build, ship, launch, strategy, end-to-end, fractional CPO, freelance PM
- Eviter : AI automation, workflow, n8n, Make, Zapier, ROI (galvauge), transformation, solutions

**Follow-up prospects** : positionnement AI Agent Builder + listes utiliser/éviter → skill `prospect-deck` (`references/editorial.md`).

## Regles

- **Pas de ton IA** : pas d'em-dash (—), pas de formulations generiques type ChatGPT. Ecriture directe, phrases courtes, ton humain. S'applique à la landing ET aux follow-ups prospects.
- **Landing** : garder le fichier unique `index.html`, pas de framework, pas de build
- Privilegier la qualite visuelle et l'originalite sur la rapidite
- Pas de noms d'employeurs sur la landing (SESAMm, Finance Active, etc.) — les follow-ups peuvent citer des cas anonymisés
- Pas de metriques non verifiables. Pour les follow-ups : uniquement des preuves marché publiques avec URL (règles détaillées dans le skill `prospect-deck`).
- Pricing : pas de prix affiches, discovery call uniquement
- Screenshots Playwright si debug visuel necessaire : `npx playwright screenshot --browser chromium --wait-for-timeout 3000 --viewport-size "1440,900"`
- **Toujours finir une tâche PDF par un lien ouvrable** : dès qu'on produit ou met à jour un PDF (CV ou proposition/follow-up prospect), terminer la réponse en donnant un lien cliquable pour l'ouvrir tout de suite — l'URL web déployée si le fichier est en ligne (`https://toussaint-consulting.com/<nom>.pdf`, et/ou la page `.html`), sinon le chemin local du PDF en lien markdown relatif. Le faire proactivement, sans que l'utilisateur ait à le demander.
